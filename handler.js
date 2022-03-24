async function submit() {
let input = document.getElementById('input').value;
let result = document.getElementById('result');

const input_arr = input.split("\n");

const code = `
import numpy as np
from scipy.optimize import curve_fit

def simple(X, a, b):
    A, B = X
    return a*A + b*B

A = np.array(${input_arr[0]})
B = np.array(${input_arr[1]})
a, b = 10., 4.
z = np.array(${input_arr[2]})

p0 = 8., 2.
popt, pcov = curve_fit(simple, (A,B), z, p0)
perr = np.sqrt(np.diag(pcov))
print(popt, perr)
np.array((popt, perr))
`

pyodide.runPythonAsync(code)
  .then(output => {
    console.log(output);
    // const popt = output[0];
    // const perr = output[1];
    // let data = [];
    // for(let i = 0; i < popt.length; ++i) {
    //   if(perr[i] === Infinity) 
    //     data.push(`${String.fromCharCode(0x41+i)}: ${popt[i]}`)
    //   else
    //     data.push(`${String.fromCharCode(0x41+i)}: ${popt[i]}±${perr[i]}`)
    // }
    // result.innerText = data.join(', ')
  });
}