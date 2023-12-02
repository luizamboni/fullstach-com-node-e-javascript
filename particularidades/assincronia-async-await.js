const fs = require('fs/promises');

const content = 'Olá mundo\n';

async function writeAll() {
    await fs.appendFile('./hello.txt', content)
    await fs.appendFile('./hello.txt', content)
    await fs.appendFile('./hello.txt', content)
    await fs.appendFile('./hello.txt', content)
    console.log("(print 1)", "todos os dados já foram escritos")    
}
writeAll()
console.log("(print 2)","fluxo principal")
