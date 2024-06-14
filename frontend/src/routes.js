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
import ConfirmacaoBarbearia from './pages/Cadastro/ConfirmacaoBarbearia/ConfirmacaoBarbearia'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ServicoBarbeiro from "./pages/ServicoBarbeiro/ServicoBarbeiro"
import FluxoDeCaixa from "./pages/FluxoDeCaixa/FluxoDeCaixa.jsx"
import Historico from "./pages/HistoricoUsuario/HistoricoUsuario.jsx"
import BuscaBarbearia from "./pages/BuscaBarbearia/BuscaBarbearia.jsx"
import ImagePerfil from "./pages/ImagePerfil.jsx"
import VisualizarBarbearia from "./pages/VisualizarBarbearia/VisualizarBarbearia.jsx"
import PersonalizarBarbearia from './pages/Personalizacao/Personalizacao'
import SelecionarDataHora from "./pages/SelecionarDataHora/SelecionarDataHora.jsx"

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
          <Route path="/confirmacao-barbearia" element={<ConfirmacaoBarbearia />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
          <Route path="/meus-cortes" element={<MeusCortes />}/>
          <Route path="/minha-agenda" element={<AgendamentosBarbearia />}/>
          <Route path="/meus-agendamentos" element={<AgendamentosUsuario />}/>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/personalizar-barbearia" element={<PersonalizarBarbearia />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/servicos" element={<ServicoBarbeiro />} />
          <Route path="/fluxo-de-caixa" element={<FluxoDeCaixa />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/busca-barbearia" element={<BuscaBarbearia />} />
          <Route path="/imagem-perfil" element={<ImagePerfil />} />
          <Route path="/visualizar-barbearia" element={<VisualizarBarbearia />} />
          <Route path="/selecionar-data-hora" element={<SelecionarDataHora />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Rotas;
