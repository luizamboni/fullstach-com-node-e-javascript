const fs = require("fs")
const fsp = require('fs/promises')

const Jogo = require("../../core/play/jogo")

class JogoRepo {

    constructor(path) {
        this.path = path
        this.prefix = "play-"
        if (!fs.existsSync(this.path)){
            fs.mkdirSync(this.path, { recursive: true });
        }
    }

    async _readFromFile(filename) {
        const data = JSON.parse(await fsp.readFile(filename))
        const jogo = new Jogo({ 
            id: data.id, 
            titulo: data.titulo, 
            idsJogadores: data.idsJogadores,
            vezDoJogador: data.vezDoJogador,
            baralho: data.baralho,
            pilha: data.pilha,
            maos: data.maos,
        })

        return jogo
    }

    async list() {
        const files = (await fsp.readdir(this.path)).filter(filename => filename.startsWith(this.prefix))
        const filesWithPath = files.map(filename => `${this.path}/${filename}`)
        return await Promise.all(filesWithPath.map(this._readFromFile))
    }

    async getById(id) {
        return await this._readFromFile(`${this.path}/${this.prefix}${id}.json`)
    }

    async save(jogo) {

        return await fsp.writeFile(
            `${this.path}/${this.prefix}${jogo.id}.json`, 
            JSON.stringify({
                id: jogo.id,
                titulo: jogo.titulo,
                idsJogadores: jogo.idsJogadores,
                vezDoJogador: jogo.vezDoJogador,
                baralho: jogo.baralho,
                pilha: jogo.pilha,
                maos: jogo.maos,
            }, null, 4)
        )
    }
}

module.exports = JogoRepo