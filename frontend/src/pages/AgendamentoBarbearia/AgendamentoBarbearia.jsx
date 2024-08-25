import React, { useEffect, useState } from 'react'
import { CircularProgress, Pagination, Stack, ThemeProvider, Typography } from '@mui/material'
import { CardHorario } from '../../components/CardHorario/CardHorario'
import api from '../../api'
import { VisualizarAtendimento } from '../../components/VisualizarAtendimento/VisualizarAtendimento'
import { theme } from '../../theme'
import { Sidebar } from '../../components/Sidebar'
import { HeaderUsuario } from '../../components/Header'
import { ModalPersonalizado } from '../../components/ModalPersonalizado/ModalPersonalizado'

function AgendamentoBarbearia() {
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [modal, setModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [compromissosPendentes, setCompromissosPendentes] = useState([])
  const [compromissosAgendados, setCompromissosAgendados] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAgendados, setLoadingAgendados] = useState(false)

  const handleModal = (compromisso) => {
    setModal(compromisso)
    console.log(compromisso)
  }


  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const responsePendentes = await api.get(`/agendamentos/list-all-by-status/none`, {
          headers: {
            Authorization: token
          }
        })

        const responseAgendados = await api.get(`/agendamentos/list-all-by-status/Agendado`, {
          headers: {
            Authorization: token
          }
        })

        setCompromissosPendentes(responsePendentes.data)
        setLoading(true)
        setCompromissosAgendados(responseAgendados.data)
        setLoadingAgendados(true)
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error)
      }
    }

    fetchAgendamentos()
  }, [token, compromissosAgendados, compromissosPendentes])


  const confirmarAgendamento = async (id, statusAtt) => {
    try {
      const response = await api.put(`/agendamentos/${id}/${statusAtt}`, null, {
        headers: {
          Authorization: token
        }
      })

      console.log(response.data)
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error)
    }
  }

  const enviarValorDoServico = async (valor) => {
    try {
      await api.post(`/financas/lancar-valor`,
        { valor }
        , {
          headers: {
            Authorization: token
          }
        })

      console.log('Valor do serviço enviado com sucesso!', valor)
    } catch (error) {
      console.error('Erro ao enviar valor do serviço:', error)
    }
  }



  const formatarDataHora = (dataHora) => {
    const data = new Date(dataHora)
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const hora = data.getHours()
    const minutos = data.getMinutes()
    return `${dia}/${mes}/${ano} às ${hora}:${minutos < 10 ? '0' + minutos : minutos}`
  }

  const [page, setPage] = useState(1)
  const rowsPerPage = 3
  const compromissosPendentesPaginados = compromissosPendentes.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const compromissosAgendadosPaginados = compromissosAgendados.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const [pageAgendados, setPageAgendados] = useState(1)


  return (
    <ThemeProvider theme={theme}>
      <div>
        <Sidebar />

        <div style={{
          width: '85vw',
          marginLeft: '15vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <HeaderUsuario title='Agendamentos' />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Typography variant='h7' style={{ color: '#082031', marginLeft: 16, marginTop: 16 }}>Pendente</Typography>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              height: '100%',
              width: '100%',
              justifyContent: !loading || compromissosPendentesPaginados <= 0 ? 'center' : 'flex-start'
            }}>
              {!loading ? <CircularProgress style={{ alignSelf: 'center' }} /> : (
                compromissosPendentesPaginados.length > 0 ? (
                  compromissosPendentesPaginados.map((compromisso, index) => (
                    <CardHorario
                      key={index}
                      nomeCliente={compromisso.nomeCliente}
                      horario={formatarDataHora(compromisso.dataHora)}
                      duracao={compromisso.tempoEstimado}
                      servico={compromisso.tipoServico}
                      onClick={() => {
                        handleModal(compromisso)
                        setOpen(true)
                      }}
                    />
                  ))
                ) : (
                  <Typography variant='h7' style={{ color: '#082031', alignSelf: 'center', display: 'flex' }}>Não há agendamentos pendentes.</Typography>
                )
              )}
            </div>
            <Stack spacing={2} style={{ marginTop: 16, alignItems: 'center' }}>
              <Pagination
                count={Math.ceil(compromissosPendentes.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '40vh',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h7' style={{ color: '#082031', marginLeft: 16, marginTop: 16 }}>Agendados</Typography>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              height: '100%',
              width: '100%',
              justifyContent: !loading || compromissosAgendadosPaginados <= 0 ? 'center' : 'flex-start'
            }}>
              {!loadingAgendados ? <CircularProgress style={{ alignSelf: 'center' }} /> : (
                compromissosAgendadosPaginados.length > 0 ? (
                  compromissosAgendadosPaginados.map((compromisso, index) => (
                    <CardHorario
                      key={index}
                      nomeCliente={compromisso.nomeCliente}
                      horario={formatarDataHora(compromisso.dataHora)}
                      duracao={compromisso.tempoEstimado}
                      servico={compromisso.tipoServico}
                      onClick={() => {
                        handleModal(compromisso)
                        setOpen(true)
                      }}
                    />
                  ))
                ) : (
                  <Typography variant='h7' style={{ color: '#082031', alignSelf: 'center', display: 'flex' }}>Não há agendamentos confirmados.</Typography>
                )
              )}
            </div>
            <Stack spacing={2} style={{ marginTop: 16, alignItems: 'center' }}>
              <Pagination
                count={Math.ceil(compromissosAgendados.length / rowsPerPage)}
                page={pageAgendados}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>

          {open && (
            <ModalPersonalizado
              open={open}
              setOpen={() => setOpen}
              handleClose={() => setOpen(false)}
            >
              <VisualizarAtendimento
                nomeCliente={modal.nomeCliente}
                data={formatarDataHora(modal.dataHora)}
                horario={modal.horario}
                servico={modal.tipoServico}
                status={modal.status}
                onClickConfirm={() => {
                  if (modal.status === 'Pendente') {
                    confirmarAgendamento(modal.id, 'Agendado')
                  }

                  if (modal.status === 'Agendado') {
                    confirmarAgendamento(modal.id, 'Concluido')
                    enviarValorDoServico(modal.valorServico)
                    console.log(modal.valorServico)
                  }

                  setOpen(false)
                }}
                onClickCancel={() => {
                  confirmarAgendamento(modal.id, 'cancelado')
                  setOpen(false)
                }}
                titleButton={modal.status === 'Pendente' ? 'Confirmar' : 'Concluir'}
              />
            </ModalPersonalizado>
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AgendamentoBarbearia
