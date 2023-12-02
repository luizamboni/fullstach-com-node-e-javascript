// fs é um módulo nativo, já vem com a linguagem, 
// mas não está disponível se não for incluído através da função "require"
// fs nos da repertórios para manipular arquivos: ler, gravar etc
const fs = require('fs')


const fileContent = fs.readFileSync(__dirname + "/built-in.js")

// exibimos o conteúdo desde arquivo, que é este proprio código no caso
console.log(fileContent.toString())