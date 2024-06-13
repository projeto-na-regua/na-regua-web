import React from "react";
import styles from "./CirculoPerfilBarbearia.module.css"
import foto from "../../utils/assets/imagem-login.png"

export function CirculoPerfilBarbearia() {
    return (
        <>
            <div className={styles.conteudoCirculoPerfilBarbearia}>
                <div className={styles.foto}>
                    <img src={foto} alt="" />
                </div>
            </div>
        </>
    )
}
export default CirculoPerfilBarbearia;