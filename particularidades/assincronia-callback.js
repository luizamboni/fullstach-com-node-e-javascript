const fs = require('fs')

const content = 'Olá mundo';

fs.writeFile('./hello.txt', content, err => {
  if (err) {
    console.error(err);
    process.exit(1)
  }
  console.log("(print 1)", "o arquivo foi escrito com sucesso")
  // faça oparação 1
  console.log("(print 2)", "o arquivo foi escrito com sucesso")
  // faça oparação 2
});


console.log("(print 3)","fluxo principal")

