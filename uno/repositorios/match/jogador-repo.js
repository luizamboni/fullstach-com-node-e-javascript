const fsp = require('fs/promises');
const fs = require('fs');

const Jogador = require('../../core/match/jogador');

class JogadorRepo {

    constructor(path) {
        this.path = path
        this.prefix = "jogador-"
        if (!fs.existsSync(this.path)){
            fs.mkdirSync(this.path, { recursive: true });
        }
    }

    async _readFromFile(filename) {
        try {
            const data = JSON.parse(await fsp.readFile(filename))
            return new Jogador({ id: data.id, nome: data.nome })
        } catch(err) {
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
        return await this._readFromFile(`${this.path}/${this.prefix}${id}.json`)
    }

    async save(jogador) {

        return await fsp.writeFile(
            `${this.path}/${this.prefix}${jogador.id}.json`, 
            JSON.stringify({
                id: jogador.id,
                nome: jogador.nome,
            }, null, 4)
        )
    }
}

module.exports = JogadorRepo