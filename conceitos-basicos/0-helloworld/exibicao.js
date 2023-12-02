// console.log é a maneira mais comum de exibir variáveis 

// abaixo a exibição simples de um valor numérico
const numeroDeFilhos = 2
console.log(numeroDeFilhos)


// console.log pode receber quantos valores for preciso, e concatenar,
// ou seja encadear valores de diferentes naturezas, como numérico e texto afim de exibir a mensagem desejada

// neste exemplo abaixo é combinado um valor de texto com um valor numérico
console.log("O número de filhos atual é: ", numeroDeFilhos)


// até mesmo objetos complexos podem ser exibidos con console.log como listas e dicionários

// exibição de listas
const exemploDeListaDeNumeros = [ 1, 2, 3, 4, 5, 6 ]
console.log("exemploDeListaDeNumeros: ", exemploDeListaDeNumeros)


// exibição de dicionários
const exemploDeDicionario = {
    "a": 1,
    "b": 2,
    "c": 3
}

console.log("exemploDeDicionario: ", exemploDeDicionario)