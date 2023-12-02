
// variáveis possuem tipos, naturezas diferentes,
// algumas são numéricas, enquanto outras são texto ou boolenas (positivo ou negativo).


// tipos string
// são sequencias de caracters, em outras palavras são texto.
const textoDeSaudacao = "Olá "
const nomeDoUsuario = "Paula"

// as duas variáveis acima  strings .
console.log("O tipo de 'textoDeSaudacao' é", typeof textoDeSaudacao)
console.log("O tipo de 'nomeDoUsuario' é", typeof nomeDoUsuario)

// o operador "+" quando aplicado a strings as junta, "concatena".
console.log("") // pula linha
console.log(textoDeSaudacao + nomeDoUsuario)


const anosDePaulaNaEmpresaA = 3
const anosDePaulaNaEmpresaB = 4

// "\n" é usado no início do texto para indicar uma quebra de linha, é uma outra maneira de se pular uma linha
console.log("\nO tipo de 'anosDePaulaNaEmpresaA' é", typeof anosDePaulaNaEmpresaA)
console.log("O tipo de 'anosDePaulaNaEmpresaB' é", typeof anosDePaulaNaEmpresaB)

console.log("") // pula linha
const totalDeAnosDeExperiencia = anosDePaulaNaEmpresaA + anosDePaulaNaEmpresaB
console.log(nomeDoUsuario, "tem um total de " + totalDeAnosDeExperiencia, "anos de experiência")

// precisamos ter cuidado em como manipulamos variáveis de diferentes tipos para não obtermos resultado indesejados
console.log(nomeDoUsuario, "tem um total de " + anosDePaulaNaEmpresaA + anosDePaulaNaEmpresaB, "anos de experiência")


