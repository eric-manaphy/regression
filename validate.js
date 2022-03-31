function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function validate(type) {
  const input = document.getElementById('input').value.trim();
  let message = document.getElementById('result'); // error box
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
  const model_idx = models[length - 2].findIndex(x => x === type);
  if(model_idx < 0) {
    message.innerText = "The doesn't seem to be enough columns for this regression model.";
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

  let ig = document.getElementById('initial-guess');
  ig.setAttribute('class', 'info-box');
  ig.innerHTML = '';
  let p = document.createElement('p');
  let text = document.createTextNode("Enter your intial guesses here. Defaults to 1.")
  p.appendChild(text);
  ig.appendChild(p);

  for(const param of curves[models[length - 2][model_idx]]) {
    let label = document.createElement("label");
    let input_field = document.createElement("input");
    label.setAttribute('for', `${param}`);
    label.innerText = `${param}: `;
    input_field.setAttribute('type', 'number');
    input_field.setAttribute('id', `${param}`);
    input_field.setAttribute('name', `${param}`);
    input_field.setAttribute('step', 'any');
    input_field.setAttribute('value', '1');
    ig.appendChild(label);
    ig.appendChild(input_field);
    ig.innerHTML += "&nbsp;&nbsp;"
  }
  ig.appendChild(document.createElement('br'));
  let button = document.createElement('button');
  button.setAttribute('id', 'submit');
  button.setAttribute('onclick',`submit("${type}")`);
  button.innerText = "Submit";
  ig.appendChild(button);
}