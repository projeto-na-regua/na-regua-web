import React, { useEffect, useRef, useState } from 'react'; // Importe useState do React
import styles from './Dashboard.module.css';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import CardDashboardStatus from '../../components/CardDashboardStatus/CardDashboardStatus';
import LinhaReserva from '../../components/LinhaReserva/LinhaReserva';
import chartConfig from './Dashboard';
import CardAvalicoes from '../../components/CardAvaliacoes/CardAvaliacoes';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

export function Dashboard() {
    const graficoTotalClientesRef = useRef(null);
    const totalClientesChartRef = useRef(null);
    const [reviewScore, setReviewScore] = useState(100);

    useEffect(() => {
        const ctxTotalClientes = graficoTotalClientesRef.current.getContext('2d');

        // Destroy previous chart instances if they exist
        if (totalClientesChartRef.current) {
            totalClientesChartRef.current.destroy();
        }

        // Create new chart instances
        totalClientesChartRef.current = chartConfig.createGraficoTotalClientes(ctxTotalClientes);

        // Cleanup function to destroy charts on component unmount
        return () => {
            if (totalClientesChartRef.current) {
                totalClientesChartRef.current.destroy();
            }
        };
    }, []); // Run effect only once after the initial render

    return (
        <ThemeProvider theme={theme}>
            <HeaderUsuario />
            <NavbarBarbeiro />
            <div className={styles.containerDashboard}>
                <div className={styles.cardDashboards}>
                    <CardDashboardStatus iconStyle={{backgroundColor: '#56B064'}} spanValue={"Confirmado"}/>
                    <CardDashboardStatus iconStyle={{backgroundColor: '#E3A74F'}} spanValue={"Pendente"}/>
                    <CardDashboardStatus iconStyle={{backgroundColor: '#CC2828'}} spanValue={"Cancelado"}/>
                </div>
                <div className={styles.reserva}>
                    <div className={styles.conteudoReserva}>
                        <div className={styles.containerReserva}>
                            <div className={styles.spanReservas}>
                                <span>Reservas</span>
                            </div>
                            <div className={styles.linhasReservas}>
                                <LinhaReserva />
                                <LinhaReserva />
                                <LinhaReserva />
                                <LinhaReserva />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.indicadores}>

                    <div className={styles.graficos}>
                        <div className={styles.graficoLinhaConteudo}>

                            <div className={styles.titulosGraficoLinha}>
                                <span>Total de visitantes</span>
                                <select value="valor" className={styles.selectBox}>
                                    <option value="Última semana">Última semana</option>
                                    <option value="Último dia">Último dia</option>
                                    <option value="Último mês">Último mês</option>
                                </select>
                            </div>

                            <div className={styles.graficoLinha}>
                                <canvas ref={graficoTotalClientesRef} id="graficoTotalClientes" />
                            </div>
                        </div>

                        <div className={styles.contentamentoConteudo}>

                            <div className={styles.tituloContentamento}>
                                <span>% de contentamento dos usuários</span>
                            </div>

                            <div className={styles.porcentagemContentamento}>
                                <div className={styles.progressBar}>
                                <ProgressBar score={reviewScore}/>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className={styles.melhoresAvaliacoes}>
                        <div className={styles.containerAvaliacoes}>
                            <div className={styles.conteudoAvaliacoes}>

                                <div className={styles.tituloAvaliacoes}>
                                    <span>Melhores avaliações</span>
                                </div>
                                <div className={styles.linhasAvaliacoes}>
                                    <CardAvalicoes />
                                    <CardAvalicoes />
                                    <CardAvalicoes />
                                    <CardAvalicoes />
                                    <CardAvalicoes />
                                    <CardAvalicoes />
                                    <CardAvalicoes />
                                    <CardAvalicoes />
                                    <CardAvalicoes />
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
