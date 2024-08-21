import React, { useEffect, useState } from "react"
import { CircularProgress, Pagination, Stack, TablePagination, ThemeProvider, Typography } from '@mui/material'
import { theme } from '../../theme'
import { Sidebar } from '../../components/Sidebar'
import { HeaderUsuario } from '../../components/Header'
import api from '../../api'

export function AgendamentoUsuario() {
    const [agendamentos, setAgendamentos] = useState([])
    const [loading, setLoading] = useState(false)
    const token = JSON.parse(sessionStorage.getItem('user'))

    const fetchMeusAgendamentos = async () => {
        try {

            const responsePendente = await api.get('agendamentos/list-all-by-status/Pendente', {
                headers: {
                    Authorization: token,
                },
            })

            const responseAgendado = await api.get('agendamentos/list-all-by-status/Agendado', {
                headers: {
                    Authorization: token,
                },
            })

            setAgendamentos([...responsePendente.data, ...responseAgendado.data])
        } catch (error) {
            if (error.response) {
                console.error('Erro ao buscar os agendamentos!')
                console.error('Error response:', error.response.data)
            } else {
                console.error('Erro ao tentar se conectar ao servidor!')
                console.error('Error:', error.message)
            }
        } finally {
            setLoading(true)
        }
    }

    useEffect(() => {
        fetchMeusAgendamentos()
    }, [])

    const [page, setPage] = useState(1)
    const rowsPerPage = 5
    const agendamentosPaginados = agendamentos.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    const handlePageChange = (event, value) => {
        setPage(value)
    }

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
                        height: '40vh',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant='h7' style={{ color: '#082031', marginLeft: 16, marginTop: 16 }}>Próximo agendamento</Typography>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 16,
                            height: '100%',
                            width: '100%',
                            justifyContent: !loading || agendamentosPaginados <= 0 ? 'center' : 'flex-start'
                        }}>
                            {!loading ? <CircularProgress style={{ alignSelf: 'center' }} /> : (
                                agendamentosPaginados.length > 0 ? (
                                    agendamentosPaginados.map((agendamento, index) => (
                                        <div style={{
                                            marginTop: 16,
                                            marginLeft: 16,
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                backgroundColor: '#CBD5E0',
                                                borderTopLeftRadius: 12,
                                                borderBottomLeftRadius: 12,
                                                height: '100%',
                                                alignItems: 'center',
                                                minWidth: 180
                                            }}>
                                                <img src={agendamento.fotoNegocio} alt='Imagem barbearia' style={{ width: 100, height: 100, borderRadius: 50 }} />

                                                <Typography variant='h7' style={{ color: '#082031', textWrap: 'wrap' }}>{agendamento.nomeNegocio}</Typography>


                                                <Typography variant='body1' style={{ color: '#082031', textAlign: 'center', marginTop: 8 }}>{agendamento.enderecoBarbearia.logradouro}, {agendamento.enderecoBarbearia.numero} - {agendamento.enderecoBarbearia.cidade}</Typography>
                                            </div>

                                            <div style={{
                                                border: '1px solid #CBD5E0',
                                                borderTopRightRadius: 12,
                                                borderBottomRightRadius: 12,
                                                height: '100%',
                                                width: 200,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-around',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{
                                                    backgroundColor: '#E3A74F',
                                                    width: '90%',
                                                    height: '20%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 12,
                                                }}>
                                                    <Typography variant='h7' style={{ color: '#082031' }}>{agendamento.status}</Typography>
                                                </div>

                                                <Typography variant='body1' style={{ color: '#082031' }}>
                                                    {new Date(agendamento.dataHora).toLocaleDateString('pt-BR')} às {new Date(agendamento.dataHora).toLocaleTimeString('pt-BR')}
                                                </Typography>

                                                <Typography variant='body1' style={{ color: '#082031' }}>
                                                    Serviço: {agendamento.tipoServico}
                                                </Typography>

                                                <Typography variant='body1' style={{ color: '#082031' }}>
                                                    Valor pago: R${agendamento.valorServico.toFixed(2).replace('.', ',')}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <Typography variant='h7' style={{ color: '#082031', alignSelf: 'center', display: 'flex' }}>Não há agendamentos pendentes.</Typography>
                                )
                            )}
                        </div>
                        <Stack spacing={2} style={{ marginTop: 16, alignItems: 'center' }}>
                            <Pagination
                                count={Math.ceil(agendamentos.length / rowsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Stack>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '45vh',
                        justifyContent: 'space-between',
                    }}>
                        <Typography variant='h7' style={{ color: '#082031', marginLeft: 16, marginTop: 16 }}>Histórico</Typography>

                        {/* <BoxBarbeariaHistorico /> */}

                        <Stack spacing={2} style={{ marginTop: 16, alignItems: 'center' }}>
                            <Pagination
                                count={Math.ceil(agendamentos.length / rowsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </ThemeProvider >
    )
}
export default AgendamentoUsuario
