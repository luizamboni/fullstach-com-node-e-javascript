// importamos de fs, uma versão que trabalha com promises
const fs = require('fs/promises');

const content = 'Olá mundo\n';

// uma promise é retornada como resultado da chamada do método
const writerPromise = fs.writeFile('./hello.txt', content)

// a Promse é um futuro, que em algum momento vai se resolver
writerPromise.then(() => {
    console.log("(print 1)", "o arquivo foi escrito com sucesso")
})
// para a resoluçào da promise podem haver várias ações, independentes
writerPromise.then(() => {
    console.log("(print 2)", "o arquivo foi escrito com sucesso")
})


// a promse também contempla a situação de caso não haja um sucesso
// na operação
writerPromise.catch(err => {
    console.error(err)
})


console.log("(print 3)","fluxo principal")