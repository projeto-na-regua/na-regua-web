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
import ConfirmacaoBarbearia from './pages/Cadastro/ConfirmacaoBarbearia/ConfirmacaoBarbearia'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ServicoBarbeiro from "./pages/ServicoBarbeiro/ServicoBarbeiro"
import BuscaBarbearia from "./pages/BuscaBarbearia/BuscaBarbearia.jsx"
import VisualizarBarbearia from "./pages/VisualizarBarbearia/VisualizarBarbearia.jsx"
import SelecionarDataHora from "./pages/SelecionarDataHora/SelecionarDataHora.jsx"
import AgendamentoUsuario from './pages/AgendamentoUsuario/AgendamentosUsuario.jsx'
import { Galeria } from './pages/Galeria/Galeria.jsx'
import AgendamentoBarbearia from './pages/AgendamentoBarbearia/AgendamentoBarbearia.jsx'
import Gerenciamento from './pages/Gerenciamento/Gerenciamento.jsx'
import Configuracoes from './pages/Configuracoes/Configuracoes.jsx'
import Financeiro from './pages/Financeiro/Financeiro.jsx'
import { Cadastro } from './pages/Cadastro/Cadastro.jsx'

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
          <Route path="/confirmacao" element={<Confirmacao />} />

          <Route path="/cadastro-barbearia" element={<CadastroBarbearia />} />
          <Route path="/confirmacao-barbearia" element={<ConfirmacaoBarbearia />} />

          <Route path="/perfil/agendamentos" element={<AgendamentoUsuario />} />
          <Route path="/perfil/galeria" element={<Galeria />} />

          <Route path="/agenda" element={<AgendamentoBarbearia />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/servicos" element={<ServicoBarbeiro />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/gerenciamento" element={<Gerenciamento />} />

          <Route path="/configuracoes" element={<Configuracoes />} />

          <Route path="/busca-barbearias" element={<BuscaBarbearia />} />
          <Route path="/visualizar-barbearia" element={<VisualizarBarbearia />} />
          <Route path="/selecionar-data-hora" element={<SelecionarDataHora />} />

          {/* telas teste */}
          <Route path="/cadastro-teste" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Rotas
