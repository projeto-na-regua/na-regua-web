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

const durations = Array.from({ length: 11 }, (_, i) => 30 + i * 15)

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours} h ${mins > 0 ? `${mins} m` : ''}`
  }
  return `${mins} m`
}

export function ServicoBarbeiro() {
  const [open, setOpen] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [durationOpen, setDurationOpen] = useState(false)
  const [serviceDuration, setServiceDuration] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [serviceDescription, setServiceDescription] = useState('')
  const [serviceValue, setServiceValue] = useState('')
  const [responsaveis, setResponsaveis] = useState([])
  const [editingService, setEditingService] = useState(null)
  const [listaServicosAtivos, setListaServicosAtivos] = useState([])
  const [listaServicosInativos, setListaServicosInativos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [funcionarios, setFuncionarios] = useState([])
  const [carregandoFuncionarios, setCarregandoFuncionarios] = useState(true)

  const pegarFuncionario = async () => {
    try {
      const response = await api.get('/funcionarios', {
        headers: {
          Authorization: token,
        },
      })

      // Mapeia a resposta para retornar apenas nome e email
      return response.data.map((funcionario) => ({
        nome: funcionario.nome,
        email: funcionario.email,
      }))
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error)
      return [] // Retorna um array vazio em caso de erro
    }
  }

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const funcionariosData = await pegarFuncionario()
        setFuncionarios(funcionariosData)
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error)
      } finally {
        setCarregandoFuncionarios(false)
      }
    }

    fetchFuncionarios()
  }, [])

  const mandarDados = async () => {
    try {
      const barbeirosEmails = responsaveis.map((nome) =>
        funcionarios.find((funcionario) => funcionario.nome === nome)?.email
      ).filter(email => email) // Filtra emails válidos

      const servico = {
        preco: parseFloat(serviceValue), // Converte para float
        descricao: serviceDescription,
        tipoServico: serviceName,
        tempoEstimado: parseInt(serviceDuration), // Converte para integer
        barbeirosEmails: barbeirosEmails, // Inclui a lista de emails dos barbeiros selecionados
        status: true, // Definindo o status como true por padrão ao cadastrar
      }

      // Log dos dados do serviço e emails dos barbeiros
      console.log('Serviço:', servico)
      console.log('Barbeiros relacionados:', barbeirosEmails)

      let response = await api.post('/servicos', servico, {
        headers: {
          Authorization: token,
        },
      })

      if (response.status === 201) {
        setListaServicosAtivos([...listaServicosAtivos, response.data])

        setServiceName('')
        setServiceDescription('')
        setServiceValue('')
        setServiceDuration('')
        setResponsaveis([])
        handleClose()

        toast.success('Serviço cadastrado com sucesso!', { autoClose: 2000 })
      } else {
        console.error('Erro ao cadastrar serviço:', response)
        toast.error('Erro ao cadastrar serviço. Por favor, tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error)
      toast.error('Erro ao salvar serviço. Por favor, tente novamente.')
    }
  }

  useEffect(() => {
    const fetchServicosAtivos = async () => {
      try {
        const response = await api.get('/servicos/list-by-status/active', {
          headers: {
            Authorization: token,
          },
        })

        // Definindo apenas os serviços ativos com status 1
        setListaServicosAtivos(response.data)
      } catch (error) {
        console.error('Erro ao buscar serviços ativos:', error)
        toast.error('Erro ao buscar serviços ativos. Por favor, tente novamente.')
      } finally {
        setCarregando(false)
      }
    }

    const fetchServicosInativos = async () => {
      try {
        const response = await api.get('/servicos/list-by-status/deactive', {
          headers: {
            Authorization: token,
          },
        })

        // Definindo apenas os serviços inativos com status 0
        setListaServicosInativos(response.data)
      } catch (error) {
        console.error('Erro ao buscar serviços inativos:', error)
        toast.error('Erro ao buscar serviços inativos. Por favor, tente novamente.')
      } finally {
        setCarregando(false)
      }
    }


    fetchServicosInativos()
    fetchServicosAtivos()
  }, [token])

  const handleOpen = () => {
    setEditingService(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDurationOpen = () => {
    setDurationOpen(true)
  }

  const handleDurationClose = () => {
    setDurationOpen(false)
  }

  const handleDurationSelect = (event) => {
    setServiceDuration(event.target.value)
    handleDurationClose()
  }

  const handleResponsaveisChange = (event) => {
    setResponsaveis(event.target.value)
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
      <div>
        <Sidebar />

        <div className={styles.conteudo}>
          <HeaderUsuario title='Serviços' />
          <div className={styles.containerTodo}>
            <div
              style={{
                display: 'flex',
                gap: 32,
                justifyContent: 'space-between',
              }}
            >
              <TextField
                label="Buscar por serviço"
                style={{ width: '20vw' }}
              />
              <Button variant="contained" onClick={handleOpen}>
                Cadastrar Serviço
              </Button>
            </div>
            <div style={{
              marginBottom: 32,
            }}>
              <BoxServicos
                services={listaServicosAtivos}
                funcionarios={funcionarios}
                slice={servicosAtivosPaginados}
                page={pageAtivos}
                rowsPerPage={rowsPerPageAtivos}
                handlePageChange={handlePageChangeAtivos}
              />
              <div className={styles.inativos}> SERVIÇOS INATIVOS</div>
              <BoxServicos
                services={listaServicosInativos}
                funcionarios={funcionarios}
                slice={servicosInativosPaginados}
                page={pageInativos}
                rowsPerPage={rowsPerPageInativos}
                handlePageChange={handlePageChangeInativos}
              />
            </div>
          </div>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editingService ? 'Editar Serviço' : 'Cadastrar Serviço'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nome do serviço"
              type="text"
              fullWidth
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Descrição do serviço"
              type="text"
              fullWidth
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Valor do serviço"
              type="number"
              fullWidth
              value={serviceValue}
              onChange={(e) => setServiceValue(e.target.value)}
            />
            <Button variant="outlined" onClick={handleDurationOpen}>
              Selecionar Duração
            </Button>
            <TextField
              margin="dense"
              label="Duração"
              type="text"
              fullWidth
              value={formatDuration(serviceDuration)}
              disabled
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Responsáveis</InputLabel>
              <Select
                multiple
                value={responsaveis}
                onChange={handleResponsaveisChange}
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
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={mandarDados}>{editingService ? 'Salvar' : 'Cadastrar'}</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={durationOpen} onClose={handleDurationClose}>
          <DialogTitle>Selecionar Duração</DialogTitle>
          <DialogContent>
            <Select
              value={serviceDuration}
              onChange={handleDurationSelect}
              fullWidth
            >
              {durations.map((duration, index) => (
                <MenuItem key={index} value={duration}>
                  {formatDuration(duration)}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDurationClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}

export default ServicoBarbeiro;

