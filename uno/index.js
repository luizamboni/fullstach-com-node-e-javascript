const express = require("express")
const cookieParser = require('cookie-parser')
const fs = require('fs/promises');

const Jogador = require("./core/match/jogador")
const Jogo = require("./core/match/jogo")
const PlayJogo = require("./core/play/jogo")

const JogadorRepo = require("./repositorios/match/jogador-repo")
const { JogoRepo, JogoNaoEncontrado } = require("./repositorios/match/jogo-repo")

const PlayJogoRepo = require("./repositorios/play/jogo-repo")

const jogadorRepo = new JogadorRepo("./db/match/jogador")
const jogoRepo = new JogoRepo("./db/match/jogo")
const playJogoRepo = new PlayJogoRepo("./db/play/jogo")
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('frontend/css/'))
app.use(express.static('frontend/script/'))


app.use(async (req, res, next) => {
    if (!req.cookies.idJogador) {
        const jogador = new Jogador({})
        await jogadorRepo.save(jogador)
        req.jogador = jogador
        res.cookie("idJogador", jogador.id)
    } else {
        try {
            const jogador = await jogadorRepo.getById(req.cookies.idJogador)
            req.jogador = jogador
        } catch(err) {
            const jogador = new Jogador({})
            await jogadorRepo.save(jogador)
            req.jogador = jogador
            res.cookie("idJogador", jogador.id)
        }
    }
    
    next()
})

app.get("/", async (req, res) => {
    res.end(await fs.readFile("./frontend/pages/index.html"))
});

app.get("/jogos", async (req, res) => {
    res.end(await fs.readFile("./frontend/pages/jogos.html"))
});

app.get("/jogo/:idJogo", async (req, res) => {
    res.end(await fs.readFile("./frontend/pages/jogo.html"))
});

app.get("/espera/:idJogo", async (req, res) => {
    res.end(await fs.readFile("./frontend/pages/espera.html"))
});



app.get("/v1/jogador/sessao", async (req, res) => {
    const { jogador } = req
    res.json(jogador)
})

app.get("/v1/jogador/:idJogador", async (req, res) => {
    try {
        const { params: { idJogador }} = req
        const jogador = await jogadorRepo.getById(idJogador)
        res.json(jogador)
    } catch(err) {
        res.status(500).json(err)
    }
})

app.put("/v1/jogador/nome", async (req, res) => {
    const { body, jogador } = req
    const { nome } = body
    jogador.nome = nome
    await jogadorRepo.save(jogador)
    res.json({})
});


app.get("/v1/jogos", async (req, res) => {
    const jogos = await jogoRepo.list()
    res.json(jogos)
});

app.post("/v1/jogos", async (req, res) => {
    const { body, jogador } = req
    const { titulo } = body
    try {
        const jogo = new Jogo({ idJogador: jogador.id, titulo })
        await jogoRepo.save(jogo)
        res.json(jogo)
    } catch(err) {
        return res.status(400).json({ message: err.message })
    }
});

app.put("/v1/jogos/:idJogo", async (req, res) => {
    const { params, jogador } = req
    const { idJogo } = params 
    try {

        const jogo = await jogoRepo.getById(idJogo)
        jogo.entrar(jogador.id)
        await jogoRepo.save(jogo)
        res.json(jogo)
    } catch(err) {
        return res.status(400).json({ message: err.message })
    }
})

app.get("/v1/jogos/:idJogo", async (req, res) => {
    const { params, query } = req
    const { idJogo } = params 
    const { inicioDaEspera } = query

    try {
        const jogo = await jogoRepo.getById(idJogo)
        // if (jogo.estado === Jogo.estados.AGUARDANDO) {
        //     const inicio = new Date(inicioDaEspera)
        //     const agora = new Date()
        //     const minutosPassados = Math.ceil((agora - inicio)/1000/60)
    
        //     if (minutosPassados >= 1) {
        //         jogo.estado = Jogo.estados.INICIADO
        //         jogoRepo.save(jogo)
        //     }
        // }
        res.json(jogo)
    } catch(err) {
        return res.status(400).json({ message: err.message })
    }
})


// responde o estado do jogo
app.get("/api/play/v1/:idJogo", async (req, res) => {

    const { params, jogador } = req
    const { idJogo } = params 
    try {
        
        const playJogo = await playJogoRepo.getById(idJogo)    
        res.json(playJogo.visaoDoJogador(jogador.id))

    } catch(err) {

        console.log(err)
        try {
            const jogo = await jogoRepo.getById(idJogo)    

            const playJogo = new PlayJogo({
                id: jogo.id,
                titulo: jogo.titulo,
                idsJogadores: [ jogo.idCriador, jogo.idDesafiador ],
            })

            playJogo.iniciar()

            await playJogoRepo.save(playJogo)    
            res.json(playJogo.visaoDoJogador(jogador.id))
        } catch(err) {
            if (err === JogoNaoEncontrado) {
                return  res.status(404).json({ message: err.message })
            }
            console.error(err)
            res.status(500).json(err)
        }
    }
})

app.post("/api/play/v1/:idJogo", async (req, res) => { 

    const { params, body: event, jogador } = req
    const { idJogo } = params 
    const playJogo = await playJogoRepo.getById(idJogo)
    try {
        playJogo.executarJogada(jogador.id, event)
        playJogoRepo.save(playJogo)
    } catch(err) {
        return res.status(400).json({ message: err.message })
    }

    res.json({})
})



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err)
});


app.listen(3000, () => {
    console.log("aplicação iniciou na porta 3000")
})

// (async () => {

//     const id = "1edebc2a-b331-4e05-808f-8d413781c876"
//     const playJogo = await playJogoRepo.getById(id)    
//     playJogo.iniciar()
//     console.log(playJogo.visaoDoJogador('7bdf5d5e-0f78-4e7b-b469-eed5f26bafcb'))
// })()
