import React, { useEffect, useRef } from 'react';
import styles from './Dashboard.module.css';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import CardDashboardStatus from '../../components/CardDashboardStatus/CardDashboardStatus';
import LinhaReserva from '../../components/LinhaReserva/LinhaReserva';
import chartConfig from './Dashboard';
import CardAvalicoes from '../../components/CardAvaliacoes/CardAvaliacoes';

export function Dashboard() {
    const graficoFluxoCaixaRef = useRef(null);
    const graficoLucratividadeRef = useRef(null);
    const fluxoCaixaChartRef = useRef(null);
    const lucratividadeChartRef = useRef(null);

    useEffect(() => {
        const ctxFluxoCaixa = graficoFluxoCaixaRef.current.getContext('2d');
        const ctxLucratividade = graficoLucratividadeRef.current.getContext('2d');

        // Destroy previous chart instances if they exist
        if (fluxoCaixaChartRef.current) {
            fluxoCaixaChartRef.current.destroy();
        }
        if (lucratividadeChartRef.current) {
            lucratividadeChartRef.current.destroy();
        }

        // Create new chart instances
        fluxoCaixaChartRef.current = chartConfig.createGraficoFluxoCaixa(ctxFluxoCaixa);
        lucratividadeChartRef.current = chartConfig.createGraficoLucratividade(ctxLucratividade);

        // Cleanup function to destroy charts on component unmount
        return () => {
            if (fluxoCaixaChartRef.current) {
                fluxoCaixaChartRef.current.destroy();
            }
            if (lucratividadeChartRef.current) {
                lucratividadeChartRef.current.destroy();
            }
        };
    }, []); // Run effect only once after the initial render

    return (
        <ThemeProvider theme={theme}>
            <HeaderUsuario />
            <NavbarBarbeiro />
            <div className={styles.containerDashboard}>
                <div className={styles.cardDashboards}>
                    <CardDashboardStatus />
                    <CardDashboardStatus />
                    <CardDashboardStatus />
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
                                <canvas ref={graficoFluxoCaixaRef} id="graficoFluxoCaixa" />
                            </div>
                        </div>

                        <div className={styles.contentamentoConteudo}>

                            <div className={styles.tituloContentamento}>
                                <span>% de contentamento dos usuários</span>
                            </div>

                            <div className={styles.porcentagemContentamento}>
                                <canvas ref={graficoLucratividadeRef} id="graficoLucratividade" />
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
