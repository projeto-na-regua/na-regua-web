import React from 'react'
import styles from './CardAvaliacoes.module.css'

const CardAvalicoes = ({
    nome, data, nota
}) => {
    return (
        <>
            <div className={styles.cardTodo}>

                <div className={styles.dataAvaliacao}>
                    <span>{data}</span>
                </div>

                <div className={styles.nomeCliente}>
                    <span>{nome}</span>
                </div>

                <div className={styles.notaAvaliacao}>
                    <div className={styles.circulo}>{nota}</div>
                </div>
            </div>


        </>
    )
}
export default CardAvalicoes;