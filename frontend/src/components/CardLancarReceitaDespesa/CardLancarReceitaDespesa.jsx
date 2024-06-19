import React, { useState } from 'react';
import styles from './CardLancarReceitaDespesa.module.css';
import api from '../../api.js';
const token = JSON.parse(sessionStorage.getItem('user'));

export function CardLancarReceitaDespesa({ onClose }) {
    const [selecionado, setSelecionado] = useState('lucro'); // Estado para controlar a seleção
    const [valor, setValor] = useState('');
    const [despesa, setDespesa] = useState(false);

    const handleSelecao = (opcao) => {
        if (opcao === 'lucro') {
            setSelecionado('lucro');
        } else if (opcao === 'despesa') {
            setSelecionado('despesa');
        }
    };

    const handleLancarValores = () => {
        fetchLancarValores(valor);
    };

    const fetchLancarValores = async (valor) => {
        try {
            console.log('Lançando valores:', valor);
            const response = await api.post('financas/lancar-valor', {
                valor: valor.replace('R$ ', ''), // Removendo o prefixo 'R$' antes de enviar
                despesa: despesa
            }, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao lançar valores:', error);
        }
    };

    const handleValorChange = (event) => {
        // Remove qualquer caractere não numérico, exceto o ponto decimal
        let valorDigitado = event.target.value.replace(/\D/g, '');

        // Adiciona o "R$" à esquerda do valor
        valorDigitado = `R$ ${valorDigitado}`;

        // Atualiza o estado do valor
        setValor(valorDigitado);
    };

    return (
        <div className={styles.cardTodo}>
            <div className={styles.containerCard}>
                <div className={styles.conteudoCard}>
                    <div className={styles.iconeTitulo}>
                        <div className={styles.iconeFechar} onClick={onClose}>
                            {/* Ícone de fechar */}
                            <svg width="18" height="21" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.4193 20.5532L10.7096 11.7766M10.7096 11.7766L3 3M10.7096 11.7766L18.4193 3M10.7096 11.7766L3 20.5532" stroke="#E3A74F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className={styles.tituloCard}>
                            <span>Fluxo de Caixa</span>
                        </div>
                    </div>

                    <div className={styles.input}>
                        <span>Valor</span>
                        <input
                            type="text"
                            value={valor}
                            onChange={handleValorChange}
                            placeholder="Digite o valor"
                            maxLength="15"
                        />
                    </div>

                    <div className={styles.selecao}>
                        {/* Aplica a classe 'selecionado' à div que estiver selecionada */}
                        <div className={`${styles.lucro} ${selecionado === 'lucro' ? styles.selecionado : ''}`} onClick={() => { handleSelecao('lucro'); setDespesa(false); }}>
                            <span>Receita</span>
                        </div>

                        <div className={`${styles.despesa} ${selecionado === 'despesa' ? styles.selecionado : ''}`} onClick={() => { handleSelecao('despesa'); setDespesa(true); }}>
                            <span>Despesa</span>
                        </div>

                    </div>

                    <div className={styles.botao}>
                        <button onClick={handleLancarValores}>Lançar valores</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardLancarReceitaDespesa;
