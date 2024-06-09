import React, { useEffect, useRef } from 'react';
import styles from './FluxoDeCaixa.module.css';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import chartConfig from './FluxoDeCaixa.js';
import CardFluxoCaixa from '../../components/CardFluxoCaixa/CardFluxoCaixa.jsx';
import CardLancarValores from '../../components/CardLancarValores/CardLancarValores.jsx';

export function FluxoDeCaixa() {
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
        fluxoCaixaChartRef.current = chartConfig.createGraficoFluxoDeCaixa(ctxFluxoCaixa);
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

            <div className={styles.containerFluxoCaixa}>

                <div className={styles.cardFluxoCaixa}>
                    <CardFluxoCaixa spanValue={"Saldo"} />
                    <CardFluxoCaixa spanValue={"Lucro"} />
                    <CardFluxoCaixa spanValue={"Despesas"} />
                    <CardLancarValores />
                </div>

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

                    <div className={styles.graficoLucratividadeConteudo}>
                        <div className={styles.tituloGraficoLucratividade}>
                            <span>Lucratividade ({"%"})</span>
                        </div>
                        <div className={styles.graficoLucratividade}>
                            <canvas ref={graficoLucratividadeRef} id="graficoLucratividade" />
                        </div>
                    </div>




                </div>




            </div>
        </ThemeProvider>
    );
}

export default FluxoDeCaixa;
