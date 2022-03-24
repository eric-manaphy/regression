async function load() {
    await languagePluginLoader.then(() => { console.log('Ready') });
    await pyodide.loadPackage(["numpy", "scipy"]);
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").innerHTML = "Submit"
}
load();