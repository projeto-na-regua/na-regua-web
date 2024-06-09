import React from 'react'
import styles from './CardLancarValores.module.css'

export function CardLancarValores() {
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
                            <span>Lançar valores</span>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default CardLancarValores;