import React from "react";
import styles from "./FotoPerfilEquipe.module.css"
import foto from "../../utils/assets/barbeiroPerfil.jpg"

export function FotoPerfilEquipe() {
    return (
        <>
            <div className={styles.conteudoFotoPerfilEquipe}>
                <div className={styles.foto}>
                    <img src={foto} alt="" />
                </div>
            </div>
        </>
    )
}
export default FotoPerfilEquipe;