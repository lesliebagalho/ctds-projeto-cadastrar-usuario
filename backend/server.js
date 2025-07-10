import express from 'express';
import cors from 'cors';
import sqlite3pkg from 'sqlite3';
import bodyParser from 'body-parser';

const sqlite3 = sqlite3pkg.verbose();

// Cria a aplicação Express
const app = express();

// Cria ou abre o banco de dados SQLite
const db = new sqlite3.Database('./usuarios.db');

// Middleware para permitir requisições JSON, urlencoded e CORS
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cria a tabela de usuários se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email VARCHAR,
  senha VARCHAR
)`);

// Rota para cadastro de novo usuário
app.post('/cadastrar', (req, res) => {
  const { nome, email, senha } = req.body;

  db.run(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nome, email, senha });
    }
  );
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