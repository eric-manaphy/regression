async function load() {
    await languagePluginLoader.then(() => { console.log('Ready') });
    await pyodide.loadPackage(["numpy", "scipy"]);
    for(let button of document.getElementsByTagName("button"))
        button.disabled = false;
}
load();