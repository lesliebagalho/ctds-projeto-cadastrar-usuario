import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from './components/Header/Header'
import Cadastrar from "./pages/cadastrar/cadastrar"

import ListarCadastro from "./pages/listar-cadastro/listar-cadastro";
import './App.css';

function App() {
  

  return (
    <>
    <Router >
      <Header/>
     
      <Routes>
        
        <Route path="/cadastrar" element={<Cadastrar/>}/>
        
        <Route path="/listar-cadastro" element={<ListarCadastro/>}/>
      </Routes>
    </Router>
    </>
  )
};

export default App
