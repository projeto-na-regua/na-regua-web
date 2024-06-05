import React from 'react'
import styles from './LinhaReserva.module.css'

export function LinhaReserva() {
    return (
        <>
            <div className={styles.linhaReserva}>
                <div className={styles.containerLinhaReserva}>
                    <div className={styles.conteudoLinhaReserva}>

                        <div className={styles.nomeCliente}>
                            <span>Gabriella R.</span>
                        </div>

                        <div className={styles.servicoEscolhido}>
                            <span>Corte + Escova</span>
                        </div>

                        <div className={styles.horario}>
                            <span>09:00 - 10:00</span>
                        </div>

                        <div className={styles.statusReserva}>
                                <div className={styles.spanStatusReserva}>
                                    <span>Confirmado</span>
                            </div>
                        </div>

                        <div className={styles.nomeBarbeiro}>
                            <span>Lucas F.</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default LinhaReserva;