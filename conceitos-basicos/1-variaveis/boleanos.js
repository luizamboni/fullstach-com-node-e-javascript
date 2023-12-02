// TIPO boleano, verdadeiro ou falso
// são úteis para serem usados em blocos condicionais, onde são checados estados
let disponivelParaTrabalho = true
console.log("O tipo de 'disponivelParaTrabalho' é", typeof disponivelParaTrabalho)

if (disponivelParaTrabalho) {
    console.log("encontrei um emprego")
    disponivelParaTrabalho = false
    console.log("não estou mais disponível para trabalho")
}

// a exclamação testa se o valor é negativo (false)
if (!disponivelParaTrabalho) {
    console.log("digo: não obrigado, eu já estou empregada")
} 