class Empregado {
    constructor(nome, cargo, salario) {
        this.nome = nome 
        this.cargo = cargo
        if (typeof salario !== "number") {
            throw Error('salário precisa ser numérico')
        }
        this.salario = salario
    }

    exibir() {
        console.log(`exibindo dados do funcionário:\n ${this.nome}`)
        console.log("cargo:", this.cargo)
        console.log("salario:",this.salario)
    }
}

const empregados = [
    new Empregado("josé", "software developer jr", 5000),
    new Empregado("paula", "software developer sr", 9000),
    new Empregado("maria", "lider de tecnologia", 14000),
]

for (const empregado of empregados) {
    empregado.exibir()
}