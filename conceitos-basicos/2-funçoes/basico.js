
// funcão são procedimentos reutilizáveis,
// damos um nome a ele e podemos executar essa mesma lógica quando
// precisarmos

// no caso abaixo, a função aplica potência de 2 a um numero
// funcãos podem receber argumentos, no caso abaixo o primeiro argumento
// será o numero que queremos aplicar a potência de 2
function potenciaDe2(numero) {
    return numero * numero
}


console.log("2 ao quadrado é", potenciaDe2(2))
console.log("3 ao quadrado é", potenciaDe2(3))


// nesta segunda versão, recebemos mais de 1 argumento
// o que define o valor do argumento é a sua posição na
// invocação da função para ser executada
// qualquer valor ou variável que for passada na primeira posiçào
// para a função será a variável numero
// Assim como qualquer valor ou variável que for passada na segunda
// posição será a variável expoente para a função.
// Essas variáveis especiais são chamadas de argumentos 
function potencia(numero, expoente) {
    if(expoente === 0) {
        return 1
    }
    let resultado = numero
    while (expoente > 1) {
        resultado = resultado * numero
        expoente = expoente - 1
    }

    return resultado
}

console.log("\n2 ao quarta potência é", potencia(2, 4))
console.log("3 ao cubo é", potencia(3, 3))