let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
    if (inputSenha.getAttribute('type') === 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password');
    }
});

let usuario = document.querySelector('#usuario');
let userLabel = document.querySelector('#userLabel');
let senha = document.querySelector('#senha');
let senhaLabel = document.querySelector('#senhaLabel');
let msgError = document.querySelector('#msgError');

async function entrar() {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: usuario.value,
                senha: senha.value
            })
        });

        const data = await response.json();

        if (data.success) {
            const userValid = data.user;
            window.location.href = '../../index.html';

            let mathRandom = Math.random().toString(16).substr(2);
            let token = mathRandom + mathRandom;

            localStorage.setItem('token', token);
            localStorage.setItem('userLogado', JSON.stringify(userValid));
        } else {
            userLabel.setAttribute('style', 'color: red');
            usuario.setAttribute('style', 'border-color: red');
            senhaLabel.setAttribute('style', 'color: red');
            senha.setAttribute('style', 'border-color: red');
            msgError.setAttribute('style', 'display: block');
            msgError.innerHTML = 'Usuário ou senha incorretos';
            usuario.focus();
        }
    } catch (error) {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong>Erro ao conectar ao servidor</strong>';
    }
}
