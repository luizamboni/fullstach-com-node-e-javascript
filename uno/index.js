const express = require("express")


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const jogos = [
    { id: 2131231, jogo: "Uno com Jéssica" , estado: "aguardando jogador" },
    { id: 2131231, jogo: "Uno com João" , estado: "iniciado" }
]

app.get("/v1/jogos", (req, res) => {

    res.json(jogos)
});

app.post("/v1/jogos", (req, res) => {
    const { body } = req
    console.log(body)
    // jogos.push(

    // )

    res.json(jogos)
});

app.listen(3000, () => {
    console.log("aplicação iniciou na porta 3000")
});
