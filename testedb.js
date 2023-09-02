(async() => {
    
    const db = require('./db')
/*
    console.log("Pesquisando todos os produtos")
    const produtos = await db.selecionaProdutos()
    console.log(produtos)
*/

    console.log ("buscando por id")
    const produto = await db.buscaPorid(3)
    console.log(produto)

/*
console.log("inserindo produto novo")
produto= {
    descricao: "Barra de cereais veganas",
    categoria: 1,
    preco: 21.60,
    quantidade: 5,
    url:"imagens/cereais.png"
}

const inseriu = await db.insereProduto (produto)
console.log (inseriu)
 */
/*
    console.log("apagando produto")
    const apagou = await db.deletaProduto(3)
    console.log (apagou)
    */
})()

