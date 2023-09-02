const criaGaleriaProdutos = (array) => {
    const galeria = document.getElementById("galeria")
    //pega cada produto  do array e processa
    array.forEach(p => {
        const preco = p.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
        let url = p.url.toLowerCase()

        if (url.substring(0,4) != "http"){
            url = 'galeria/' + url
        }
        
        const card_produto =

            '<div class="col">' +
                 '<div class="card mb-4" style="width: 18rem;">' +
                 '<img  class="card-img-top" src="'+ url + '">'+

                     '<div class="card-body">' +
                        '<h5 class= "card-title">' + p.descricao + '</h5>' +
                        '<h6 class= "card-subtitle mb-2 text-muted">' + preco + '</h6>' +
                        '<p class=" card-text">Restam:' + p.quantidade + '</p>' +
                        '<p class ="card-text">Cód. : ' + p.id + '</p>' +
                        '<a heref="#" class="btn btn-primary">Adicionar ao carrinho </a>' +
                    '</div>' +



        '</div>' +
        '</div>'

        galeria.innerHTML += card_produto
    })
}





document.addEventListener("DOMContentLoaded", () => {
    //solicita ao servidor rodando na porta 3000 a  lista dos produtos
    fetch("http://localhost:3000/produtos")

        // converte a resposta em formto json
        .then((res) => res.json())
        //pega o array produtos da resposta e cria a galeria 
        .then((array) => criaGaleriaProdutos(array))
        //captura erro se houver 
        .catch(() => alert("erro ao consultar no banco de dados"))
})