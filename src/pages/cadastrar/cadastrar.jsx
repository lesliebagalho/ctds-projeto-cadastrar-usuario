import { useState } from 'react';
import axios from 'axios';



function App() {
  const [formData, setFormData] = useState({ nome: '', senha: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/cadastrar', formData);
      alert(`Usuário ${res.data.nome} cadastrado com sucesso!`);
    } catch (err) {
      alert('Erro ao cadastrar usuário');
      console.error(err);
    }
  };

  return (
    <div className='card' style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>Cadastrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
         type="text"
          name='email'
          placeholder='email'
          value={formData.email}
          oneChange={handleChange}
          required 
          style={{width: '100%', marginBottom: '10px'}}/>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;
