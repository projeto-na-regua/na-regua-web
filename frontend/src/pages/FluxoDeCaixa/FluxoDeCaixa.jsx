import React, { useEffect, useRef, useState } from 'react';
import styles from './FluxoDeCaixa.module.css';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import chartConfig from './FluxoDeCaixa.js';
import CardFluxoCaixa from '../../components/CardFluxoCaixa/CardFluxoCaixa.jsx';
import CardLancarValores from '../../components/CardLancarValores/CardLancarValores.jsx';
import CardLancarReceitaDespesa from '../../components/CardLancarReceitaDespesa/CardLancarReceitaDespesa.jsx';
import api from '../../api.js';

export function FluxoDeCaixa() {
    const graficoFluxoCaixaRef = useRef(null);
    const graficoLucratividadeRef = useRef(null);
    const fluxoCaixaChartRef = useRef(null);
    const lucratividadeChartRef = useRef(null);
    const [qtdDiasGrafico, setQtdDiasGrafico] = useState(7);
    const [labelsGrafico, setLabelsGrafico] = useState([]);
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [maiorValorServico, setMaiorValorServico] = useState();
    const [lucro, setLucro] = useState();
    const [despesa, setDespesa] = useState();
    const [saldo, setSaldo] = useState();
    const [lucratividade, setLucratividade] = useState();
    const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar exibição do modal
    const [scrollHabilitado, setScrollHabilitado] = useState(true);
    const token = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        if (!scrollHabilitado) {
            // Desabilita o scroll ao abrir o modal
            document.body.style.overflow = 'hidden';
        } else {
            // Habilita o scroll ao fechar o modal
            document.body.style.overflow = 'auto';
        }
    }, [scrollHabilitado]);

    useEffect(() => {
        if (dadosGrafico.length && labelsGrafico.length) {
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
            fluxoCaixaChartRef.current = chartConfig.createGraficoFluxoDeCaixa(ctxFluxoCaixa, dadosGrafico, labelsGrafico, maiorValorServico);
            lucratividadeChartRef.current = chartConfig.createGraficoLucratividade(ctxLucratividade, lucratividade);

            // Cleanup function to destroy charts on component unmount
            return () => {
                if (fluxoCaixaChartRef.current) {
                    fluxoCaixaChartRef.current.destroy();
                }
                if (lucratividadeChartRef.current) {
                    lucratividadeChartRef.current.destroy();
                }
            };
        }
    }, [labelsGrafico, dadosGrafico]);

    useEffect(() => {
        fetchFluxoCaixa();
    }, [qtdDiasGrafico]);

    const fetchFluxoCaixa = async () => {
        try {
            const dataAtual = new Date();
            const dataFinal = dataAtual.toISOString().split('T')[0];

            const dataInicial = new Date(dataAtual);
            dataInicial.setDate(dataInicial.getDate() - qtdDiasGrafico);
            const dataInicialFormatada = dataInicial.toISOString().split('T')[0];

            const response = await api.get(`financas`, {
                headers: {
                    Authorization: token,
                },
                params: {
                    qtdDias: qtdDiasGrafico,
                    dataInicial: dataInicialFormatada,
                    dataFinal: dataFinal,
                }
            });

            const datasGraficoFormatadas = response.data.servicosData.map(data => {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}`;
            });
            setLabelsGrafico(datasGraficoFormatadas);
            setDadosGrafico(response.data.servicosPreco);
            setLucratividade(response.data.lucratividade);
            setLucro(response.data.lucro);
            setDespesa(response.data.despesa);
            setSaldo(response.data.saldo);
            console.log(response.data)

            const vetorPrecosServicos = response.data.servicosPreco;
            const maiorValor = vetorPrecosServicos.reduce((max, valor) => Math.max(max, valor), vetorPrecosServicos[0]);
            setMaiorValorServico(maiorValor);

        } catch (error) {
            console.error('Erro ao buscar os dados da dashboard:', error);
        }
    };

    const handleSelectChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQtdDiasGrafico(value);
    };

    const handleLancarValoresClick = () => {
        setMostrarModal(true); // Exibir o modal ao clicar em "Lançar Valores"
        setScrollHabilitado(false);
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setScrollHabilitado(true); // Habilita o scroll ao fechar o modal
    };

    const formatarNumero = (numero) => {
        if (typeof numero !== 'undefined') {
            return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return '';
    };

    return (
        <ThemeProvider theme={theme}>
            <HeaderUsuario />
            <NavbarBarbeiro />

            <div className={styles.fluxoCaixaTodo}>
                {/* Modal com background shade */}
                {mostrarModal && (
                    <div className={styles.modalAdicionarValorDespesa}>
                        <div className={styles.backgroundShade} />
                        <div className={styles.conteudoModal}>
                            <CardLancarReceitaDespesa onClose={handleFecharModal}/>
                        </div>
                    </div>
                )}

                <div className={styles.containerFluxoCaixa}>
                    <div className={styles.cardFluxoCaixa}>
                        {/* Renderiza os componentes apenas se os valores estiverem definidos */}
                        {typeof lucro !== 'undefined' && (
                            <CardFluxoCaixa spanValue={"Lucro"} valor={formatarNumero(lucro)} />
                        )}
                        {typeof saldo !== 'undefined' && (
                            <CardFluxoCaixa spanValue={"Receita"} valor={formatarNumero(saldo)} />
                        )}
                        {typeof despesa !== 'undefined' && (
                            <CardFluxoCaixa spanValue={"Despesas"} valor={formatarNumero(despesa)} />
                        )}
                        <CardLancarValores onClick={handleLancarValoresClick} />
                    </div>

                    <div className={styles.graficos}>
                        <div className={styles.graficoLinhaConteudo}>
                            <div className={styles.titulosGraficoLinha}>
                                <span>Receita em serviços</span>
                                <select value={qtdDiasGrafico} onChange={handleSelectChange} className={styles.selectBox}>
                                    <option value={7}>Última semana</option>
                                    <option value={15}>Últimos 15 dias</option>
                                    <option value={30}>Último mês</option>
                                </select>
                            </div>
                            <div className={styles.graficoLinha}>
                                <canvas ref={graficoFluxoCaixaRef} id="graficoFluxoCaixa" />
                            </div>
                        </div>

                        <div className={styles.graficoLucratividadeConteudo}>
                            <div className={styles.tituloGraficoLucratividade}>
                                <span>Lucratividade (%)</span>
                            </div>
                            <div className={styles.graficoLucratividade}>
                                <canvas ref={graficoLucratividadeRef} id="graficoLucratividade" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default FluxoDeCaixa;
