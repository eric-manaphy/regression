const models = [
    ["uni_uni", "uni_uni_comp_inhib"],
    ["ping_pong_bi_bi", "ordered_bi_bi"],
    ["ordered_ter_ter", "bi_uni_uni_uni_ping_pong"]
];

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function validate() {
  const input = document.getElementById('input').value.trim();
  let message = document.getElementById('button-field'); // error box
  if(input.indexOf('\t') < -1) {
    message.innerText = "The input doesn't seem to be TSV.";
    return;
  }
  const num_tabs = (input.match(/\t/g) || []).length;
  const num_br = (input.match(/\n/g) || []).length;
  if(!num_tabs || !num_br || num_tabs % (num_br + 1) !== 0) {
    message.innerText = "The whitespace seems to be off.";
    return;
  }

  const processed_input = input.split('\n').map((line) => line.split('\t'));
  const length = processed_input[0].length;
  if(length < 2) {
      message.innerText = "There doesn't seem to be enough columns.";
      return;
  }
  for(let i = 1; i < processed_input.length; ++i) {
    for(let j = 0; j < processed_input[i].length; ++j) {
        if(!isNumber(processed_input[i][j])) {
            message.innerText = "A data value seems to be formatted improperly.";
            return;
        }
        if(processed_input[i].length !== length) {
            message.innerText = "There seems to be a missing data value."
            return;
        }
    }
  }

  const model_idx = length - 2;
  message.innerHTML = '';
  let button = document.createElement('button');
  button.id = 'validate';
  button.setAttribute('onclick','validate()');
  button.innerText = 'Validate';
  for(const model in models[model_idx]) {
    button = document.createElement('button');
    let image = document.createElement('img');
    image.src = `images/${model}.png`;
    image.alt = model.replace('_', ' ');
    image.title = model.replace('_', ' ');
    button.id = model;
    button.setAttribute('onclick',`submit(${model})`);
    button.appendChild(image);
    message.appendChild(button);
  }
}