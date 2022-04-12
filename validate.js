function validate(type) {
  const input = document.getElementById('input').value.trim();
  let buttonfield = document.getElementById('button-field');
  let message = document.getElementById('result'); // error box
  let ig = document.getElementById('initial-guess');
  let labels = document.getElementById('labels');

  buttonfield.classList.remove('with-ig');
  ig.removeAttribute('class');
  ig.innerHTML = '';

  labels.innerHTML = '';
  for(let i = 0; i < input_params[type].length - 1; ++i) {
    let inputvar = input_params[type][i];
    let span = document.createElement('span');
    let radio = document.createElement('input');
    radio.setAttribute('type', 'radio');
    radio.setAttribute('id', `${inputvar}_check`);
    radio.setAttribute('name', 'xvars');
    radio.setAttribute('value', inputvar);
    let label = document.createElement('label');
    label.setAttribute('for', `${inputvar}_check`);
    label.innerText = inputvar + ' <TAB> ';
    span.appendChild(radio);
    span.appendChild(label);
    labels.appendChild(span);
  }
  let span = document.createElement('span');
  span.innerText = input_params[type].at(-1);
  labels.appendChild(span);

  document.getElementById('input').setAttribute('class','with-header');

  if(input.indexOf('\t') < 0) {
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
    message.innerText = "There seems to be a column mismatch for this regression model.";
    return;
  }
  let start_idx = 0;
  for(const val of processed_input[0]) {
    if(!isNumber(val)) {
      start_idx = 1;
      break;
    }
  }
  for(let i = start_idx; i < processed_input.length; ++i) {
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

  ig.classList.add('ig-visible', 'info-box');
  let p = document.createElement('p');
  let text = document.createTextNode("Enter your intial guesses here. Defaults to 1.")
  p.appendChild(text);
  ig.appendChild(p);
  buttonfield.classList.add('with-ig');
  buttonfield.classList.remove('no-ig');

  for(const param of params[models[length - 2][model_idx]]) {
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