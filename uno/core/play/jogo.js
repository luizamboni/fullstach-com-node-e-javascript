const { v4: uuidv4 } = require('uuid');
const Baralho = require("./baralho")

const NaoEAVezDoJogador = new Error("Não é a vez do jogador")
const CartaNaoDaMatch = new Error("A carta não da match com o topo da pilha")

class Jogo {
    constructor({ id, titulo, idsJogadores, vezDoJogador, baralho, pilha, maos }) {
        this.id  = id || uuidv4()
        this.titulo = titulo
        this.idsJogadores = idsJogadores
        this.vezDoJogador = vezDoJogador || idsJogadores[0]
        this.baralho = baralho ? new Baralho(baralho) : new Baralho()
        this.pilha = pilha || []
        this.vencedor = null
        
        if (maos) {
            this.maos = maos
        } else {
            this.maos = {}
            for (const idJogador of idsJogadores) {
                this.maos[idJogador] = []
            }
        }
    }

    iniciar() {
        this.baralho.embaralhar()
        for (const idJogador of this.idsJogadores) {
            for(const vez of Array(7)) {
                this.maos[idJogador].push(this.baralho.comprar())
            }
        }
        this.pilha.push(this.baralho.comprar())
    }

    visaoDoJogador(idJogador) {
        const oponenteIdJogador = this.idsJogadores.find(id => id !== idJogador)
        
        return {
            vez: this.vezDoJogador === idJogador,
            pilha: this.pilha,
            cartasNaMao: this.maos[idJogador],
            contagemDeCartasNaMaoDoOpenente: this.maos[oponenteIdJogador].length,
            vencedor: this.vencedor
        }
    }

    _indiceDaCartaNaMaoDoJogador(idJogador, carta) {
        const { cartasNaMao } = this.visaoDoJogador(idJogador)
        for (const indice in cartasNaMao) {
            const cartaNaMao = cartasNaMao[indice]
            if (cartaNaMao.cor === carta.cor && cartaNaMao.numero === carta.numero) {
                return indice
            }
        }
        return -1
    }

    cartaDoTopo() {
        return this.pilha.slice(-1)[0]
    }


    cartaPodeSerJogada(carta) {
        const cartaDoTopo = this.cartaDoTopo()
            
        if (cartaDoTopo.cor !== carta.cor && cartaDoTopo.numero !== carta.numero) {
            return false
        }

        return true
    }
    
    mudaAVez() {
        const indice = this.idsJogadores.indexOf(this.vezDoJogador)
        this.vezDoJogador = this.idsJogadores[indice + 1] ? this.idsJogadores[indice + 1] : 0
    }

    temCartasNaMao(idJogador) {
        const { cartasNaMao } = this.visaoDoJogador(idJogador)

        if (cartasNaMao.length === 0) {
            return false
        }

        return true
    }


    daMaoParaAPiha(idJogador, carta) {
        let { cartasNaMao, pilha } = this.visaoDoJogador(idJogador)
        const indiceDaCarta = this._indiceDaCartaNaMaoDoJogador(idJogador, carta)

        cartasNaMao = cartasNaMao.splice(indiceDaCarta, 1)
        pilha.push(carta)
    }

    eAVezDoJogador(idJogador) {
        if (idJogador !== this.vezDoJogador) {
            return false
        }

        return true
    }

    jogadorVence(idJogador) {
        this.vencedor = idJogador
    }

    doBaralhoParaAMao(idJogador) {
        const { cartasNaMao } = this.visaoDoJogador(idJogador)
        const carta = this.baralho.comprar()
        cartasNaMao.push(carta)
    }

    executarJogada(idJogador, evento) {
        if (!this.eAVezDoJogador(idJogador)) {
            throw NaoEAVezDoJogador
        }

        const { tipo, payload } = evento
        
        if (tipo === "jogar") {
            const carta = payload
                        
            if (!this.cartaPodeSerJogada(carta)) {
                throw CartaNaoDaMatch
            }

            this.daMaoParaAPiha(idJogador, carta)
            
            if (!this.temCartasNaMao(idJogador)) {
                this.jogadorVence(idJogador)
                return
            }

            this.mudaAVez()
        }

        if (tipo === "comprar") {
            this.doBaralhoParaAMao(idJogador)
        }

        if (tipo === "passar") {
            this.mudaAVez()
        }
    }
}

module.exports = Jogo