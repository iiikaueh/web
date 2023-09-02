// esta função envia os dados do formulário para o backend via método POST

const salvar = () => {

    if (!validarFormulario())
        return

    const dados = {
        descricao : document.getElementById('descricao').value,
        categoria : parseInt(document.getElementById('categoria').value),
        preco : parseFloat(document.getElementById('preco').value.replace(',', '.')),
        quantidade : parseInt(document.getElementById('quantidade').value),
        url : document.getElementById('url').value
    }

    console.log(dados)

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)

        // converte resposta do servidor em objeto json
    }).then((res) => res.json()

    // pega objeto json retornado,salvando em dados
    ).then((dados) => console.log(dados)
    
    ).then(() => {
        console.log("Sucesso ao cadastrar produto!")
        location.href = 'gerenciar.html'

    }).catch ((erro) => {
        alert('Erro ao cadastrar produto: ' + erro)
    })  

}