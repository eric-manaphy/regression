function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function validate(type) {
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
  if(models[length - 2].find(x => x === type) === undefined) {
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

  // document.getElementById('input').disabled = true;

  // const model_idx = length - 2;
  // message.innerHTML = '';
  // let button = document.createElement('button');
  // button.id = 'validate';
  // button.setAttribute('onclick','reset()');
  // button.innerText = 'Re-validate?';
  // message.appendChild(button);

  // message.appendChild(document.createElement('br'));
  // message.appendChild(document.createElement('br'));

  // for(const model of models[model_idx]) {
  //   button = document.createElement('button');
  //   let image = document.createElement('img');
  //   image.src = `images/${model}.png`;
  //   image.alt = model.replace('_', ' ');
  //   image.title = model.replace('_', ' ');
  //   button.id = model;
  //   button.setAttribute('onclick',`submit("${model}")`);
  //   button.appendChild(image);
  //   message.appendChild(button);

  //   message.appendChild(document.createElement('br'));
  //   message.appendChild(document.createElement('br'));
  // }
}