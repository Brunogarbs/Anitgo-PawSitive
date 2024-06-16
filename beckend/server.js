const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors()); // Usar o middleware cors
app.use(bodyParser.json());

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Diretório onde as imagens serão salvas temporariamente
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Soufeliz@1715',
    database: 'pawsitivedb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});


// Rota para obter todos os animais
app.get('/api/animals', (req, res) => {
    const query = 'SELECT * FROM animals';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao obter animais:', err);
            res.status(500).json({ success: false, message: 'Erro ao obter animais' });
            return;
        }
        res.json({ success: true, animals: results });
    });
});

// Rota para cadastro de novo animal
app.post('/novo-animal', upload.single('foto'), (req, res) => {
    const { animal, sexo, cor, localizacao, observacoes, userId } = req.body; // Certifique-se de que userId é enviado do cliente

    let fotoPath = null;
    if (req.file) {
        fotoPath = req.file.path; // Caminho temporário da imagem
    }

    // Inserir novo animal no banco de dados junto com o ID do usuário
    const insertAnimalQuery = 'INSERT INTO animals (animal, sexo, cor, localizacao, foto, observacoes, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(insertAnimalQuery, [animal, sexo, cor, localizacao, fotoPath, observacoes, userId], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar animal:', err);
            res.json({ success: false, message: 'Erro ao cadastrar animal' });
            return;
        }

        console.log('Animal cadastrado com sucesso:', result);
        res.json({ success: true, message: 'Animal cadastrado com sucesso' });

        // Excluir a imagem temporária após inserção no banco de dados
        if (fotoPath) {
            fs.unlink(fotoPath, err => {
                if (err) {
                    console.error('Erro ao excluir imagem temporária:', err);
                }
            });
        }
    });
});

// Rota para cadastro de usuário
app.post('/signup', (req, res) => {
    const { nome, usuario, senha } = req.body;

    // Verificar se usuário já existe
    const checkUserQuery = 'SELECT * FROM users WHERE usuario = ?';
    db.query(checkUserQuery, [usuario], (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            res.json({ success: false, message: 'Erro ao verificar usuário' });
            return;
        }

        // Se usuário já existe, retornar mensagem de erro
        if (results.length > 0) {
            res.json({ success: false, message: 'Usuário já cadastrado' });
            return;
        }

        // Inserir novo usuário no banco de dados
        const insertUserQuery = 'INSERT INTO users (nome, usuario, senha) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [nome, usuario, senha], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                res.json({ success: false, message: 'Erro ao cadastrar usuário' });
                return;
            }
            console.log('Usuário cadastrado com sucesso:', result);
            res.json({ success: true, message: 'Usuário cadastrado com sucesso' });
        });
    });
});

// Rota para login de usuário
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    const query = 'SELECT * FROM users WHERE usuario = ? AND senha = ?';
    db.query(query, [usuario, senha], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.json({ success: false, message: 'Usuário ou senha incorretos' });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
