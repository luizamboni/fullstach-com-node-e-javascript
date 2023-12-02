// a notação como arrow é mais recente
// arrow funcions são essas funções declaradas dessa forma
// como variáveis e que possuem uma seta "=>"
const potenciaDe3 = (numero) => {
    return numero * numero * numero
}

// se há apenas um argumento, não é necessário os parentesis
const potenciaDe4 = numero => {
    return numero * numero * numero * numero
}

// se a função só tem uma linha, também não é exigido as chaves
const potenciaDe5 = numero =>
    numero * numero * numero * numero * numero


console.log("2 ao cubo é", potenciaDe3(2))
console.log("2 a quarta é", potenciaDe4(2))
console.log("2 a quinta é", potenciaDe5(2))

