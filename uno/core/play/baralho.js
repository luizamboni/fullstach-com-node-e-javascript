const cores = ["verde", "amarelo", "vermelho" , "azul" ]

const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

class Baralho {

    constructor(cartas = []) {
        this.cartas = cartas
        if (cartas.length === 0) {
            for (const cor of cores) {
                for (const numero of numeros) {
                    const carta = {
                        numero: numero,
                        cor: cor
                    }
                    this.cartas.push(carta)
                }
            }
        }
    }

    toJSON() {
        return this.cartas
    }

    embaralhar() {

        const cartasCopiadas = [...this.cartas]
    
        for (let indiceAtual = cartasCopiadas.length - 1; indiceAtual > 0; indiceAtual--) {
            // j será uma posição dentro das possibilidades de posição da lista
            const indiceAleatorio = Math.floor(Math.random() * (indiceAtual + 1));
            const temp = cartasCopiadas[indiceAtual];
            cartasCopiadas[indiceAtual] = cartasCopiadas[indiceAleatorio];
            cartasCopiadas[indiceAleatorio] = temp;
        }
        this.cartas = cartasCopiadas

        return this.cartas
    }

    comprar() {
        return this.cartas.pop()
    }
}

module.exports = Baralho