const empregados = [
    {
        nome: 'josé',
        cargo: 'software developer jr',
        salario: 5000,
    },
    {
        nome: 'paula',
        cargo: 'software developer sr',
        salario: 9000,
    },
    {
        nome: 'maria',
        cargo: 'lider de tecnologia',
        salario: 14000,
    }
]

for (const empregado of empregados) {
    console.log(`exibindo dados do funcionário ${empregado.nome}`)
    console.log("cargo:", empregado.cargo)
    console.log("salario",empregado.salario)
}