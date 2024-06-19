import React, { useEffect, useRef, useState } from 'react';
import styles from './Dashboard.module.css';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import CardDashboardStatus from '../../components/CardDashboardStatus/CardDashboardStatus';
import LinhaReserva from '../../components/LinhaReserva/LinhaReserva';
import chartConfig, { createGraficoTotalClientes } from './Dashboard';
import CardAvalicoes from '../../components/CardAvaliacoes/CardAvaliacoes';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import api from '../../api.js';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Chart from 'chart.js/auto';

class Pilha {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return "A pilha está vazia";
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return "A pilha está vazia";
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    getItems() {
        return this.items;
    }
}

export function Dashboard() {
    const graficoTotalClientesRef = useRef(null);
    const totalClientesChartRef = useRef(null);
    const [reviewScore, setReviewScore] = useState(100);
    const [agendamentosAgendados, setAgendamentosAgendados] = useState([]);
    const [indicadorConfirmados, setIndicadorconfirmados] = useState();
    const [indicadorPendentes, setIndicadorPendentes] = useState();
    const [indicadorCancelados, setIndicadorCancelados] = useState();
    const [qtdDiasGrafico, setQtdDiasGrafico] = useState(7);
    const [labelsGrafico, setLabelsGrafico] = useState([]);
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [avaliacoesPilha, setAvaliacoesPilha] = useState(new Pilha());
    const [maiorValor, setMaiorValor] = useState();

    const token = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        fetchAgendamentosAgendados();
        fetchAvaliacoes();
    }, []);

    useEffect(() => {
        if (labelsGrafico.length && dadosGrafico.length) {
            const ctxTotalClientes = graficoTotalClientesRef.current.getContext('2d');

            if (totalClientesChartRef.current) {
                totalClientesChartRef.current.destroy();
            }

            // Create new chart instances
            totalClientesChartRef.current = createGraficoTotalClientes(ctxTotalClientes, dadosGrafico, labelsGrafico, maiorValor);
        }
    }, [labelsGrafico, dadosGrafico]);

    useEffect(() => {
        fetchAgendamentosDashboard();
    }, [qtdDiasGrafico]); 

    const fetchAgendamentosAgendados = async () => {
        try {
            console.log('Fetching agendamentos:');
            const response = await api.get(`agendamentos/list-all-by-status-all-barbearia/none`, {
                headers: {
                    Authorization: token,
                }
            });

            const agendados = response.data.filter(agendamento => agendamento.status === "Agendado");

            setAgendamentosAgendados(agendados);
        } catch (error) {
            console.error('Erro ao buscar os agendamentos:', error);
        }
    };

    var util = 0;
    const fetchAgendamentosDashboard = async () => {
        try {
            console.log('Fetching dados para dashboard:');

            const dataAtual = new Date();
            const dataInicial = dataAtual.toISOString().split('T')[0];

            const dataFinal = new Date(dataAtual);
            dataFinal.setDate(dataFinal.getDate() + 7);
            const dataFinalFormatada = dataFinal.toISOString().split('T')[0];

            const response = await api.get(`agendamentos/dashboard/metricas`, {
                headers: {
                    Authorization: token,
                },
                params: {
                    dateInicial: dataInicial,
                    dateFinal: dataFinalFormatada,
                    qtdDiasParaGrafico: qtdDiasGrafico
                }
            });

            // Transformando datasGrafico de yyyy-mm-dd para mm-dd
            const datasGraficoFormatadas = response.data.datasGrafico.map(data => {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}`;
            });

            if (util === 0) {
                setIndicadorCancelados(response.data.cancelados);
                setIndicadorPendentes(response.data.pendentes);
                setIndicadorconfirmados(response.data.confirmados);
                setLabelsGrafico(datasGraficoFormatadas);
                setDadosGrafico(response.data.valoresGrafico);
                const vetorPrecosServicos = response.data.valoresGrafico;
                const maiorValor = vetorPrecosServicos.reduce((max, valor) => Math.max(max, valor), vetorPrecosServicos[0]);
                setMaiorValor(maiorValor);
            } else {
                setLabelsGrafico(datasGraficoFormatadas);
                setDadosGrafico(response.data.valoresGrafico);
                const vetorPrecosServicos = response.data.valoresGrafico;
                const maiorValor = vetorPrecosServicos.reduce((max, valor) => Math.max(max, valor), vetorPrecosServicos[0]);
                setMaiorValor(maiorValor);
            }
            console.log(response.data);
            util++;
        } catch (error) {
            console.error('Erro ao buscar os dados da dashboard:', error);
        }
    };

    const fetchAvaliacoes = async () => {
        try {
            console.log('Fetching avaliações:');
            const response = await api.get(`agendamentos/dashboard/ultimas-avaliacoes/50`, {
                headers: {
                    Authorization: token,
                }
            });

            // Utilizando as avaliações como pilha
            const avaliacoesData = response.data;
            avaliacoesData.forEach(avaliacao => avaliacoesPilha.push(avaliacao));
            console.log(avaliacoesPilha.getItems());
        } catch (error) {
            console.error('Erro ao buscar as avaliações:', error);
        }
    };

    const handleSelectChange = (event) => {
        const value = parseInt(event.target.value, 10);
        console.log('Selected value:', value);
        setQtdDiasGrafico(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <HeaderUsuario />
            <NavbarBarbeiro />
            <div className={styles.dashboardToda}>
                <div className={styles.containerDashboard}>
                    <div className={styles.cardDashboards}>
                        <CardDashboardStatus iconStyle={{ backgroundColor: '#56B064' }} spanValue={"Confirmado"} valor={indicadorConfirmados} />
                        <CardDashboardStatus iconStyle={{ backgroundColor: '#E3A74F' }} spanValue={"Pendente"} valor={indicadorPendentes} />
                        <CardDashboardStatus iconStyle={{ backgroundColor: '#CC2828' }} spanValue={"Cancelado"} valor={indicadorCancelados} />
                    </div>
                    <div className={styles.reserva}>
                        <div className={styles.conteudoReserva}>
                            <div className={styles.containerReserva}>
                                <div className={styles.spanReservas}>
                                    <span>Reservas</span>
                                </div>
                                <div className={styles.linhasReservas}>
                                    {Array.isArray(agendamentosAgendados) &&
                                        agendamentosAgendados.map((agendamento, index) => {
                                            const dataHora = parseISO(agendamento.dataHora);
                                            const dataFormatada = format(dataHora, 'dd/MM/yyyy', { locale: ptBR });
                                            const horaFormatada = format(dataHora, 'HH:mm');

                                            return (
                                                <LinhaReserva
                                                    key={index}
                                                    nomeCliente={agendamento.nomeCliente}
                                                    nomeServico={agendamento.tipoServico}
                                                    data={dataFormatada}
                                                    hora={horaFormatada}
                                                    nomeFuncionario={agendamento.nomeBarbeiro}
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.indicadores}>
                        <div className={styles.graficos}>
                            <div className={styles.graficoLinhaConteudo}>
                                <div className={styles.titulosGraficoLinha}>
                                    <span>Total de visitantes</span>
                                    <select value={qtdDiasGrafico} onChange={handleSelectChange} className={styles.selectBox}>
                                        <option value={7}>Última semana</option>
                                        <option value={15}>Últimos 15 dias</option>
                                        <option value={30}>Último mês</option>
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
    );
}

export default Dashboard;
