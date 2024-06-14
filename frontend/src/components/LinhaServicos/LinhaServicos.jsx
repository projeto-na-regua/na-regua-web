import React from "react";
import styles from "./LinhaServicos.module.css"

export function LinhaServicos() {
    return (
        <>
            <div className={styles.conteudoLinhaServicos}>
                <div className={styles.nomeDescricaoServico}>
                    <div className={styles.nomeServico}>
                        <span>Corte + Escova</span>
                    </div>

                    <div className={styles.descricaoServico}>
                        <span>Inclui apenas corte.</span>
                    </div>
                </div>

                <div className={styles.linha}></div>

                <div className={styles.valorServico}>
                    <span>R$</span>
                    <span>35,90</span>
                </div>
            </div>
        </>
    )
}
export default LinhaServicos;