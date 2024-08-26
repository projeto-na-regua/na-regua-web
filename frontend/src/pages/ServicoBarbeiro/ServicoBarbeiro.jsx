import React, { useState, useEffect } from 'react'
import styles from './ServicoBarbeiro.module.css'
import api from '../../api'
import { toast } from 'react-toastify'
import { theme } from '../../theme'
import {
  Button,
  TextField,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material'
import BoxServicos from '../../components/BoxServicos/BoxServicos'
import { Sidebar } from '../../components/Sidebar'
import { HeaderUsuario } from '../../components/Header'

// Formatar duração da seleção de duração do servico
const duracoes = Array.from({ length: 11 }, (_, i) => 30 + i * 15)

const formatarDuracao = (minutos) => {
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  if (horas > 0) {
    return `${horas} h ${mins > 0 ? `${mins} m` : ''}`
  }
  return `${mins} m`
}


export function ServicoBarbeiro() {
  const [aberto, setAberto] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [duracaoAberta, setDuracaoAberta] = useState(false)
  const [duracaoServico, setDuracaoServico] = useState('')
  const [nomeServico, setNomeServico] = useState('')
  const [descricaoServico, setDescricaoServico] = useState('')
  const [valorServico, setValorServico] = useState('')
  const [responsaveis, setResponsaveis] = useState([])
  const [servicoEditando, setServicoEditando] = useState(null)
  const [listaServicosAtivos, setListaServicosAtivos] = useState([])
  const [listaServicosInativos, setListaServicosInativos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [funcionarios, setFuncionarios] = useState([])
  const [carregandoFuncionarios, setCarregandoFuncionarios] = useState(true)

  // Função para pegar funcionários
  const pegarFuncionarios = async () => {
    try {
      const resposta = await api.get('/funcionarios', {
        headers: {
          Authorization: token,
        },
      })

      // Mapeia a resposta para retornar apenas nome e email
      return resposta.data.map((funcionario) => ({
        nome: funcionario.nome,
        email: funcionario.email,
      }))
    } catch (erro) {
      console.error('Erro ao buscar funcionários:', erro)
      return []
    }
  }

  // Função para buscar funcionários
  useEffect(() => {
    const buscarFuncionarios = async () => {
      try {
        const funcionariosData = await pegarFuncionarios()
        setFuncionarios(funcionariosData)
      } catch (erro) {
        console.error('Erro ao carregar funcionários:', erro)
      } finally {
        setCarregandoFuncionarios(false)
      }
    }

    buscarFuncionarios()
  }, [])

  // Função para enviar dados do serviço
  const enviarDados = async () => {
    try {
      const emailsBarbeiros = responsaveis
        .map((nome) =>
          funcionarios.find((funcionario) => funcionario.nome === nome)?.email
        )
        .filter((email) => email) // Filtra emails válidos

      const servico = {
        preco: parseFloat(valorServico),
        descricao: descricaoServico,
        tipoServico: nomeServico,
        tempoEstimado: parseInt(duracaoServico),
        emailsBarbeiros: emailsBarbeiros,
        status: true,
      }

      console.log('Serviço:', servico)
      console.log('Barbeiros relacionados:', emailsBarbeiros)

      let resposta = await api.post('/servicos', servico, {
        headers: {
          Authorization: token,
        },
      })

      if (resposta.status === 201) {
        setListaServicosAtivos([...listaServicosAtivos, resposta.data])

        setNomeServico('')
        setDescricaoServico('')
        setValorServico('')
        setDuracaoServico('')
        setResponsaveis([])
        fecharDialogo()

        toast.success('Serviço cadastrado com sucesso!', { autoClose: 2000 })
      } else {
        console.error('Erro ao cadastrar serviço:', resposta)
        toast.error('Erro ao cadastrar serviço. Por favor, tente novamente.')
      }
    } catch (erro) {
      console.error('Erro ao salvar serviço:', erro)
      toast.error('Erro ao salvar serviço. Por favor, tente novamente.')
    }
  }

  // Função para buscar serviços ativos
  useEffect(() => {
    const buscarServicosAtivos = async () => {
      try {
        const resposta = await api.get('/servicos/list-by-status/active', {
          headers: {
            Authorization: token,
          },
        })

        setListaServicosAtivos(resposta.data)
      } catch (erro) {
        console.error('Erro ao buscar serviços ativos:', erro)
        toast.error('Erro ao buscar serviços ativos. Por favor, tente novamente.')
      } finally {
        setCarregando(false)
      }
    }

    buscarServicosAtivos()
  }, [token])

  // Função para buscar serviços inativos
  useEffect(() => {
    const buscarServicosInativos = async () => {
      try {
        const resposta = await api.get('/servicos/list-by-status/deactive', {
          headers: {
            Authorization: token,
          },
        })

        setListaServicosInativos(resposta.data)
      } catch (erro) {
        console.error('Erro ao buscar serviços inativos:', erro)
        toast.error('Erro ao buscar serviços inativos. Por favor, tente novamente.')
      } finally {
        setCarregando(false)
      }
    }

    buscarServicosInativos()
  }, [token])

  // Funções de controle de diálogos
  const abrirDialogo = () => {
    setServicoEditando(null)
    setAberto(true)
  }

  const fecharDialogo = () => {
    setAberto(false)
  }

  const abrirDuracao = () => {
    setDuracaoAberta(true)
  }

  const fecharDuracao = () => {
    setDuracaoAberta(false)
  }

  const selecionarDuracao = (evento) => {
    setDuracaoServico(evento.target.value)
    fecharDuracao()
  }

  const alterarResponsaveis = (evento) => {
    setResponsaveis(evento.target.value)
  }

  const [pageAtivos, setPageAtivos] = useState(1)
  const rowsPerPageAtivos = 5
  const servicosAtivosPaginados = listaServicosAtivos.slice((pageAtivos - 1) * rowsPerPageAtivos, pageAtivos * rowsPerPageAtivos)

  const handlePageChangeAtivos = (event, value) => {
    setPageAtivos(value)
  }

  const [pageInativos, setPageInativos] = useState(1)
  const rowsPerPageInativos = 5
  const servicosInativosPaginados = listaServicosInativos.slice((pageInativos - 1) * rowsPerPageInativos, pageInativos * rowsPerPageInativos)

  const handlePageChangeInativos = (event, value) => {
    setPageInativos(value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />

      <div className={styles.conteudo}>
        <HeaderUsuario title='Serviços' />

        <div className={styles.containerTodo}>
          {/* Barra de busca e botão de cadastro */}
          <div
            style={{
              display: 'flex',
              marginTop: 32,
              gap: 32,
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <TextField label="Buscar por serviço" style={{ width: '20vw' }} />
            <Button variant="contained" onClick={abrirDialogo}>
              Cadastrar Serviço
            </Button>
          </div>

          {/* Listagem de serviços ativos e inativos */}
          <div style={{
            marginBottom: 32,
            marginTop: 32,
          }}>
            <div className={styles.inativos}> SERVIÇOS ATIVOS</div>
            <BoxServicos
              services={listaServicosAtivos}
              funcionarios={funcionarios}
              handlePageChange={handlePageChangeAtivos}
              rowsPerPage={rowsPerPageAtivos}
              page={pageAtivos}
              slice={servicosAtivosPaginados}
            />
            <div className={styles.inativos}> SERVIÇOS INATIVOS</div>
            <BoxServicos
              services={listaServicosInativos}
              funcionarios={funcionarios}
              handlePageChange={handlePageChangeInativos}
              rowsPerPage={rowsPerPageInativos}
              page={pageInativos}
              slice={servicosInativosPaginados}
            />
          </div>
        </div>

      </div>

      {/*cadastro/edição de serviço */}
      <Dialog open={aberto} onClose={fecharDialogo}>
        <DialogTitle>{servicoEditando ? 'Editar Serviço' : 'Cadastrar Serviço'}</DialogTitle>
        <DialogContent>
          {/* Campos de texto para nome, descrição e valor do serviço */}
          <TextField
            autoFocus
            margin="dense"
            label="Nome do serviço"
            type="text"
            fullWidth
            value={nomeServico}
            onChange={(e) => setNomeServico(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descrição do serviço"
            type="text"
            fullWidth
            value={descricaoServico}
            onChange={(e) => setDescricaoServico(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Valor do serviço"
            type="number"
            fullWidth
            value={valorServico}
            onChange={(e) => setValorServico(e.target.value)}
          />

          {/* Botão para abrir o diálogo de seleção de duração */}
          <Button variant="outlined" onClick={abrirDuracao}>
            Selecionar Duração
          </Button>
          <TextField
            margin="dense"
            label="Duração"
            type="text"
            fullWidth
            value={formatarDuracao(duracaoServico)}
            disabled
          />

          {/* Campo para selecionar responsáveis */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Responsáveis</InputLabel>
            <Select
              multiple
              value={responsaveis}
              onChange={alterarResponsaveis}
              renderValue={(selected) => selected.join(', ')}
            >
              {funcionarios.map((funcionario) => (
                <MenuItem key={funcionario.nome} value={funcionario.nome}>
                  <Checkbox checked={responsaveis.indexOf(funcionario.nome) > -1} />
                  <ListItemText primary={funcionario.nome} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialogo}>Cancelar</Button>
          <Button onClick={enviarDados}>
            {servicoEditando ? 'Salvar Alterações' : 'Cadastrar'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={duracaoAberta} onClose={fecharDuracao}>
        <DialogTitle>Selecionar Duração</DialogTitle>
        <DialogContent>
          <Select
            value={duracaoServico}
            onChange={selecionarDuracao}
            fullWidth
          >
            {duracoes.map((duracao) => (
              <MenuItem key={duracao} value={duracao}>
                {formatarDuracao(duracao)}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDuracao}>Cancelar</Button>
        </DialogActions>
      </Dialog>


    </ThemeProvider>
  )
}

export default ServicoBarbeiro