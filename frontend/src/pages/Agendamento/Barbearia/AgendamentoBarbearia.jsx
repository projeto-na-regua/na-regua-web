import React, { useEffect, useState } from 'react'
import HeaderUsuario from '../../../components/HeaderUsuario/HeaderUsuario'
import NavbarBarbeiro from '../../../components/NavbarBarbeiro/NavbarBarbeiro'
import { ThemeProvider, Typography } from '@mui/material'
import { CardHorario } from '../../../components/CardHorario/CardHorario'
import api from '../../../api'
import { VisualizarAtendimento } from '../../../components/VisualizarAtendimento/VisualizarAtendimento'
import { theme } from '../../../theme'

function AgendamentoBarbearia() {
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [modal, setModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [compromissosPendentes, setCompromissosPendentes] = useState([])
  const [compromissosAgendados, setCompromissosAgendados] = useState([])

  const handleModal = (compromisso) => {
    setModal(compromisso)
    console.log(compromisso)
  }


  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const responsePendentes = await api.get(`/agendamentos/list-all-by-status/Pendente`, {
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
        setCompromissosAgendados(responseAgendados.data)
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

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundColor: '#F4F3EE',
      }}>
        <HeaderUsuario />

        <NavbarBarbeiro />

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          height: '80vh',
          width: '100%',
          marginTop: 32,
          justifyContent: 'space-between',
          gap: 32
        }}>
          <div style={{
            padding: 32,
          }}>
            <div style={{
            }}>
              <Typography variant='h5' style={{ marginLeft: 32, marginBottom: 32, fontWeight: 'bold' }}>
                Pendentes
              </Typography>

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 32,
                maxWidth: 850,
                overflowX: 'scroll'
              }}>
                {compromissosPendentes.length === 0 ? (
                  <Typography variant='h6' style={{ marginLeft: 32 }}>
                    Nenhum agendamento pendente
                  </Typography>
                ) : (
                  compromissosPendentes.map((compromisso, index) => (
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
                )}
              </div>
            </div>

            <div style={{
              marginTop: 32,
            }}>
              <Typography variant='h5' style={{ marginLeft: 32, marginBottom: 32, fontWeight: 'bold' }}>
                Agendados
              </Typography>

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 32,
                maxWidth: 850,
                overflowX: 'scroll'
              }}>
                {compromissosAgendados.length === 0 ? (
                  <Typography variant='h6' style={{ marginLeft: 32 }}>
                    Nenhum agendamento
                  </Typography>
                ) : (
                  compromissosAgendados.map((compromisso, index) => (
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
                )}
              </div>
            </div>
          </div>

          <div style={{
            padding: 32,
          }}>
            {open && (
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
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AgendamentoBarbearia
