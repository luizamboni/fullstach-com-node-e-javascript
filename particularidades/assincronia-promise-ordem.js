const fs = require('fs/promises');

const content = 'Olá mundo\n';

// esperando todas as escritas terminares
const appendText = () => fs.appendFile('./hello.txt', content)

appendText()
    .then(appendText())
    .then(appendText())
    .then(appendText())
    .then(appendText())
    .then(() =>  console.log("(print 1)", "todos os dados já foram escritos"))


console.log("(print 2)","fluxo principal")