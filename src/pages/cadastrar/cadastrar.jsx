import React, { useState } from 'react';
import axios from 'axios';
import styles from './Cadastrar.module.css'; 

function Cadastrar() {
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    email: '',
  });

  const [errors, setErrors] = useState({ email: '' });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: value && !validateEmail(value) ? 'E-mail inválido' : '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'E-mail inválido' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/cadastrar', formData);
      alert(`Usuário ${res.data.nome} cadastrado com sucesso!`);
      setFormData({ nome: '', senha: '', email: '' });
      setErrors({ email: '' });
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.card}>
        <h2>Cadastrar</h2>
        <form onSubmit={handleSubmit} className={`${styles.form} ${styles.formulario}`}>
          <h3>Nome</h3>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className={styles.input} />

          <h3>Senha</h3>
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} required className={styles.input} />

          <h3>Email</h3>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`${styles.input} ${errors.email ? styles['input-error'] : ''}`}
          />
          <div className={`${styles['error-message']} ${errors.email ? styles.visible : ''}`}>
            {errors.email}
          </div>

          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastrar;
