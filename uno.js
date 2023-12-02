const cores = ["verde", "amarelo", "vermelho" ,"azul" ]

const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const baralho = []

for (const cor of cores) {
    for (const numero of numeros) {
        // Helena dicinario nao esta armazenado em uma variavel. Isso e estranho para um iniciante.
        baralho.push({
            numero: numero,
            cor: cor
        })
    }
}

// console.log("baralho não embaralhado:")
// for (const carta of baralho) {
//     console.log(carta)
// }


const embaralhar = lista => {

    const listaCopiada = [...lista]

    for (let indiceAtual = listaCopiada.length - 1; indiceAtual > 0; indiceAtual--) {
        // j será uma posição dentro das possibilidades de posição da lista
        const indiceAleatorio = Math.floor(Math.random() * (indiceAtual + 1));
        const temp = listaCopiada[indiceAtual];
        listaCopiada[indiceAtual] = listaCopiada[indiceAleatorio];
        listaCopiada[indiceAleatorio] = temp;
    }

    return listaCopiada
}
const baralhoEmbaralhado = embaralhar(embaralhar(embaralhar(baralho)))

// console.log("baralho embaralhado:")
// for (const carta of baralhoEmbaralhado) {
//     console.log(carta)
// }


const jogador1 = {
    nome: "Paulo",
    cartasMao: []
}

const jogador2 = {
    nome: "Luiz",
    cartasMao: [],
}

const numeroDeCartasIniciais = 7
for (let rodadaDeDistribuicao = numeroDeCartasIniciais; rodadaDeDistribuicao > 0; rodadaDeDistribuicao--) {
    jogador1.cartasMao.push(baralhoEmbaralhado.pop())
    jogador2.cartasMao.push(baralhoEmbaralhado.pop())
}

console.log(jogador1)
console.log(jogador2)

// Helena Arrow function aqui tem paranteses, mas na funcao lista nao tem. Vai confundir iniciante
const analiseMao = (jogador) => {
    // a declaração dessa variaável dentro da função
    // faz com que a outra variável chamada "cores"
    // não seja visível aqui.
    // o mais específico tem precedência
    const cores = {
        vermelho: 0,
        azul: 0,
        verde: 0,
        amarelo: 0
    }

    for (const carta of jogador.cartasMao) {
        cores[carta.cor]++ // Helena nao conhecia essa forma de incremento em uma propriedade de dicionario
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

    for (const carta of jogador.cartasMao) {
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


let jogo = {
    jogadores: [ jogador1, jogador2 ],
    fim: false,
    baralho: baralhoEmbaralhado,
    pilha: [],
}



const AiPlay = (jogadordaVez, jogo) => {
    if (jogo.pilha.length === 0) {
        const analise = analiseMao(jogadordaVez)

        const cartaEscolhida = jogadordaVez.cartasMao.find(carta => carta.cor === analise.corMaisFrequente)

        const indice = jogadordaVez.cartasMao.indexOf(cartaEscolhida)
        jogo.pilha.push(jogadordaVez.cartasMao.splice(indice, 1)[0])
        console.log(jogadordaVez.nome, "inicia o jogo com a carta", cartaEscolhida, `ficando com ${jogadordaVez.cartasMao.length} na mão`)

        return jogo
    } else {
        const cartaDoTopo = jogo.pilha[jogo.pilha.length - 1]


        do {
            if (jogo.baralho.length === 0) {
                console.log(jogadordaVez.nome, "precisou embaralhar a pilha no baralho")

                jogo.baralho = embaralhar(jogo.pilha)
                jogo.pilha = [ jogo.pilha.pop() ]
            }

            let cartaEscolhida = jogadordaVez.cartasMao.find(carta => carta.cor === cartaDoTopo.cor)
            if (cartaEscolhida) {

                const indice = jogadordaVez.cartasMao.indexOf(cartaEscolhida)
                jogo.pilha.push(jogadordaVez.cartasMao.splice(indice, 1)[0])
                console.log(jogadordaVez.nome, "joga uma carta", cartaEscolhida, `ficando com ${jogadordaVez.cartasMao.length} na mão`)
                if (jogadordaVez.cartasMao.length === 0) {
                    jogo.fim = true
                }
                return jogo
            }

            cartaEscolhida = jogadordaVez.cartasMao.find(carta => carta.numero === cartaDoTopo.numero)
            
            if (cartaEscolhida) {
                const indice = jogadordaVez.cartasMao.indexOf(cartaEscolhida)
                jogo.pilha.push(jogadordaVez.cartasMao.splice(indice, 1)[0]) 
                console.log(jogadordaVez.nome, "joga uma carta", cartaEscolhida, `ficando com ${jogadordaVez.cartasMao.length} na mão`)
                if (jogadordaVez.cartasMao.length === 0) {
                    jogo.fim = true
                }
                return jogo
            }

            jogadordaVez.cartasMao.push(jogo.baralho.pop())
            console.log(jogadordaVez.nome, "compra uma carta",  `ficando com ${jogadordaVez.cartasMao.length} na mão`)

        } while (true)
    }
    

    return jogo
}

const quantidadeDeJogadores = jogo.jogadores.length
let indiceDoJogadorDaVez = 0
do {
    const jogador = jogo.jogadores[indiceDoJogadorDaVez]
    jogo = AiPlay(jogador, jogo)
    console.log("Ultimas 3 cartas da pilha:", jogo.pilha.slice(-3))

    if (indiceDoJogadorDaVez + 1 === quantidadeDeJogadores) {
        indiceDoJogadorDaVez = 0
    } else {
        indiceDoJogadorDaVez++ 
    }
} while(!jogo.fim)

