const apiUrl = "http://localhost:3000"

const UnoClient = {
    estados: {
        AGUARDANDO: "aguardando jogador",
        INICIADO: "iniciado",
        TERMINADO: "terminado",
    },

    async _fazRequisicaoHttp(path, data = {}, method = "GET") {

        const options = {
            method,
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        }

        if (method === "GET") {
            delete options.body
        }

        const response = await fetch(`${apiUrl}${path}`,options)
        if (response.status >= 400) {
            const payload = await response.json()
            const error = new Error(payload.message)
            error.payload = payload
            throw error
        }

        return await response.json()
    },

    async setNomeJogador(nome) {
        return this._fazRequisicaoHttp("/v1/jogador/nome", { nome }, "PUT")
    },

    async listarJogos() {
        return this._fazRequisicaoHttp("/v1/jogos")
    },

    async getJogo(idJogo) {
        return this._fazRequisicaoHttp(`/v1/jogos/${idJogo}`)
    },

    async criarNovoJogo(titulo) {
        return this._fazRequisicaoHttp("/v1/jogos", { titulo }, "POST")
    },

    async entrarNoJogo(idJogo) {
        return this._fazRequisicaoHttp(`/v1/jogos/${idJogo}`, {}, "PUT")
    },

    async getJogadorLogado() {
        return this._fazRequisicaoHttp(`/v1/jogador/sessao`)
    },

    async getJogador(idJogador) {
        return this._fazRequisicaoHttp(`/v1/jogador/${idJogador}`)
    },

    async getEstadoDoJogo(idJogo, inicioDaEspera) {
        return this._fazRequisicaoHttp(`/v1/jogos/${idJogo}?inicioDaEspera=${inicioDaEspera}`)
    },

    async getPlayJogo(idJogo) {
        return this._fazRequisicaoHttp(`/api/play/v1/${idJogo}`)
    },

    async jogarCarta(idJogo, carta) {
        return this._fazRequisicaoHttp(
            `/api/play/v1/${idJogo}`, 
            { 
                tipo: "jogar", 
                payload: carta,
            },
            "POST"
        )
    },

    async comprarCarta(idJogo) {
        return this._fazRequisicaoHttp(
            `/api/play/v1/${idJogo}`, 
            { 
                tipo: "comprar", 
                payload: {},
            },
            "POST"
        )
    }
}