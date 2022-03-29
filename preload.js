async function load() {
  await languagePluginLoader.then(() => { console.log('Ready') });
  await pyodide.loadPackage(["numpy", "scipy"]);
  let message = document.getElementById('button-field');
  let button = document.createElement('button');
  button.id = 'validate';
  button.onclick = 'validate()';
  button.innerText = 'Validate';
  message.innerHTML = '';
  message.appendChild(button);
}
load();