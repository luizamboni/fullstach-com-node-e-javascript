// classes são tipos definidos pelo progrador
class Funcionario {

    // toda classe tem um contrutor,
    // que é a função chamada quando a instância é criada
    constructor(nome, cargo, salario) {
        // uma classe guarda valores internos, de diferentes naturezas
        this.nome = nome
        this.cargo = cargo
        this.salario = salario
    }

    // classes pode ter funções, são chamadas de métodos
    // em geral trabalham com seus valores internos
    exibir() {
        console.log(`exibindo dados do funcionário ${this.name}`)
        console.log("cargo:", this.cargo)
        console.log("salario",this.salario)
    }
}

// definida a classe, podemos criar quantas instâncias forem
// necessárias
// a classe representa um tipo de coisa, não uma coisa (intância).
let jose = new Funcionario('José', 'software developer jr', 5000)
let paula = new Funcionario('Paula', 'software developer sr', 9000)


jose.exibir()
paula.exibir()


// classes podem derivar de outras,
// isso é chamado de herença
// A classe Gerenete é derivada de funcionário,
// veja que só precisamos escrever o que ficou diferente de uma para outra,
// não alteramos o construtor que permanesce o mesmo
class Gerente extends Funcionario {
    exibir() {
        console.log('-------------------------------------')
        console.log(`exibindo dados do GERENTE ${this.name}`)
        console.log("cargo:", this.cargo)
        console.log("salario",this.salario)
    }
}

jose = new Gerente(jose.nome, 'Gerente de TI', 20000)
jose.exibir()