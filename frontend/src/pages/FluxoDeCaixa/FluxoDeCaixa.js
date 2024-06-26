import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
export const createGraficoFluxoDeCaixa = (ctx, dados, labels, maiorValor) => {
    const data = {
        labels: labels,
        datasets: [{
            label: "Fluxo de caixa",
            data: dados,
            borderColor: '#E3A74F',
            pointBackgroundColor: '#E3A74F',
            pointRadius: 3,
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
                    max: maiorValor + 100,
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

export const createGraficoLucratividade = (ctx, lucratividade) => {
    const data = {
        labels: [lucratividade > 0 ? 'Lucro' : '', lucratividade > 0 ? '' : 'Prejuízo'],
        datasets: [{
            data: [lucratividade > 0 ? lucratividade : 0, lucratividade > 0 ? 100 - lucratividade : lucratividade],
            backgroundColor: [lucratividade > 0 ? '#E3A74F' : '#082031', lucratividade > 0 ? '#082031' : 'red'],
            borderColor: '#FFFFFF',
            borderWidth: 1
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
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = Math.abs(context.raw).toFixed(1);
                            if (context.dataset.data[1] === 0) {
                                value = lucratividade > 0 ? `${value}% de lucro` : `${value}% de prejuízo`;
                            } else {
                                value = `${value}%`;
                            }
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    };

    return new Chart(ctx, config);
};


const chartConfig = { createGraficoFluxoDeCaixa, createGraficoLucratividade };

export default chartConfig;
