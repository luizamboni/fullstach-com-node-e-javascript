const fs = require('fs/promises');

const content = 'Olá mundo\n';

// esperando todas as escritas terminares
const appendPromise1 = fs.appendFile('./hello.txt', content)
const appendPromise2 = fs.appendFile('./hello.txt', content)
const appendPromise3 = fs.appendFile('./hello.txt', content)
const appendPromise4 = fs.appendFile('./hello.txt', content)

Promise.all([
    appendPromise1,
    appendPromise2,
    appendPromise3,
    appendPromise4,
]).then(() =>  console.log("(print 1)", "todos os dados já foram escritos"))

console.log("(print 2)","fluxo principal")
