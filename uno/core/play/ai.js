class AI {

    constructor() {
        this.id = uuidv4()
        this.cartasNaMao = []
    }

    _analizarMao() {

        const cores = {
            vermelho: 0,
            azul: 0,
            verde: 0,
            amarelo: 0
        }

        for (const carta of this.cartasNaMao) {
            cores[carta.cor]++
        }

        let corMaisFrequente = null
        for (const nomeDaCor of Object.keys(cores)) {
            
            if (corMaisFrequente) {
                if(cores[nomeDaCor] > cores[corMaisFrequente]) {
                    corMaisFrequente = nomeDaCor
                }
            } else {
                corMaisFrequente = nomeDaCor
            }
        }

        const numeros = {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
        }

        for (const carta of this.cartasNaMao) {
            numeros[carta.numero]++
        }

        let numeroMaisFrequente = null
        for (const numero of Object.keys(numeros)) {
            
            if (numeroMaisFrequente) {
                if(numeros[numero] > numeros[numeroMaisFrequente]) {
                    numeroMaisFrequente = numero
                }
            } else {
                numeroMaisFrequente = numero
            }
        }

        return {
            cores,
            corMaisFrequente,
            numeros,
            numeroMaisFrequente,
        }
    }

    jogar() {
        const analise = this.analiseMao()

        const cartaEscolhida = this.cartasNaMao.find(carta => carta.cor === analise.corMaisFrequente)

        const indice = this.cartasNaMao.indexOf(cartaEscolhida)

        return jogadordaVez.cartasMao.splice(indice, 1)[0]
    }
}

module.exports = AI