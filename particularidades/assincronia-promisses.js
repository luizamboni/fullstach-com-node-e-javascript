const fs = require('fs/promises');

const content = 'Olá mundo\n';

const writerPromise = fs.writeFile('./hello.txt', content)

writerPromise.catch(err => {
    console.error(err)
    process.exit(1)
})

// faça oparação 1
writerPromise.then(() => {
    console.log("(print 1)", "o arquivo foi escrito com sucesso")
})

// faça oparação 2
writerPromise.then(() => {
    console.log("(print 2)", "o arquivo foi escrito com sucesso")
})


console.log("(print 2)","fluxo principal")

