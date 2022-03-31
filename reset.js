// Deprecated

function reset() {
  document.getElementById('input').disabled = false;
  document.getElementById('result').innerHTML = '';
  let message = document.getElementById('button-field');
  let button = document.createElement('button');
  button.id = 'validate';
  button.setAttribute('onclick', 'validate()');
  button.innerText = 'Validate';
  message.innerHTML = '';
  message.appendChild(button);
}