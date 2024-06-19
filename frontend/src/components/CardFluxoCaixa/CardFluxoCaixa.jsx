import React from 'react'
import styles from './CardFluxoCaixa.module.css'

export function CardFluxoCaixa({ spanValue, valor, icone }) {
    // Função para formatar o número como string com vírgula ao invés de ponto
    const formatarNumero = (numero) => {
        return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <>
            <div className={styles.cardTodo}>
                <div className={styles.conteudoCard}>
                    <div className={styles.divIcon}>
                        <div className={styles.icone}>
                            {icone}
                        </div>
                    </div>

                    <div className={styles.divInformacoes}>
                        <div className={styles.labelCard}>
                            <span>{spanValue}</span>
                        </div>

                        <div className={styles.qtdStatus}>
                            <span>{`R$ ${formatarNumero(valor)}`}</span>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}
export default CardFluxoCaixa;