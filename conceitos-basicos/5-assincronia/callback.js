const fs = require('fs')

const content = 'Olá mundo';

fs.writeFile('./hello.txt', content, err => {
  if (err) {
    console.error(err);
  }
  console.log("(print 1)", "o arquivo foi escrito com sucesso")
});


console.log("(print 2)","fluxo principal")