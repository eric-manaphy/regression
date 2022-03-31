function submit(type) {
const input = document.getElementById('input').value;
const ig_input = document.getElementsByTagName('input');
let result = document.getElementById('result');

// idk if there's a more efficient way
const processed_input = input.split('\n').map((line) => line.split('\t'));
let input_arr = new Array(processed_input[0].length);
for(let i = 1; i < processed_input.length; ++i) {
  for(let j = 0; j < processed_input[i].length; ++j) {
    if(input_arr[j] === undefined) input_arr[j] = [];
    input_arr[j].push(processed_input[i][j]);
  }
}

let initial_guesses = [];
for(const guess of ig_input) {
  initial_guesses.push(isNumber(guess) ? guess : 1);
}

const code = `
import numpy as np
from scipy.optimize import curve_fit

def simple(X, a, b):
    A, B = X
    return a*A + b*B

def uni_uni(X, KA, Vmax):
    A = X
    return (Vmax*A)/(KA+A)

def uni_uni_comp_inhib(X, KA, KI, Vmax):
    A, I = X
    return (Vmax*A)/((1+I/KI)*KA+A)

def ping_pong_bi_bi(X, KA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KA*B+KB*A+A*B)

def ordered_bi_bi(X, KA, KiA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KiA*KB+KA*B+KB*A+A*B)

def ordered_ter_ter(X, KA, KiA, KB, KiB, KC, Vmax):
    A, B, C = X
    return (Vmax*A*B*C)/(KiA*KiB*KC+KiA*KB*C+KiB*KC*A+KC*A*B+KB*A*C+KA*B*C+A*B*C)

def bi_uni_uni_uni_ping_pong(X, KA, KIA, KB, KC, Vmax):
    A, B, C = X
    return (Vmax*A*B*C)/(KIA*KB*C+KC*A*B+KB*A*C+KA*B*C+A*B*C)

A = np.array([${input_arr[0].join(',')}])
B = np.array([${input_arr[1].join(',')}])
z = np.array([${input_arr[2].join(',')}])
p0 = np.array([${initial_guesses.join(',')}])
popt, pcov = curve_fit(${type}, (A,B), z, p0)
perr = np.sqrt(np.diag(pcov))
print(popt, perr)
np.array([popt, perr])
`

let output = ""
try {
  output = pyodide.runPython(code);
}
catch (error) {
  console.error(error);
  result.innerHTML = 'Try clicking the button again.';
  return;
}
console.log(output);
const popt = output[0];
const perr = output[1];
const curve = curves[type];
result.innerHTML = '';
for(let i = 0; i < popt.length; ++i) {
  let p = document.createElement('p');
  let text = '';
  if(perr[i] === Infinity)
    text = document.createTextNode(`${curve[i]}: ${popt[i]}`);
  else {
    let precision = Math.ceil(-Math.log10(perr[i]))
    let sigfigs = precision - Math.ceil(-Math.log10(popt[i]));
    let num = sigfigs > -1 ?
      popt[i].toPrecision(sigfigs + 1) : 0;
    let err = perr[i].toPrecision(1) === "1" ?
      perr[i].toPrecision(2) : perr[i].toPrecision(1);
    text = document.createTextNode(`${curve[i]}: ${num}±${err}`);
  }
  p.appendChild(text);
  result.appendChild(p);
}
}