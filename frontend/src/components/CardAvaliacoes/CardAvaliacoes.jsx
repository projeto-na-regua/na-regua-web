import React from 'react'
import styles from './CardAvaliacoes.module.css'

export function CardAvalicoes() {
    return (
        <>
            <div className={styles.cardTodo}>
                <div className={styles.nomeCliente}>
                    <span>Lucas Faria</span>
                </div>

                <div className={styles.notaAvaliacao}>
                    <div className={styles.circulo}>4,5</div>
                </div>
            </div>


        </>
    )
}
export default CardAvalicoes;