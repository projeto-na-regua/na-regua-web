import React from 'react'
import styles from './CardFluxoCaixa.module.css'

export function CardFluxoCaixa({spanValue}) {
    return (
        <>
            <div className={styles.cardTodo}>
                <div className={styles.conteudoCard}>
                    <div className={styles.divIcon}>
                        <div className={styles.icone}>
                        </div>
                    </div>

                    <div className={styles.divInformacoes}>
                        <div className={styles.labelCard}>
                            <span>{spanValue}</span>
                        </div>

                        <div className={styles.qtdStatus}>
                            <span>5</span>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default CardFluxoCaixa;