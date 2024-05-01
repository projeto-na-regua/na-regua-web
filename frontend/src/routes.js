import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import CadastroUsuario from './pages/Cadastro/CadastroUsuario/CadastroUsuario'
import CadastroBarbearia from './pages/Cadastro/CadastroBarbearia/CadastroBarbearia'
import Confirmacao from './pages/Cadastro/Confirmacao/Confirmacao'
import CadastroEndereco from './pages/Cadastro/CadastroEndereco/CadastroEndereco'

function Rotas() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/cadastro-endereco" element={<CadastroEndereco />} />
          <Route path="/cadastro-barbearia" element={<CadastroBarbearia />} />
          <Route path="/confirmacao" element={<Confirmacao />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Rotas
