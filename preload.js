async function load() {
  await languagePluginLoader.then(() => { console.log('Ready') });
  await pyodide.loadPackage(["numpy", "scipy", "matplotlib"]);
  let message = document.getElementById('button-field');
  message.innerHTML = "";
  for(const model_type of models) {
    for(const model of model_type) {
      let button = document.createElement('button');
      let image = document.createElement('img');
      image.src = `images/${model}.png`;
      image.alt = model.replace('_', ' ');
      image.title = model.replace('_', ' ');
      button.id = model;
      button.setAttribute('onclick',`validate("${model}")`);
      button.appendChild(image);
      message.appendChild(button);
      message.appendChild(document.createElement('br'));
      message.appendChild(document.createElement('br'));
    }
  }
}
load();