import React, { useEffect, useRef, useState } from 'react'
import styles from './FluxoDeCaixa.module.css'
import { theme } from '../../theme.js'
import { ThemeProvider } from '@emotion/react'
import chartConfig from './FluxoDeCaixa.js'
import CardFluxoCaixa from '../../components/CardFluxoCaixa/CardFluxoCaixa.jsx'
import CardLancarValores from '../../components/CardLancarValores/CardLancarValores.jsx'
import CardLancarReceitaDespesa from '../../components/CardLancarReceitaDespesa/CardLancarReceitaDespesa.jsx'
import api from '../../api.js'
import { Sidebar } from '../../components/Sidebar.jsx'
import { HeaderUsuario } from '../../components/Header.jsx'

export function Financeiro() {
    const graficoFluxoCaixaRef = useRef(null)
    const graficoLucratividadeRef = useRef(null)
    const fluxoCaixaChartRef = useRef(null)
    const lucratividadeChartRef = useRef(null)
    const [qtdDiasGrafico, setQtdDiasGrafico] = useState(7)
    const [labelsGrafico, setLabelsGrafico] = useState([])
    const [dadosGrafico, setDadosGrafico] = useState([])
    const [maiorValorServico, setMaiorValorServico] = useState()
    const [lucro, setLucro] = useState()
    const [despesa, setDespesa] = useState()
    const [receita, setReceita] = useState()
    const [lucratividade, setLucratividade] = useState()
    const [mostrarModal, setMostrarModal] = useState(false) // Estado para controlar exibição do modal
    const [scrollHabilitado, setScrollHabilitado] = useState(true)
    const token = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        if (!scrollHabilitado) {
            // Desabilita o scroll ao abrir o modal
            document.body.style.overflow = 'hidden'
        } else {
            // Habilita o scroll ao fechar o modal
            document.body.style.overflow = 'auto'
        }
    }, [scrollHabilitado])

    useEffect(() => {
        if (dadosGrafico.length && labelsGrafico.length) {
            const ctxFluxoCaixa = graficoFluxoCaixaRef.current.getContext('2d')
            const ctxLucratividade = graficoLucratividadeRef.current.getContext('2d')

            // Destroy previous chart instances if they exist
            if (fluxoCaixaChartRef.current) {
                fluxoCaixaChartRef.current.destroy()
            }
            if (lucratividadeChartRef.current) {
                lucratividadeChartRef.current.destroy()
            }

            // Create new chart instances
            fluxoCaixaChartRef.current = chartConfig.createGraficoFluxoDeCaixa(ctxFluxoCaixa, dadosGrafico, labelsGrafico, maiorValorServico)
            lucratividadeChartRef.current = chartConfig.createGraficoLucratividade(ctxLucratividade, lucratividade)

            // Cleanup function to destroy charts on component unmount
            return () => {
                if (fluxoCaixaChartRef.current) {
                    fluxoCaixaChartRef.current.destroy()
                }
                if (lucratividadeChartRef.current) {
                    lucratividadeChartRef.current.destroy()
                }
            }
        }
    }, [labelsGrafico, dadosGrafico])

    useEffect(() => {
        fetchFluxoCaixa()
    }, [qtdDiasGrafico])

    const fetchFluxoCaixa = async () => {
        try {
            const dataAtual = new Date()
            const dataFinal = dataAtual.toISOString().split('T')[0]

            const dataInicial = new Date(dataAtual)
            dataInicial.setDate(dataInicial.getDate() - qtdDiasGrafico)
            const dataInicialFormatada = dataInicial.toISOString().split('T')[0]

            console.log('Fetching fluxo de caixa')
            const response = await api.get(`financas`, {
                headers: {
                    Authorization: token,
                },
                params: {
                    qtdDias: qtdDiasGrafico,
                    dataInicial: dataInicialFormatada,
                    dataFinal: dataFinal,
                }
            })
            console.log(response.data)

            if (response.data.servicos && response.data.servicos[0] && response.data.servicos[1]) {
                const datasGraficoFormatadas = response.data.servicos[0].map(data => {
                    if (data) {
                        const [ano, mes, dia] = data.split('-')
                        return `${dia}/${mes}`
                    }
                    return '' // Return an empty string or handle the undefined case as needed
                }).filter(date => date) // Filter out any empty strings
                setLabelsGrafico(datasGraficoFormatadas)
                setDadosGrafico(response.data.servicos[1])

                const vetorPrecosServicos = response.data.servicos[1]
                const maiorValor = vetorPrecosServicos.reduce((max, valor) => Math.max(max, valor), vetorPrecosServicos[0])
                setMaiorValorServico(maiorValor)
            } else {
                setLabelsGrafico([])
                setDadosGrafico([])
                setMaiorValorServico(0)
            }

            setLucratividade(response.data.lucratividade || 0)
            setLucro(response.data.lucro || 0)
            setDespesa(response.data.despesa || 0)
            setReceita(response.data.receita || 0)

        } catch (error) {
            console.error('Erro ao buscar os dados da dashboard:', error)
        }
    }


    const handleSelectChange = (event) => {
        const value = parseInt(event.target.value, 10)
        setQtdDiasGrafico(value)
    }

    const handleLancarValoresClick = () => {
        setMostrarModal(true) // Exibir o modal ao clicar em "Lançar Valores"
        setScrollHabilitado(false)
    }

    const handleFecharModal = () => {
        setMostrarModal(false)
        setScrollHabilitado(true) // Habilita o scroll ao fechar o modal
    }

    const formatarNumero = (numero) => {
        if (typeof numero !== 'undefined') {
            return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }
        return ''
    }

    return (
        <ThemeProvider theme={theme}>
            <Sidebar />

            <div className={styles.fluxoCaixaTodo}>
                <HeaderUsuario title='Fluxo de Caixa' />
                {mostrarModal && (
                    <div className={styles.modalAdicionarValorDespesa}>
                        <div className={styles.backgroundShade} />
                        <div className={styles.conteudoModal}>
                            <CardLancarReceitaDespesa onClose={handleFecharModal} />
                        </div>
                    </div>
                )}

                <div className={styles.containerFluxoCaixa}>
                    <div className={styles.cardFluxoCaixa}>
                        <CardFluxoCaixa icone={<svg width="35" height="29" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.3747 13.3965C32.8815 16.7315 38.7571 23.0505 38.7571 30.291C38.7571 37.5314 32.6919 42.6875 25.2157 42.6875C17.7395 42.6875 11.6953 37.6192 11.6953 30.291C11.6953 22.9627 17.5499 16.7315 22.0567 13.3965L17.2762 6.4852C17.0614 6.02018 16.9926 5.49654 17.0796 4.98852C17.1665 4.4805 17.4048 4.01388 17.7605 3.65484C18.098 3.28862 18.5469 3.05565 19.0308 2.99564C19.5146 2.93563 20.0035 3.05228 20.4141 3.32572C20.8115 3.56192 21.2788 3.63657 21.726 3.5353C22.1731 3.43403 22.5685 3.164 22.8359 2.7772L23.2993 2.11898C23.5076 1.78447 23.7909 1.5078 24.1248 1.31285C24.4587 1.1179 24.8331 1.01052 25.2157 1C25.5938 1.00081 25.9663 1.09463 26.303 1.27383C26.6397 1.45303 26.931 1.71253 27.1532 2.03122L27.6165 2.68944C27.884 3.07624 28.2794 3.34626 28.7265 3.44753C29.1736 3.5488 29.6409 3.47415 30.0384 3.23796C30.4489 2.96452 30.9378 2.84786 31.4217 2.90788C31.9055 2.96789 32.3545 3.20086 32.6919 3.56707C33.0689 3.93101 33.319 4.41524 33.4029 4.94353C33.4868 5.47181 33.3997 6.01416 33.1552 6.4852L28.3747 13.3965Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17.8477 13.0674H32.5895" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.42391 39.3964C7.18975 39.3964 5.0471 38.4718 3.46731 36.8259C1.88752 35.18 1 32.9477 1 30.6201C1.09164 27.9628 1.81256 25.3703 3.09858 23.0735C4.38459 20.7766 6.1958 18.8467 8.37092 17.4556L5.75951 12.6945C5.60968 12.4484 5.53013 12.1631 5.53013 11.8717C5.53013 11.5803 5.60968 11.295 5.75951 11.0489C5.92844 10.8108 6.1582 10.627 6.42257 10.5184C6.68695 10.4097 6.97531 10.3807 7.25475 10.4346C8.64481 10.7259 10.0767 10.7259 11.4667 10.4346C11.7462 10.3807 12.0345 10.4097 12.2989 10.5184C12.5633 10.627 12.793 10.8108 12.962 11.0489C13.1118 11.295 13.1913 11.5803 13.1913 11.8717C13.1913 12.1631 13.1118 12.4484 12.962 12.6945L10.4769 17.4556" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.21094 17.4561H10.4759" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M41.0135 39.3964C43.2477 39.3964 45.3903 38.4718 46.9701 36.8259C48.5499 35.18 49.4374 32.9477 49.4374 30.6201C49.3458 27.9628 48.6249 25.3703 47.3389 23.0735C46.0528 20.7766 44.2416 18.8467 42.0665 17.4556L44.6779 12.6945C44.8278 12.4484 44.9073 12.1631 44.9073 11.8717C44.9073 11.5803 44.8278 11.295 44.6779 11.0489C44.509 10.8108 44.2792 10.627 44.0149 10.5184C43.7505 10.4097 43.4621 10.3807 43.1827 10.4346C41.7926 10.7259 40.3608 10.7259 38.9707 10.4346C38.6913 10.3807 38.4029 10.4097 38.1385 10.5184C37.8742 10.627 37.6444 10.8108 37.4755 11.0489C37.3257 11.295 37.2461 11.5803 37.2461 11.8717C37.2461 12.1631 37.3257 12.4484 37.4755 12.6945L39.9605 17.4556" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M45.2259 17.4561H39.9609" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M25.2188 33.9111V36.1052" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M25.2188 22.9404V25.1345" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21.0078 33.9111H27.3257C27.8843 33.9111 28.42 33.6799 28.8149 33.2685C29.2098 32.857 29.4317 32.2989 29.4317 31.717C29.4317 31.1351 29.2098 30.577 28.8149 30.1656C28.42 29.7541 27.8843 29.5229 27.3257 29.5229H23.1138C22.5553 29.5229 22.0196 29.2918 21.6246 28.8803C21.2297 28.4688 21.0078 27.9108 21.0078 27.3288C21.0078 26.7469 21.2297 26.1889 21.6246 25.7774C22.0196 25.3659 22.5553 25.1348 23.1138 25.1348H29.4317" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        } spanValue={"Lucro"} valor={formatarNumero(lucro)} />
                        <CardFluxoCaixa icone={<svg width="35" height="29" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.668 7.12793C25.9212 7.12793 21.2811 8.53551 17.3343 11.1727C13.3876 13.8098 10.3114 17.5579 8.49487 21.9434C6.67838 26.3287 6.20309 31.1546 7.12913 35.8102C8.05517 40.4657 10.3409 44.742 13.6974 48.0984C17.0539 51.4548 21.3303 53.7408 25.9858 54.6667C30.6413 55.5929 35.467 55.1174 39.8525 53.3009C44.2378 51.4846 47.9861 48.4082 50.6232 44.4614C53.2604 40.5146 54.668 35.8747 54.668 31.128" stroke="#082031" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M32.3495 41.064V43.7042C32.3495 44.1307 32.1798 44.5399 31.8784 44.8413C31.5767 45.143 31.1677 45.312 30.7412 45.312C30.3148 45.312 29.9058 45.143 29.6044 44.8413C29.3027 44.5399 29.1332 44.1307 29.1332 43.7042V40.9924C28.0684 40.8175 27.0488 40.4325 26.1342 39.8599C25.2194 39.287 24.4278 38.5377 23.8053 37.656C23.5786 37.3682 23.4522 37.0144 23.4453 36.6482C23.4451 36.4404 23.4871 36.2342 23.5687 36.0429C23.6504 35.8519 23.77 35.6791 23.9204 35.5356C24.0707 35.392 24.2486 35.2802 24.4434 35.2075C24.6381 35.1345 24.8457 35.1021 25.0534 35.112C25.2594 35.1108 25.4632 35.1554 25.65 35.2425C25.8368 35.3296 26.0017 35.4578 26.1332 35.6164C26.901 36.6194 27.9431 37.3778 29.1332 37.8002V31.7042C25.9412 30.4562 24.3333 28.584 24.3333 26.16C24.3814 24.8623 24.8915 23.6244 25.7716 22.6695C26.6516 21.7147 27.8437 21.1057 29.1332 20.9522V18.3119C29.1332 17.8855 29.3027 17.4768 29.6044 17.1752C29.9058 16.8736 30.3148 16.7041 30.7412 16.7041C31.1677 16.7041 31.5767 16.8736 31.8784 17.1752C32.1798 17.4768 32.3495 17.8855 32.3495 18.3119V20.9281C33.2425 21.0681 34.0981 21.3867 34.8652 21.865C35.6322 22.3434 36.2948 22.9715 36.8132 23.7119C37.042 23.9818 37.1768 24.3192 37.1972 24.6722C37.2037 24.8779 37.1689 25.0826 37.0945 25.2746C37.0201 25.4666 36.908 25.6418 36.7648 25.7896C36.6215 25.9375 36.4499 26.0546 36.2605 26.1348C36.0709 26.2149 35.8672 26.2562 35.6612 26.256C35.4462 26.2548 35.234 26.2072 35.0394 26.116C34.8448 26.0248 34.672 25.8924 34.5332 25.7282C33.9611 25.0132 33.2068 24.4663 32.3495 24.1444V29.5444L32.9495 29.784C35.9975 30.984 37.8935 32.7122 37.8935 35.4482C37.8577 36.9141 37.2642 38.3112 36.2341 39.3547C35.204 40.3982 33.8147 41.0092 32.3495 41.064ZM29.1332 28.1522V24.24C28.7459 24.3804 28.4125 24.6391 28.18 24.9794C27.9476 25.3195 27.8276 25.7241 27.8375 26.136C27.8334 26.5617 27.9539 26.9796 28.184 27.3376C28.4144 27.696 28.7442 27.9792 29.1332 28.1522ZM34.3892 35.5202C34.3892 34.3682 33.5975 33.6722 32.3495 33.1202V37.9202C32.9216 37.8336 33.4434 37.5427 33.8183 37.1018C34.1932 36.6607 34.396 36.0991 34.3892 35.5202Z" fill="#082031" />
                            <path d="M41.082 20.5918L54.666 7.00781" stroke="#082031" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M43.7969 7.00781H54.6689V17.8798" stroke="#082031" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        } spanValue={"Receita"} valor={formatarNumero(receita)} />
                        <CardFluxoCaixa icone={<svg width="35" height="29" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.668 7.12793C25.9212 7.12793 21.2811 8.53551 17.3343 11.1727C13.3876 13.8098 10.3114 17.5579 8.49487 21.9434C6.67838 26.3287 6.20309 31.1546 7.12913 35.8102C8.05517 40.4657 10.3409 44.742 13.6974 48.0984C17.0539 51.4548 21.3303 53.7408 25.9858 54.6667C30.6413 55.5929 35.467 55.1174 39.8525 53.3009C44.2378 51.4846 47.9861 48.4082 50.6232 44.4614C53.2604 40.5146 54.668 35.8747 54.668 31.128" stroke="#082031" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M32.3495 41.064V43.7042C32.3495 44.1307 32.1798 44.5399 31.8784 44.8413C31.5767 45.143 31.1677 45.312 30.7412 45.312C30.3148 45.312 29.9058 45.143 29.6044 44.8413C29.3027 44.5399 29.1332 44.1307 29.1332 43.7042V40.9924C28.0684 40.8175 27.0488 40.4325 26.1342 39.8599C25.2194 39.287 24.4278 38.5377 23.8053 37.656C23.5786 37.3682 23.4522 37.0144 23.4453 36.6482C23.4451 36.4404 23.4871 36.2342 23.5687 36.0429C23.6504 35.8519 23.77 35.6791 23.9204 35.5356C24.0707 35.392 24.2486 35.2802 24.4434 35.2075C24.6381 35.1345 24.8457 35.1021 25.0534 35.112C25.2594 35.1108 25.4632 35.1554 25.65 35.2425C25.8368 35.3296 26.0017 35.4578 26.1332 35.6164C26.901 36.6194 27.9431 37.3778 29.1332 37.8002V31.7042C25.9412 30.4562 24.3333 28.584 24.3333 26.16C24.3814 24.8623 24.8915 23.6244 25.7716 22.6695C26.6516 21.7147 27.8437 21.1057 29.1332 20.9522V18.3119C29.1332 17.8855 29.3027 17.4768 29.6044 17.1752C29.9058 16.8736 30.3148 16.7041 30.7412 16.7041C31.1677 16.7041 31.5767 16.8736 31.8784 17.1752C32.1798 17.4768 32.3495 17.8855 32.3495 18.3119V20.9281C33.2425 21.0681 34.0981 21.3867 34.8652 21.865C35.6322 22.3434 36.2948 22.9715 36.8132 23.7119C37.042 23.9818 37.1768 24.3192 37.1972 24.6722C37.2037 24.8779 37.1689 25.0826 37.0945 25.2746C37.0201 25.4666 36.908 25.6418 36.7648 25.7896C36.6215 25.9375 36.4499 26.0546 36.2605 26.1348C36.0709 26.2149 35.8672 26.2562 35.6612 26.256C35.4462 26.2548 35.234 26.2072 35.0394 26.116C34.8448 26.0248 34.672 25.8924 34.5332 25.7282C33.9611 25.0132 33.2068 24.4663 32.3495 24.1444V29.5444L32.9495 29.784C35.9975 30.984 37.8935 32.7122 37.8935 35.4482C37.8577 36.9141 37.2642 38.3112 36.2341 39.3547C35.204 40.3982 33.8147 41.0092 32.3495 41.064ZM29.1332 28.1522V24.24C28.7459 24.3804 28.4125 24.6391 28.18 24.9794C27.9476 25.3195 27.8276 25.7241 27.8375 26.136C27.8334 26.5617 27.9539 26.9796 28.184 27.3376C28.4144 27.696 28.7442 27.9792 29.1332 28.1522ZM34.3892 35.5202C34.3892 34.3682 33.5975 33.6722 32.3495 33.1202V37.9202C32.9216 37.8336 33.4434 37.5427 33.8183 37.1018C34.1932 36.6607 34.396 36.0991 34.3892 35.5202Z" fill="#082031" />
                            <path d="M41.082 20.5918L54.666 7.00781" stroke="#082031" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M43.7969 7.00781H54.6689V17.8798" stroke="#082031" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        } spanValue={"Despesas"} valor={formatarNumero(despesa)} />
                    </div>

                    <div className={styles.botaoLancarValores}>
                        {<CardLancarValores setMostrarModal={setMostrarModal} setScrollHabilitado={setScrollHabilitado} />}
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
    )
}

export default FluxoDeCaixa
