import React, { useEffect, useRef, useState } from 'react'
import styles from './Dashboard.module.css'
import { theme } from '../../theme'
import { ThemeProvider } from '@emotion/react'
import CardDashboardStatus from '../../components/CardDashboardStatus/CardDashboardStatus'
import LinhaReserva from '../../components/LinhaReserva/LinhaReserva'
import chartConfig, { createGraficoTotalClientes } from './Dashboard'
import CardAvalicoes from '../../components/CardAvaliacoes/CardAvaliacoes'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import api from '../../api.js'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Chart from 'chart.js/auto'
import { Sidebar } from '../../components/Sidebar.jsx'
import { HeaderUsuario } from '../../components/Header.jsx'
import { Pagination, Stack, Typography } from '@mui/material'

class Pilha {
    constructor() {
        this.items = []
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        if (this.isEmpty()) {
            return "A pilha está vazia"
        }
        return this.items.pop()
    }

    peek() {
        if (this.isEmpty()) {
            return "A pilha está vazia"
        }
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }

    getItems() {
        return this.items
    }
}

export function Dashboard() {
    const graficoTotalClientesRef = useRef(null)
    const totalClientesChartRef = useRef(null)
    const [reviewScore, setReviewScore] = useState(100)
    const [agendamentosAgendados, setAgendamentosAgendados] = useState([])
    const [indicadorConfirmados, setIndicadorconfirmados] = useState()
    const [indicadorPendentes, setIndicadorPendentes] = useState()
    const [indicadorCancelados, setIndicadorCancelados] = useState()
    const [qtdDiasGrafico, setQtdDiasGrafico] = useState(7)
    const [labelsGrafico, setLabelsGrafico] = useState([])
    const [dadosGrafico, setDadosGrafico] = useState([])
    const [avaliacoesPilha, setAvaliacoesPilha] = useState(new Pilha())
    const [maiorValor, setMaiorValor] = useState()
    const iconeCancelado = <svg width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33 33L18 18M18 18L3 3M18 18L33 3M18 18L3 33" stroke="#591919" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    const iconeConfirmado = <svg width="32" height="22" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18.5278L15.3077 30.75L43 3.25" stroke="#1B6727" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    const iconePendente = <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 52.5C42.4264 52.5 52.5 42.4264 52.5 30C52.5 17.5736 42.4264 7.5 30 7.5C17.5736 7.5 7.5 17.5736 7.5 30C7.5 42.4264 17.5736 52.5 30 52.5Z" stroke="#704300" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M30 15V30H15" stroke="#704300" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>


    const token = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        fetchAgendamentosAgendados()
        fetchAvaliacoes()
    }, [])

    useEffect(() => {
        if (labelsGrafico.length && dadosGrafico.length) {
            const ctxTotalClientes = graficoTotalClientesRef.current.getContext('2d')

            if (totalClientesChartRef.current) {
                totalClientesChartRef.current.destroy()
            }

            // Create new chart instances
            totalClientesChartRef.current = createGraficoTotalClientes(ctxTotalClientes, dadosGrafico, labelsGrafico, maiorValor)
        }
    }, [labelsGrafico, dadosGrafico])

    useEffect(() => {
        fetchAgendamentosDashboard()
    }, [qtdDiasGrafico])

    const fetchAgendamentosAgendados = async () => {
        try {
            console.log('Fetching agendamentos:')
            const response = await api.get(`agendamentos/list-all-by-status-all-barbearia/none`, {
                headers: {
                    Authorization: token,
                }
            })

            const agendados = response.data.filter(agendamento => agendamento.status === "Agendado")

            setAgendamentosAgendados(agendados)
        } catch (error) {
            console.error('Erro ao buscar os agendamentos:', error)
        }
    }

    var util = 0
    const fetchAgendamentosDashboard = async () => {
        try {
            console.log('Fetching dados para dashboard:')

            const dataAtual = new Date()
            const dataInicial = dataAtual.toISOString().split('T')[0]

            const dataFinal = new Date(dataAtual)
            dataFinal.setDate(dataFinal.getDate() + 7)
            const dataFinalFormatada = dataFinal.toISOString().split('T')[0]

            const response = await api.get(`agendamentos/dashboard/metricas`, {
                headers: {
                    Authorization: token,
                },
                params: {
                    dateInicial: dataInicial,
                    dateFinal: dataFinalFormatada,
                    qtdDiasParaGrafico: qtdDiasGrafico
                }
            })

            // Transformando datasGrafico de yyyy-mm-dd para mm-dd
            const datasGraficoFormatadas = response.data.datasGrafico.map(data => {
                const [ano, mes, dia] = data.split('-')
                return `${dia}/${mes}`
            })

            if (util === 0) {
                setIndicadorCancelados(response.data.cancelados)
                setIndicadorPendentes(response.data.pendentes)
                setIndicadorconfirmados(response.data.confirmados)
                setLabelsGrafico(datasGraficoFormatadas)
                setDadosGrafico(response.data.valoresGrafico)
                const vetorPrecosServicos = response.data.valoresGrafico
                const maiorValor = vetorPrecosServicos.reduce((max, valor) => Math.max(max, valor), vetorPrecosServicos[0])
                setMaiorValor(maiorValor)
            } else {
                setLabelsGrafico(datasGraficoFormatadas)
                setDadosGrafico(response.data.valoresGrafico)
                const vetorPrecosServicos = response.data.valoresGrafico
                const maiorValor = vetorPrecosServicos.reduce((max, valor) => Math.max(max, valor), vetorPrecosServicos[0])
                setMaiorValor(maiorValor)
            }
            console.log(response.data)
            util++
        } catch (error) {
            console.error('Erro ao buscar os dados da dashboard:', error)
        }
    }

    const fetchAvaliacoes = async () => {
        try {
            console.log('Fetching avaliações:')
            const response = await api.get(`agendamentos/dashboard/ultimas-avaliacoes/50`, {
                headers: {
                    Authorization: token,
                }
            })

            // Utilizando as avaliações como pilha
            const avaliacoesData = response.data
            avaliacoesData.forEach(avaliacao => avaliacoesPilha.push(avaliacao))
            console.log(avaliacoesPilha.getItems())
        } catch (error) {
            console.error('Erro ao buscar as avaliações:', error)
        }
    }

    const handleSelectChange = (event) => {
        const value = parseInt(event.target.value, 10)
        console.log('Selected value:', value)
        setQtdDiasGrafico(value)
    }

    const [page, setPage] = useState(1)
    const rowsPerPage = 3
    const agendamentosPaginados = agendamentosAgendados.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    return (
        <ThemeProvider theme={theme}>
            <Sidebar />

            <div className={styles.dashboardToda}>
                <HeaderUsuario title='Dashboard' />

                <div className={styles.containerDashboard}>
                    <div className={styles.cardDashboards}>
                        <CardDashboardStatus iconStyle={{ backgroundColor: '#56B064' }} icon={iconeConfirmado} spanValue={"Confirmado"} valor={indicadorConfirmados} />
                        <CardDashboardStatus iconStyle={{ backgroundColor: '#E3A74F' }} icon={iconePendente} spanValue={"Pendente"} valor={indicadorPendentes} />
                        <CardDashboardStatus iconStyle={{ backgroundColor: '#CC2828' }} icon={iconeCancelado} spanValue={"Cancelado"} valor={indicadorCancelados} />
                    </div>
                    <div className={styles.reserva}>
                        <div className={styles.conteudoReserva}>
                            <div className={styles.containerReserva}>
                                <Typography variant="h7" style={{ marginBottom: 16 }}>Reservas</Typography>
                                <div className={styles.linhasReservas}>
                                    {Array.isArray(agendamentosAgendados) &&
                                        agendamentosPaginados.map((agendamento, index) => {
                                            const dataHora = parseISO(agendamento.dataHora)
                                            const dataFormatada = format(dataHora, 'dd/MM/yyyy', { locale: ptBR })
                                            const horaFormatada = format(dataHora, 'HH:mm')

                                            return (
                                                <LinhaReserva
                                                    key={index}
                                                    nomeCliente={agendamento.nomeCliente}
                                                    nomeServico={agendamento.tipoServico}
                                                    data={dataFormatada}
                                                    hora={horaFormatada}
                                                    nomeFuncionario={agendamento.nomeBarbeiro}
                                                />
                                            )
                                        })}
                                </div>
                                <Stack spacing={2} style={{ alignItems: 'center' }}>
                                    <Pagination
                                        count={Math.ceil(agendamentosAgendados.length / rowsPerPage)}
                                        page={page}
                                        onChange={handlePageChange}
                                        color="primary"
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>

                    <div className={styles.indicadores}>
                        <div className={styles.graficos}>
                            <div className={styles.graficoLinhaConteudo}>
                                <div className={styles.titulosGraficoLinha}>
                                    <Typography variant="h7">Total de clientes</Typography>
                                    <select value={qtdDiasGrafico} onChange={handleSelectChange} className={styles.selectBox}>
                                        <option value={7}>
                                            <Typography variant="h7">Últimos 7 dias</Typography>
                                        </option>
                                        <option value={15}>
                                            <Typography variant="h7">Últimas 2 semanas</Typography>
                                        </option>
                                        <option value={30}>
                                            <Typography variant="h7">Último mês</Typography>
                                        </option>
                                    </select>
                                </div>
                                <div className={styles.graficoLinha}>
                                    <canvas ref={graficoTotalClientesRef} id="graficoTotalClientes" />
                                </div>
                            </div>

                            {/* <div className={styles.contentamentoConteudo}>
                            <div className={styles.tituloContentamento}>
                                <span>% de contentamento dos usuários</span>
                            </div>
                            <div className={styles.porcentagemContentamento}>
                                <div className={styles.progressBar}>
                                    <ProgressBar score={reviewScore} />
                                </div>
                            </div>
                        </div>*/}
                        </div>

                        <div className={styles.melhoresAvaliacoes}>
                            <div className={styles.containerAvaliacoes}>
                                <div className={styles.conteudoAvaliacoes}>
                                    <div className={styles.tituloAvaliacoes}>
                                        <span>Últimas avaliações</span>
                                    </div>
                                    <div className={styles.linhasAvaliacoes}>
                                        {avaliacoesPilha.getItems().map((avaliacao, index) => (
                                            <CardAvalicoes
                                                key={index}
                                                nome={avaliacao.nomeCliente}
                                                data={format(new Date(avaliacao.data), 'dd/MM/yyyy')}
                                                nota={parseFloat(avaliacao.resultadoAvaliacao).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Dashboard
