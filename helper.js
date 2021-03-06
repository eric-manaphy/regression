function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function generateInputArrays(type, arr) {
    let s = '';
    for(let i = 0; i < arr.length; ++i)
        s += `${input_params[type][i]} = np.array([${arr[i].join(',')}])\n`;
    return s.trim();
}

function generatePlotCode(type, arr, xvar) {
    const params = input_params[type].slice(0, -1);
    const fixedarr = input_params[type].reduce(
        (acc, curr, i) => ({...acc, [curr]: [...new Set(arr[i])]}),
        {}
    );
    const coordinates = arr[0]
        .map((c, i) => arr.map(r => r[i]))
        .sort(sortCoordinates);
    console.log(coordinates);
    const fixedparams = params.filter((x) => x !== xvar);

    let s = `
fig, ax = plt.subplots()
${xvar} = np.array([${fixedarr[xvar].sort((a, b) => a - b).join(',')}])
${generatePlotCodeSub(type, fixedarr, xvar, params, fixedparams, coordinates, [], '')}
ax.legend(fontsize='xx-small')

buf = io.BytesIO()
fig.savefig(buf, format='png')
img_src = 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode('UTF-8')`;

    return s;
}

function generatePlotCodeSub(type, arr, xvar, origparams, fixparams, coordinates, currvals, s) {
    if(fixparams.length === 0) {
        const color = [Math.random(), Math.random(), Math.random()];
        const yvalues = coordinates
            .filter((x) => JSON.stringify(currvals) === JSON.stringify(x
                .filter((e, i) => i !== origparams
                    .findIndex(((z) => z === xvar))
                ).slice(0, -1)
            ))
            .map((x) => x.at(-1));
        const legendlabels = origparams.filter((x) => x !== xvar).map((x, i) => `${x}=${currvals[i]}`);
        return `ax.plot(np.reciprocal(${xvar}), np.reciprocal([${yvalues.join(',')}]), 'o', c=(${color.join(',')}))\n` +
            `ax.plot(np.reciprocal(${xvar}), np.reciprocal(${type}((${origparams.join(',')}), *popt)), c=(${color.join(',')}), label='${legendlabels.join(', ')}')\n`;
    }
    const currparam = fixparams[0];
    for(let i = 0; i < arr[currparam].length; ++i) {
        s += `${currparam} = np.array([${(arr[currparam][i].toString() + ',').repeat(arr[xvar].length).slice(0, -1)}])\n`;
        currvals.push(arr[currparam][i]);
        s += generatePlotCodeSub(type, arr, xvar, origparams, fixparams.slice(1), coordinates, currvals, s);
        currvals = [];
    }
    return s;
}

function sortCoordinates(a, b) {
    for(let i = 0; i < a.length && i < b.length; ++i) {
        if(a[i] - b[i] !== 0) return a[i] - b[i];
    }
    return 0;
}