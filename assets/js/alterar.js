document.addEventListener("DOMContentLoaded", () => { //evento para crregar depois de executado pagina html 
    //recupera o valor do parametro da id da url 
    //ex: http://127.0.0.1:5500/alert.html?id=1

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get("id")

    //solicita ao servidor rodando na porta 3000 o produto de id 
    fetch("http://localhost:3000/produtos/" + id)

        //converte a resposta em formatdo JSON
        .then((res) => res.json())

        // pega os dados da resposta json convertidada 
        .then((produto) => {
            if (produto != null) {
                preencher_formulario(produto)
            } else {
                alert("Erros: Nenhum produto retornado na busca por id")
            }
            //captura erro se houver
        }).catch(() => alert("Erro ao buscar id no banco de dados"))
})

//função para preencher formulario
const preencher_formulario = (produto) => {
    document.getElementById("id").value = produto.id
    document.getElementById("descricao").value = produto.descricao
    document.getElementById("categoria").value = produto.categoria
    document.getElementById("preco").value = produto.preco.toString().replace(".", ",") //substitui o ponto por virgula
    document.getElementById("quantidade").value = produto.quantidade
    document.getElementById("url").value = produto.url
}

//atualiza os dados do formulaio utilizando o metodo PUT
const atualizar = () => {
    if (!validarFormulario())
        return;
    const produto = {
        id: document.getElementById("id").value,
        descricao: document.getElementById("descricao").value,
        categoria: parseInt(document.getElementById("categoria").value),
        preco: parseFloat(document.getElementById("preco").value.replace(",", ".")), //float quando tem ponto flutuante 
        quantidade: parseInt(document.getElementById("quantidade").value),
        url: document.getElementById("url").value

    }

    // fetch envia e recebe, then resposta, catch; é o erro 
    fetch("http://localhost:3000/produtos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
        //converte a resposta ("stringuificada") do servidor em objeto javascript (json)
    }).then((res) => res.json()
        //pega objeto json e mostra no console
    ).then((res) => console.log(res)

    ).then(() => {
        console.log("Produto atualizado com sucesso")
        //altera a pagina do navegador 
        // location.href = "gerenciar.html"
        //informa se houver algum erro
    }).catch((erro) =>
        alert("Erro ao Atualizar produtos" + erro)
    )


    //JSON.Stringfy // trasforma em string 
    //json() / função converte string em objeto
    //servidor receebe em string 
    // formato sting console.log(JSON.stringify(produto)) 
    // formato js console.log(produto)
}