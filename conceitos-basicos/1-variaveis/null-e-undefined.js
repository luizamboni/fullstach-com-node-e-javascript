// null e undefined são tipos, e também valores especiais.
// são ao mesmo tempo um tipo e um valor que a linguagem usa
// na ausência de informação


// o nome do jogado ainda não foi especificado no sistema
// porém já existe uma variável destinada a guardar-lo
let nomeDoJogador = null
console.log("nomeDoJogador é", nomeDoJogador)


// em uma checagem if , o valor null é considerado false
if (!nomeDoJogador) {
    console.log("ainda não foi fornecido um nomeDoJogador")
}

// estranhamente a checagem com typeof também não é muito útil
console.log("nomeDoJogador é um ", typeof nomeDoJogador)


// já undefined é um pouco diferente
// é o retorno padrão quando não há a chave dentro de um dicionário
const empregadoJose = {
    nome: 'josé',
    senioridade: 'software developer jr',
    salario: 5000,
    disponivel: true
}

// devemos interpretar o undefined como algo que não existe, 
// não apenas que não se tem um valor inicial (caso do null)
console.log("o sobrenome do funcionário é", empregadoJose.sobrenome)