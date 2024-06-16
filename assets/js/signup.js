// Seleção dos elementos do formulário
let nome = document.querySelector('#nome');
let usuario = document.querySelector('#usuario');
let senha = document.querySelector('#senha');
let confirmSenha = document.querySelector('#confirmSenha');
let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

// Seleção dos botões para mostrar/esconder senha
let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

// Função para cadastrar usuário
function cadastrar() {
    // Validação dos campos
    if (nome.value && usuario.value && senha.value && senha.value === confirmSenha.value) {
        // Dados a serem enviados para o servidor
        const data = {
            nome: nome.value,
            usuario: usuario.value,
            senha: senha.value
        };

        // Opções da requisição fetch
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // URL do endpoint no servidor Node.js
        const url = 'http://localhost:3000/signup'; // Altere conforme necessário

        // Fazendo a requisição fetch para o servidor
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    msgSuccess.setAttribute('style', 'display: block');
                    msgSuccess.innerHTML = '<strong>Usuário cadastrado com sucesso!</strong>';
                    msgError.setAttribute('style', 'display: none');
                    setTimeout(() => {
                        window.location.href = '../html/signin.html'; // Redireciona após sucesso
                    }, 3000);
                } else {
                    msgError.setAttribute('style', 'display: block');
                    msgError.innerHTML = '<strong>Erro ao cadastrar usuário</strong>';
                    msgSuccess.setAttribute('style', 'display: none');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                msgError.setAttribute('style', 'display: block');
                msgError.innerHTML = '<strong>Erro ao conectar ao servidor</strong>';
                msgSuccess.setAttribute('style', 'display: none');
            });

    } else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente!</strong>';
        msgSuccess.setAttribute('style', 'display: none');
    }
}

// Event listener para mostrar/esconder senha
btn.addEventListener('click', () => {
    mostrarSenha();
});

// Event listener para mostrar/esconder confirmação de senha
btnConfirm.addEventListener('click', () => {
    mostrarConfirmSenha();
});

function mostrarSenha() {
    let inputSenha = document.querySelector('#senha');
    if (inputSenha.getAttribute('type') === 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password');
    }
}

function mostrarConfirmSenha() {
    let inputConfirmSenha = document.querySelector('#confirmSenha');
    if (inputConfirmSenha.getAttribute('type') === 'password') {
        inputConfirmSenha.setAttribute('type', 'text');
    } else {
        inputConfirmSenha.setAttribute('type', 'password');
    }
}
