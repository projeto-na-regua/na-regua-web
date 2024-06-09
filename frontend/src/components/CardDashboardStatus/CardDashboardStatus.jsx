import React from 'react'
import styles from './CardDashboardStatus.module.css'

export function CardDashboardStatus() {
    return (
        <>
            <div className={styles.cardTodo}>
                <div className={styles.conteudoCard}>
                    <div className={styles.divIcon}>
                        <div className={styles.icone}>
                            <span>V</span>
                        </div>
                    </div>

                    <div className={styles.divInformacoes}>
                        <div className={styles.labelCard}>
                            <span>Confirmado</span>
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
export default CardDashboardStatus;