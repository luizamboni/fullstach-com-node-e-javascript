const fsp = require('fs/promises');
const fs = require("fs")
const Jogo = require("../../core/match/jogo");

const JogoNaoEncontrado = new Error("Não encontrado")

class JogoRepo {

    constructor(path) {
        this.path = path
        this.prefix = "jogo-"
        if (!fs.existsSync(this.path)){
            fs.mkdirSync(this.path, { recursive: true });
        }
    }

    async _readFromFile(filename) {
        try {
            const data = JSON.parse(await fsp.readFile(filename))
            const jogo = new Jogo({ 
                id: data.id, 
                titulo: data.titulo, 
            })
    
            jogo.estado = data.estado
            jogo.idCriador = data.idCriador
            jogo.idDesafiador = data.idDesafiador
    
            return jogo
        } catch(err){
            console.error(err)
            return null
        }
    }

    async list() {
        const files = (await fsp.readdir(this.path)).filter(filename => filename.startsWith(this.prefix))
        const filesWithPath = files.map(filename => `${this.path}/${filename}`)
        return (await Promise.all(filesWithPath.map(this._readFromFile))).filter(Boolean)
    }

    async getById(id) {
        try {
            return await this._readFromFile(`${this.path}/${this.prefix}${id}.json`)
        } catch(err) {
            throw JogoNaoEncontrado
        }
    }

    async save(jogo) {

        return await fsp.writeFile(
            `${this.path}/${this.prefix}${jogo.id}.json`, 
            JSON.stringify({
                id: jogo.id,
                titulo: jogo.titulo,
                estado: jogo.estado,
                idCriador: jogo.idCriador,
                idDesafiador: jogo.idDesafiador,
            }, null, 4)
        )
    }
}

module.exports = {
    JogoNaoEncontrado,
    JogoRepo,
}
