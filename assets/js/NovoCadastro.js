// Função para sair (deslogar)
function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "../html/signin.html";
}


// Seleção do formulário de cadastro
const animalForm = document.getElementById('animalForm');
const userId = JSON.parse(localStorage.getItem('userLogado')).id; // Ajuste isso com base na estrutura real de seu usuário

animalForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const animal = document.getElementById('animal').value;
    const sexo = document.getElementById('sexo').value;
    const cor = document.getElementById('cor').value;
    const localizacao = document.getElementById('localizacao').value;
    const foto = document.getElementById('foto').files[0];
    const observacoes = document.getElementById('observacoes').value;

    // Cria um objeto FormData para enviar os dados
    const formData = new FormData();
    formData.append('animal', animal);
    formData.append('sexo', sexo);
    formData.append('cor', cor);
    formData.append('localizacao', localizacao);
    formData.append('foto', foto);
    formData.append('observacoes', observacoes);
    formData.append('userId', userId); // Adicione userId ao FormData

    // Fazendo a requisição fetch para o servidor
    fetch('http://localhost:3000/novo-animal', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            msgSuccess.style.display = 'block';
            msgSuccess.innerHTML = '<strong>Animal cadastrado com sucesso!</strong>';
            msgError.style.display = 'none';
            
            // Redirecionamento para index.html após sucesso
            window.location.href = '../../index.html'; // Ajuste o caminho conforme necessário
            animalForm.reset(); // Reseta o formulário
        } else {
            msgError.style.display = 'block';
            msgError.innerHTML = `<strong>${result.message}</strong>`;
            msgSuccess.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        msgError.style.display = 'block';
        msgError.innerHTML = '<strong>Erro ao conectar ao servidor</strong>';
        msgSuccess.style.display = 'none';
    });
});

