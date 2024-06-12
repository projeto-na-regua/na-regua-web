import React from "react";
import styles from "./LinhaFiltroBuscarBarbearia.module.css"

export function LinhaFiltroBuscarBarbearia() {
    return (
        <>
            <div className={styles.conteudoLinhaFiltroBuscarBarbearia}>

                <div className={styles.label}>
                    <span>Barbearias próximas de</span>
                </div>

                <div className={styles.inputs}>
                    <div className={styles.inputEsquerda}>
                        <input type="text" placeholder="Local"/>
                    </div>

                    <div className={styles.inputDireita}>
                        <input type="text" placeholder="Filtros"/>
                    </div>
                </div>


            </div>
        </>
    )
}
export default LinhaFiltroBuscarBarbearia;