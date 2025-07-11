import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./editar-cadastro.module.css"
import { Link } from 'react-router-dom';
function EditarCadastro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ nome: '', senha: '', email: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/usuarios/${id}`);
        setFormData({
          nome: res.data.nome || '',
          email: res.data.email || '',
          senha: '',
        });
      } catch (err) {
        alert('Erro ao carregar dados do usuário');
        console.error(err);
      }
    };

    if (id) fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/usuarios/${id}`, formData);
      alert('Usuário atualizado com sucesso!');
      setShowModal(false);
      navigate('/listar-cadastro');
    } catch (err) {
      alert('Erro ao atualizar usuário');
      console.error(err);
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.card}>
        <h2 className={styles.tituloPrincipal} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Editar Cadastro
        </h2>
        <form className={styles.formulario} onSubmit={e => e.preventDefault()}>
          <input
            className={styles.input}
            type="text"
            name="nome"
            placeholder="Nome de usuário"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <button type="button" className={styles.btnSalvar} onClick={() => setShowModal(true)}>
            Salvar
          </button>
          <Link to="/listar-cadastro">
  <button type="button" className={styles.btnExcluir}>
    Voltar
  </button>
</Link>
        </form>
      </div>
  
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Deseja salvar as alterações?</h2>
            <button onClick={handleSubmit} className={styles.btnSalvar}>
              Salvar Edição
            </button>
            <button onClick={() => setShowModal(false)} className={styles.btnCancelar}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  
}

export default EditarCadastro;
