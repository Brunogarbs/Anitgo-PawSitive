<?php
$hostname = "localhost";  // Endereço do servidor MySQL
$username = "root";  // Seu nome de usuário do MySQL
$password = "Soufeliz@1715";  // Sua senha do MySQL
$dbname = "pawsitivedb";  // Nome do banco de dados

// Conexão com o MySQL usando MySQLi
$conn = new mysqli($hostname, $username, $password, $dbname);

// Verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}
?>
