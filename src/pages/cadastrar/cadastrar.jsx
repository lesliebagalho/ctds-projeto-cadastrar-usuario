


import React, { useState } from 'react';
import axios from 'axios';


function Cadastrar() {
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: 'E-mail inválido',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: '',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
    <div className="card">
      <h2>Cadastrar</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`input ${errors.email ? 'input-error' : ''}`}
        />

        <div className={`error-message ${errors.email ? 'visible' : ''}`}>
          {errors.email}
        </div>

        <button type="submit" className="button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastrar;

