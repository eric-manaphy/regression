async function load() {
    await languagePluginLoader.then(() => { console.log('Ready') });
    await pyodide.loadPackage(["numpy", "scipy"]);
    document.getElementsByTagName("button").forEach(e => e.disabled = false);
}
load();