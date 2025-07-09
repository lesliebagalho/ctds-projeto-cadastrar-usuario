// Importa o framework Express
const express = require('express');

// Importa a biblioteca do SQLite com mensagens de debug
const sqlite3 = require('sqlite3').verbose();

// Importa o CORS middleware para permitir comunicação com o frontend
const cors = require('cors');

// Cria a aplicação Express
const app = express();

// Cria ou abre o banco de dados SQLite
const db = new sqlite3.Database('./usuarios.db');

// Middleware para permitir requisições JSON e CORS
app.use(cors());
app.use(express.json());

// Cria a tabela de usuários se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  senha TEXT
)`);

// Rota para cadastro de novo usuário
app.post('/cadastrar', (req, res) => {
  const { nome, senha } = req.body;

  db.run('INSERT INTO usuarios (nome, senha) VALUES (?, ?)', [nome, senha], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nome, senha });
  });
});

// Rota para listar todos os usuários
app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Inicia o servidor
app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
