
async function conectar(){
    // se existir uma conexão e não está desconectado
    if (global.conexao && global.conexao.state != 'disconnected')
        return global.conexao

    // cria objeto com suporte a promise para comunicação com o banco mysql
    const mysql = require('mysql2/promise')
    // cria a conexão com banco
    const conexao = mysql.createConnection("mysql://root:softgraf@localhost:3306/mundoverde")
    console.log('Conectou com MySQL Mundo Verde')
    global.conexao = conexao
    return conexao
}


async function selecionaProdutos(){
    // espera até se conectar com o banco
    const con = await conectar()
    const [tabela] = await con.query('SELECT id, descricao, categoria, preco, quantidade, url FROM Produtos')
    return tabela
}


async function buscaPorId(id){
    const con = await conectar()
    const sql = "SELECT * FROM Produtos WHERE id=?"
    const [[tabela]] = await con.query(sql, id)
    return tabela
}

async function insereProduto(produto){
    const con = await conectar();
    const sql = 'INSERT INTO Produtos (descricao, categoria, preco, quantidade, url) VALUES (?, ?, ?, ?, ?)'
    const valores = [produto.descricao, produto.categoria, produto.preco, produto.quantidade, produto.url]
    return await con.query(sql, valores)
}

async function atualizaProduto(id, produto){
    const con = await conectar()
    const sql = "UPDATE Produtos SET descricao=?, categoria=?, preco=?, quantidade=?, url=? WHERE id=?"
    const valores = [produto.descricao, produto.categoria, produto.preco, produto.quantidade, produto.url, id]

    return await con.query(sql, valores)
}


async function deletaProduto(id){
    const con = await conectar()
    const sql = 'DELETE FROM Produtos WHERE id=?'
    return await con.query(sql, id)
}

module.exports = {selecionaProdutos, buscaPorId, insereProduto, deletaProduto, atualizaProduto}
