import { useEffect } from 'react'
import styles from './listar-cadastro.module.css'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const ListarCadastro = () => {
  const [usuarios, setUsuarios] = useState([])

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const excluirUsuario = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir?");
    if (!confirmar) return;

    try {
      const res = await axios.delete(`http://localhost:3001/usuarios/${id}`);
      if (res.status === 204) {
        alert("Usuário excluído com sucesso!");
        setUsuarios((prev) => prev.filter((user) => user.id !== id));
      } else {
        alert("Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir usuário.");
    }
  };

  return (
    <div className={styles.tudo}>
      <h1>Listar Cadastros</h1>

      <div className={styles.frame}>
        <div className={styles.titulos}>
          <h2>Gerenciamento de Cadastros</h2>
          <h3>Lista de todos os membros cadastrados na empresa</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  <Link to="/editar-cadastro">
                    <button className={styles['btn-editar']}>Editar</button>
                  </Link>
                  <button className={styles['btn-excluir']} onClick={() => excluirUsuario(user.id)} >Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListarCadastro
