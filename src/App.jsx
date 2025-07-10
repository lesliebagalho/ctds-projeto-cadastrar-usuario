import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/home/page'
import Header from './components/Header/Header'
import Cadastrar from "./pages/cadastrar/page"
import EditarCadastro from "./pages/editarcadastro/page"
import ListarCadastro from "./pages/listar-cadastro/page";
import './App.css';

function App() {
  

  return (
    <>
    <Router >
      <Header/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cadastrar" element={<Cadastrar/>}/>
        <Route path="/editar-cadastro" element={<EditarCadastro/>}/>
        <Route path="/listar-cadastro" element={<ListarCadastro/>}/>
      </Routes>
    </Router>
    </>
  )
};

export default App
