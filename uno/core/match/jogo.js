const { v4: uuidv4 } = require('uuid');

const estados = {
    AGUARDANDO: "aguardando jogador",
    INICIADO: "iniciado" ,
    TERMINADO: "terminado",
}

class Jogo {

    static estados = estados
    constructor({ id, titulo, idJogador }) {
        this.id  = id || uuidv4()
        this.titulo = titulo
        this.estado = estados.AGUARDANDO
        this.idCriador = idJogador
        this.idDesafiador = null
    }

    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            estado: this.estado,
            idCriador: this.idCriador,
            idDesafiador: this.idDesafiador,
        }
    }

    _jogadorEstaNoJogo(idJogador) {
        console.log(idJogador, this.idCriador, this.idDesafiador)
        if(this.idCriador === idJogador) {
            return true
        }

        if(this.idDesafiador === idJogador) {
            return true
        }

        return false
    }

    aceitar(idJogador) {
        if (this._jogadorEstaNoJogo(idJogador)) {
            return
        }
    
        if(this.estado !== estados.AGUARDANDO) {
            throw Error(`O jogo ${this.titulo} não está mais disponível`)
        }

        this.idDesafiador = idJogador
        this.estado = estados.INICIADO
    }

    encerrar() {
        this.estado = estados.TERMINADO
    }
}

module.exports = Jogo