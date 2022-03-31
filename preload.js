async function load() {
  await languagePluginLoader.then(() => { console.log('Ready') });
  await pyodide.loadPackage(["numpy", "scipy"]);
  let message = document.getElementById('button-field');
  for(const model_type of models) {
    for(const model of model_type) {
      let button = document.createElement('button');
      let image = document.createElement('img');
      image.src = `images/${model}.png`;
      image.alt = model.replace('_', ' ');
      image.title = model.replace('_', ' ');
      button.id = model;
      button.setAttribute('onclick',`submit("${model}")`);
      button.appendChild(image);
      message.appendChild(button);
      message.innerHTML += "&nbsp;"
    }
  }
}
load();