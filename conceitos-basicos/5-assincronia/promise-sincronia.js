const fs = require('fs/promises');

const content = "a promessa !\n"

const appendPromise1 = fs.writeFile('./hello.txt', content)
const appendPromise2 = fs.appendFile('./hello.txt', content)
const appendPromise3 = fs.appendFile('./hello.txt', content)
const appendPromise4 = fs.appendFile('./hello.txt', content)

// promises executam em paralelo, mas podemos corrdenar algumas coisas
// como por exemplo esperar que uma lista delas sejam executadas
// para enfim realizar algo que dependa
Promise.all([
    appendPromise1,
    appendPromise2,
    appendPromise3,
    appendPromise4,
]).then(() =>  console.log("(print 1)", "todos os dados já foram escritos"))

console.log("(print 2)","fluxo principal")