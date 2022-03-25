const curves = {
  uni_uni: ["KA", "Vmax"],
  uni_uni_comp_inhib: ["KA", "KI", "Vmax"],
  ping_pong_bi_bi: ["KA", "KB", "Vmax"],
  ordered_bi_bi: ["KA", "KiA", "KB", "Vmax"],
  ordered_ter_ter: ["KA", "KiA", "KB", "KiB", "KC", "Vmax"],
  bi_uni_uni_uni_ping_pong: ["KA", "KIA", "KB", "KC", "Vmax"],
};

function submit(type) {
let input = document.getElementById('input').value;
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
    A = X
    return (Vmax*A)/((1+1/KI)*KA+A)

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
popt, pcov = curve_fit(${type}, (A,B), z)
perr = np.sqrt(np.diag(pcov))
print(popt, perr)
np.array([popt, perr])
`

const output = pyodide.runPython(code)
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
    let num = precision > 0 ? 
      popt[i].toFixed(precision) :
      popt[i].toPrecision(precision);
    let err = precision > 0 ? 
      perr[i].toFixed(precision) :
      perr[i].toPrecision(precision);
    if(precision > 5) {
      num = popt[i].toExponential();
      err = perr[i].toExponential();
    }
    text = document.createTextNode(`${curve[i]}: ${num}±${err}`);
  }
  p.appendChild(text);
  result.appendChild(p);
}
}