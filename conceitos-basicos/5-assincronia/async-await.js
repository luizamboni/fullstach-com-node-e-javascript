const fs = require('fs/promises');

const content = 'Olá mundo\n';

// outra maneira de lidarmos com promises é usando os modificadores
// "async" e "await"
// async aqui indica que essa é uma funçõa assíncrona e que dentro dela
// podemos usar "await" para esperar uma promise, 
// como se ela fosse uma operação síncrona
// trata-se de um "açucar sintático" , uma maneira de deixar mais confortável para
// o desenvolvedor.
async function writeAll() {
    await fs.appendFile('./hello.txt', content)
    await fs.appendFile('./hello.txt', content)
    await fs.appendFile('./hello.txt', content)
    await fs.appendFile('./hello.txt', content)
    console.log("(print 1)", "todos os dados já foram escritos")    
}
writeAll()
console.log("(print 2)","fluxo principal")
