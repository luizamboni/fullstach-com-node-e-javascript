const fs = require('fs')


// se precisarmos realizar sequencias de operações
// o código fica muito mais compliado utilizando callbacks
fs.writeFile('./hello.txt', 'Olá mundo', err => {
  if (err) {
    console.error(err);
  }

  fs.appendFile('./hello.txt', '\nhoje está um lindo dia', err => {
    if (err) {
      console.error(err);
    }

    fs.appendFile('./hello.txt', '\nmas vou ficar por aqui', err => {
        if (err) {
          console.error(err);
        }
        console.log("(print 1)", "o arquivo foi escrito com sucesso")
    });
  });
});


console.log("(print 2)","fluxo principal")