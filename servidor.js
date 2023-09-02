// inatslando modulo express
//npm install express

//importa db.js
const db = require("./db")
//importa modulo express recem instalado
const express = require("express")
//importar modulo parser
const bodyparser = require("body-parser")

//cria servidor js usando express- porem ainda não executa
const server = express()

//configurando servidor
server.use(express.json())
server.use(bodyparser.urlencoded({
    extended: true
}))
server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type", "Authorization");
    res.setHeader("Access-Control-Allow-Methods", "Content-Type", "Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
    next()
})
//===== a partir daqui é uma API res ====
//está função retorna todos os produtos via metodo HTTP GET
// get: http://localhost:3000/produtos

server.get("/produtos", async (req, res) => {
    const produtos = await db.selecionaProdutos()
    return res.json(produtos)
})

//retorna somente um produto atravs do id
//GET:  http://localhost:3000/produtos/1

server.get("/produtos/:id", async (req, res) => { // o primeiro (req) é o parametro e o segundo (RES) é a reposta 
    console.log(req.params)
    const {
        id
    } = req.params
    const produto = await db.buscaPorId(id)
    //retorna array contendo produto vazio 
    return res.json(produto)

})

//metodo para  excluir produtos
server.delete("/produtos/:id", async (req, res) => {
    const {
        id
    } = req.params
    const retorno = await db.deletaProduto(id)
    return res.json(retorno[0].affectedRows == 1)
})

//Salvar Produtos 
// POST : http://localhost:300/produtos
server.post("/produtos", async (req, res) => {
    const produto = req.body;
    console.log("===== Conteudo do Body; ", produto, "=====");

    const retorno = await db.insereProduto(produto)


    if (retorno[0].affectedRows == 1)
        res.json({
            sucesso: true
        })
    else
        res.json({
            sucesso: false
        })
})
//atualiza um produto
// PUT: http://localhost:3000/produtos
server.put("/produtos", async (req, res) => {
    const produto = req.body
    console.log("===== Conteudo do body", produto, "=====")

    const retorno = await db.atualizaProduto(produto.id, produto)

    if (retorno[0].affectedRows == 1)
        res.json({
            sucesso: true
        })
    else
        res.json({
            sucesso: false
        })
})


//inicia a execução do servidor
server.listen("3000", () => {
    console.log("Servidor Iniciado")
})