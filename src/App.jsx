import './App.css'
import Cadastrar from './pages/cadastrar/cadastrar'
import ListarCadastro from './pages/listar-cadastro/listar-cadastro'

function App() {
 
  return (
    <>
      <header>
        <h1>HEADER AQUI FINGE QUE O HEADER ESTÁ AQUI</h1>
      </header>
      <main>
        <ListarCadastro />
        <Cadastrar/>
      </main>
     
   
    </>
  )
}

export default App