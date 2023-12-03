const { v4: uuidv4 } = require('uuid');

class Jogador {
    constructor({ id, nome }) {
        this.id = id || uuidv4()
        this.nome = nome || "Anônimo"
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
        }
    }
}

module.exports = Jogador