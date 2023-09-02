
const alerta_erro = (msg) => {
    const alerta = document.getElementById('alerta')
    alerta.className = 'alert alert-danger'
    alerta.innerHTML = msg

    setTimeout(() => {
        alerta.className = '';
        alerta.innerHTML = '';
    }, 5000)
}