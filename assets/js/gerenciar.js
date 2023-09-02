
//                          0            1             2
const tipo_categoria = ['Cereais', 'Suplementos', 'Temperos']

// mostra todos os produtos do banco de dados na tabela
const adicionarNaTabela = (dados) => {

    // pega a tabela pelo id
    const tabela = document.getElementById('tabela')

    dados.forEach(produto => {
        // calcula o número de linhas atualda tabela
        const tamanhoTabela = tabela.rows.length
        // insere uma linha abaixo da última
        const linha = tabela.insertRow(tamanhoTabela)
        // insere as celulas da linha
        const id = linha.insertCell(0)
        // adiciona o id no elemento a ser criado
        linha.id = produto.id
        const descricao = linha.insertCell(1)   // col 1
        const categoria = linha.insertCell(2)   // col 2
        const preco = linha.insertCell(3)
        const quantidade = linha.insertCell(4)
        const imagem = linha.insertCell(5)
        const alterar = linha.insertCell(6)
        const excluir = linha.insertCell(7)

        // Preenche as celulas da linha
        id.innerHTML = produto.id
        descricao.innerHTML = produto.descricao
        categoria.innerHTML = tipo_categoria[produto.categoria]
        preco.innerHTML = produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        quantidade.innerHTML = produto.quantidade
        const url = produto.url.toLowerCase()

        // se for imagem da web
        if (url.substring(0, 4) == 'http')
            imagem.innerHTML = '<img src=' + url + ' width="100" class="img-thumbnail">'
        // se for imagem da galeria
        else
            imagem.innerHTML = '<img src="galeria/' + url + '" width="100" class="img-thumbnail">'

        alterar.innerHTML = '<a href="alterar.html?id=' + produto.id + '" class="btn btn-outline-success btn-cmd">Alterar</a>'

        excluir.innerHTML = '<button class="btn btn-outline-danger btn-cmd" onclick="excluirDaTabela(' + produto.id + ')">Excluir</button>'

    })
    
}


// esse código é executado logo depois da página ser carregada
document.addEventListener('DOMContentLoaded', () => {

  
    // solicita ao servidor rodando na porta 3000 a lista dos produtos
    fetch('http://localhost:3000/produtos')

    // converte a resposta do servidor (string) em formato json
    .then((res) => res.json())

    // recebe os dados da resposta json e chama a função para adicionar na tabela
    .then((dados) => adicionarNaTabela(dados))

    // se ocorrer erro, captura e mostra o erro
    .catch(() => alert('Erro ao consultar produtos no banco de dados'))
})


// função para excluir uma linha da tabela e do banco de dados pelo id
const excluirDaTabela = (id) => {

    fetch('http://localhost:3000/produtos/' + id, {
        method: 'DELETE'

    }).then(() => {
        document.getElementById(id).remove()

    }).catch(() => {
        alert('Erro ao excluir produto do banco de dados')
    })
}