import React, { useState } from 'react';
import axios from 'axios';
import styles from './Cadastrar.module.css'; 

function Cadastrar() {
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    email: '',
  });

  // Mensagens de erro em tempo real
  const getFieldError = (name, value) => {
    if (!value) return `Campo ${name} deve ser preenchido.`;
    if (name === 'nome' && value.length < 2) return 'O nome deve ter pelo menos 2 caracteres.';
    if (name === 'senha' && value.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido.';
      if (value.length > 100) return 'E-mail deve ter até 100 caracteres.';
    }
    return '';
  };

  // Calcula erros dinamicamente
  const errors = {
    nome: getFieldError('nome', formData.nome),
    senha: getFieldError('senha', formData.senha),
    email: getFieldError('email', formData.email),
  };

  // Se todos campos vazios, exibe aviso acima do form
  const allEmpty = !formData.nome && !formData.senha && !formData.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && value.length > 100) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Não impede submit, mas avisa se tem erro
    if (errors.nome || errors.senha || errors.email) {
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/cadastrar', formData);
      alert(`Usuário ${res.data.nome} cadastrado com sucesso!`);
      setFormData({ nome: '', senha: '', email: '' });
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.card}>
        <h2>Cadastrar</h2>
        {/* Aviso geral se tudo vazio */}
        {allEmpty && (
          <p className={styles['top-error']}>Preencha todos os campos para continuar.</p>
        )}
        <form onSubmit={handleSubmit} className={`${styles.form} ${styles.formulario}`}>
          <h3>Nome</h3>
          <input
            type="text"
            name="nome"
            placeholder='insira seu nome'
            value={formData.nome}
            onChange={handleChange}
            className={`${styles.input} ${errors.nome ? styles['input-error'] : ''}`}
          />
          {/* Erro específico do nome */}
          {errors.nome && (
            <p className={styles['error-message']}>{errors.nome}</p>
          )}

          <h3>Senha</h3>
          <input
            type="password"
            name="senha"
            placeholder='insira sua senha'
            value={formData.senha}
            onChange={handleChange}
            className={`${styles.input} ${errors.senha ? styles['input-error'] : ''}`}
          />
          {/* Erro específico da senha */}
          {errors.senha && (
            <p className={styles['error-message']}>{errors.senha}</p>
          )}

          <h3>Email</h3>
          <input
            type="text"
            name="email"
            placeholder='insira seu e-mail'
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
            className={`${styles.input} ${errors.email ? styles['input-error'] : ''}`}
          />
          {/* Erro específico do email */}
          {errors.email && (
            <p className={styles['error-message']}>{errors.email}</p>
          )}

          <button
            type="submit"
            className={styles.button}
            // NUNCA mais bloqueia o botão!
            style={{
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastrar;