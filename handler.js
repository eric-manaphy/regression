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

def ping_pong_bi_bi(X, KA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KA*B+KB*A+A*B)

def ordered_bi_bi(X, KA, KiA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KiA*KB+KA*B+KB*A+A*B)

A = np.array([${input_arr[0].join(',')}])
B = np.array([${input_arr[1].join(',')}])
z = np.array([${input_arr[2].join(',')}])
popt, pcov = curve_fit(${type}, (A,B), z)
perr = np.sqrt(np.diag(pcov))
print(popt, perr)
np.array([popt, perr])
`

const output = pyodide.runPython(code)
const popt = output[0];
const perr = output[1];
let data = [];
for(let i = 0; i < popt.length; ++i) {
  if(perr[i] === Infinity) 
    data.push(`${String.fromCharCode(0x41+i)}: ${popt[i]}`)
  else
    data.push(`${String.fromCharCode(0x41+i)}: ${popt[i]}±${perr[i]}`)
}
result.innerText = data.join(', ')
}