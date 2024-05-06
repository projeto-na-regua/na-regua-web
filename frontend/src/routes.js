import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import CadastroUsuario from './pages/Cadastro/CadastroUsuario/CadastroUsuario'
import CadastroBarbearia from './pages/Cadastro/CadastroBarbearia/CadastroBarbearia'
import Confirmacao from './pages/Cadastro/Confirmacao/Confirmacao'
import CadastroEndereco from './pages/Cadastro/CadastroEndereco/CadastroEndereco'
import Funcionarios from "./pages/Funcionario/Funcionario"
import MeusCortes from './pages/MeusCortes/MeusCortes'
import AgendamentosBarbearia from "./pages/Agendamento/Barbearia/AgendamentoBarbearia"
import AgendamentosUsuario from "./pages/Agendamento/Usuario/AgendamentoUsuario"
import Perfil from './pages/Perfil/Perfil'

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
          <Route path="/cadastro-barbearia" element={<CadastroBarbearia /> } />
          <Route path="/confirmacao" element={<Confirmacao />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/meus-cortes" element={<MeusCortes />}/>
          <Route path="/minha-agenda" element={<AgendamentosBarbearia />}/>
          <Route path="/meus-agendamentos" element={<AgendamentosUsuario />}/>
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Rotas
