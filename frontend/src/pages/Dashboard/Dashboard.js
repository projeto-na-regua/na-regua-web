import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all necessary components

export const createGraficoTotalClientes = (ctx, dados, label, maiorValor) => {
    const data = {
        labels: label,
        datasets: [{
            label: "Fluxo de caixa",
            data: dados,
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
                    max: maiorValor + 5,
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

export const createGraficoContentamento = (ctx) => {
    const data = {
        labels: ['Categoria A', 'Categoria B', 'Categoria C', 'Categoria D'],
        datasets: [{
            data: [300, 200],
            backgroundColor: ['#E3A74F', '#082031'], 
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
                }
            }
        }
    };

    return new Chart(ctx, config);
};

const chartConfig = { createGraficoTotalClientes, createGraficoContentamento };

export default chartConfig;
