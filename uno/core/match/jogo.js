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

    entrar(idJogador) {
        if(this.estado !== estados.AGUARDANDO) {
            throw Error(`O jogo ${this.titulo} não está mais disponível`)
        }

        if(this.idCriador === idJogador) {
            throw Error(`O jogador não pode jogar contra ele mesmo`)
        }

        this.idDesafiador = idJogador
        this.estado = estados.INICIADO
    }
}

module.exports = Jogo