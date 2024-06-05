import React from 'react'
import styles from './Dashboard.module.css'
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro'
import api from '../../api'
import { theme } from '../../theme'
import { ThemeProvider } from '@emotion/react'
import CardDashboardStatus from '../../components/CardDashboardStatus/CardDashboardStatus'
import LinhaReserva from '../../components/LinhaReserva/LinhaReserva'
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-annotation';
import { createGraficoFluxoCaixa, createGraficoLucratividade } from './Dashboard';


export function Dashboard() {
    const token = JSON.parse(sessionStorage.getItem('user'))
    const fluxoCaixaRef = useRef(null);
    const lucratividadeRef = useRef(null);
    const fluxoCaixaChart = useRef(null);
    const lucratividadeChart = useRef(null);

    useEffect(() => {
        if (fluxoCaixaRef.current) {
            fluxoCaixaChart.current = createGraficoFluxoCaixa(fluxoCaixaRef.current.getContext('2d'));
        }
        if (lucratividadeRef.current) {
            lucratividadeChart.current = createGraficoLucratividade(lucratividadeRef.current.getContext('2d'));
        }

        return () => {
            if (fluxoCaixaChart.current) {
                fluxoCaixaChart.current.destroy();
            }
            if (lucratividadeChart.current) {
                lucratividadeChart.current.destroy();
            }
        };
    }, []);

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

                <div>
                    <canvas id="graficoFluxoCaixa" ref={fluxoCaixaRef} />
                    <canvas id="graficoLucratividade" ref={lucratividadeRef} />
                </div>

            </div>




        </ThemeProvider>
    )
}
export default Dashboard;
