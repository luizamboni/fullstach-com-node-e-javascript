const fs = require('fs/promises');

// esta função retorna uma promise
const appendText = (content) => 
    fs.appendFile('./hello.txt', content)


// diferente de quando usamos callback
// coordenar promisses em certa ordem não afeta a legibilidade
// e manutenabilidade do código.
// essa coordenação pode ser feita encadeando promises nos
// "then"
appendText("Olá mundo \n")
    .then(appendText("segunda linha \n"))
    .then(appendText("terceira linha \n"))
    .then(appendText("quarta linha \n"))
    .then(appendText("quinta linha \n"))
    .then(() =>  console.log("(print 1)", "todos os dados já foram escritos"))
