import React from 'react'
import styles from './CardDashboardStatus.module.css'

export function CardDashboardStatus({iconStyle, spanValue}) {
    return (
        <>
            <div className={styles.cardTodo}>
                <div className={styles.conteudoCard}>
                    <div className={styles.divIcon}>
                        <div className={styles.icone} style={iconStyle}>
                            <span>V</span>
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
export default CardDashboardStatus;