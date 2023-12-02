const algarismos = [0, 1, 2, 3, 4, 5, 6,7 , 8, 9] 

const coresPrimarias = [ "azul", "amarelo", "vermelho" ]

console.log("temos as seguintes cores disponíveis no sistema")
for (const cor of coresPrimarias) {
    console.log(`cor: ${cor}`)
}

console.log("\npodemos usar 2 arrays para criar combinações")

for (const cor of coresPrimarias) {
    console.log("")
    for (const algarismo of algarismos) {
        console.log(`carta número ${algarismo}, cor: ${cor}`)
    }
}