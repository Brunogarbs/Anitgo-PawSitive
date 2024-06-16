// Verificação se o usuário está logado
if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página!");
    window.location.href = "./assets/html/signin.html";
}

// Recuperação dos dados do usuário logado
let userLogado = JSON.parse(localStorage.getItem("userLogado"));

// Exibição do nome do usuário logado no elemento #logado
let logado = document.querySelector("#logado");
logado.innerHTML = 'Olá <span class="laranja">' + userLogado.nome + '!</span> Bem-vindo ao <span class="laranja">Paws</span>itive';

// Função para sair (deslogar)
function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "./assets/html/signin.html";
}

// Função para redirecionar para a página de Novo Cadastro
function NovoCadastro() {
    window.location.href = "./assets/html/NovoCadastro.html";
}
fetch('/api/animals', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao carregar os dados dos animais: ' + response.status);
    }
    return response.json();
})
.then(data => {
    const animals = data.animals; // Extrai os animais da resposta JSON

    const carouselIndicators = document.querySelector('.carousel-indicators');
    const carouselInner = document.querySelector('.carousel-inner');

    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';

    animals.forEach((animal, index) => {
        // Código para adicionar animais ao carrossel
    });
})
.catch(error => console.error('Erro ao obter dados dos animais:', error));
