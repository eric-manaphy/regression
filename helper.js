function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function generateInputArrays(type, arr) {
    let s = '';
    for(let i = 0; i < arr.length; ++i)
        s += `${input_params[type][i]} = np.array([${arr[i].join(',')}])\n`;
    console.log(s);
    return s.trim();
}

function generatePlotCode(type, arr, xvar) {
    const params = input_params[type].slice(0, input_params[type].length - 1);
    const fixedarr = params.reduce(
        (acc, curr, i) => ({...acc, [curr]: [...new Set(arr[i])]}),
        {}
    );
    const fixedparams = params.filter((x) => x !== xvar);

    let s = `
fig, ax = plt.subplots()
${params[xvar]} = np.array([${fixedarr[xvar].join(',')}])
${generatePlotCodeSub(type, fixedarr, xvar, params, fixedparams, '')}
plt.legend()
buf = io.BytesIO()
fig.savefig(buf, format='png')
img_src = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')`;

    return s;
}

function generatePlotCodeSub(type, arr, xvar, origparams, fixparams, s) {
    if(fixparams.length === 0)
        return `ax.plot(${xvar}, ${type}((${origparams.join(',')}), *popt))\n`;
    const currparam = fixparams[0];
    for(let i = 0; i < arr[currparam].length; ++i) {
        s += `${currparam} = np.array([${(arr[currparam][i].toString() + ',').repeat(arr[xvar].length)}])\n`;
        s += generatePlotCodeSub(type, arr, xvar, origparams, fixparams.slice(1), s);
    }
    return s;
}