import React from "react";
import styles from "./CardAvaliacoesVisualizarBarbearia.module.css"
import foto from "../../utils/assets/barbeiroPerfil.jpg"

export function CardAvaliacoesVisualizarBarbearia() {
    return (
        <>
            <div className={styles.conteudoCardAvaliacoesVisualizarBarbearia}>
                <div className={styles.foto}>
                    <img src={foto} alt="" />
                </div>

                <div className={styles.informacoesCard}>
                    <div className={styles.nome}>
                        <span>Roberto Carlos</span>
                    </div>

                    <div className={styles.linhaConteudo}>
                        <div className={styles.linha}></div>
                        <div className={styles.conteudoAvaliacao}>
                            <span>AMEEEEEEEEEEEEEEIIIIII</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardAvaliacoesVisualizarBarbearia;