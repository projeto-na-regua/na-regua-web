// src/chartConfig.js
import { Chart } from 'chart.js';

export const createGraficoFluxoCaixa = (ctx) => {
    const data = {
        labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        datasets: [{
            label: "Fluxo de caixa",
            data: [320, 400, 230, 700, 500, 650, 320, 400, 230, 700, 500, 650],
            borderColor: '#E3A74F',
            pointBackgroundColor: '#E3A74F',
            pointRadius: 1,
            borderWidth: 1,
            lineTension: .4
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    max: 1000,
                    min: 0,
                    grid: {
                        display: true,
                        color: '#E3A74F',
                        lineWidth: 0.25,
                    },
                    ticks: {
                        beginAtZero: true,
                        color: '#CBD5E0',
                        font: {
                            size: 10,
                            family: 'Plus Jakarta Sans',
                            weight: 600
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: true,
                        color: '#CBD5E0',
                        font: {
                            size: 10,
                            family: 'Plus Jakarta Sans',
                            weight: 600
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        font: {
                            size: 10,
                            color: 'white',
                            family: 'Plus Jakarta Sans',
                            weight: 600,
                        }
                    }
                }
            }
        }
    };

    return new Chart(ctx, config);
};

export const createGraficoLucratividade = (ctx) => {
    const data = {
        labels: ['Categoria A', 'Categoria B', 'Categoria C', 'Categoria D'],
        datasets: [{
            data: [300, 200], // Dados fictícios
            backgroundColor: ['#E3A74F', '#082031'], // Usando a cor #E3A74F para todas as fatias
            borderColor: '#FFFFFF', // Cor da borda
            borderWidth: 1 // Largura da borda
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    return new Chart(ctx, config);
};
export default { createGraficoFluxoCaixa, createGraficoLucratividade };