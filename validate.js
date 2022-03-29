function validate() {
    const input = document.getElementById('input').value.trim();
    let result = document.getElementById('result'); // error box
    if(input.indexOf('\t') < -1) {
        result.innerText = "The input doesn't seem to be TSV";
        return;
    }
    const num_tabs = (input.match(/\t/g) || []).length;
    const num_br = (input.match(/\n/g) || []).length;
    if(!num_tabs || !num_br || !(num_tabs % (num_br + 1))) {
        result.innerText = "The whitespace seems to be off";
        return;
    }
}