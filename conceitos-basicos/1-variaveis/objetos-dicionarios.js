// em javascript temos o object,
// que não se deve confundir com o object da orientação a objetos,
// chamaremos no curso de "dicionários"

// enquanto listas são usadas para organizar valores
// de uma mesma natureza, objetos organizam valores de naturezas diferentes
const empregadoJose = {
    nome: 'josé',
    senioridade: 'software developer jr',
    salario: 5000,
    disponivel: true
}

// acessamos seus atributos via 
console.log(`exibindo dados do funcionário ${empregadoJose.name}`)
console.log("senioridade:", empregadoJose.senioridade)
console.log("salario", empregadoJose.salario)
console.log("disponivel", empregadoJose.disponivel)