import React from "react";
import styles from "./CirculoPerfilBarbearia.module.css"
import foto from "../../utils/assets/imagem-login.png"

const CirculoPerfilBarbearia = ({
    fotoPerfil
}) => {
    return (
        <>
            <div className={styles.conteudoCirculoPerfilBarbearia}>
                <div className={styles.foto}>
                    <img src={fotoPerfil ? fotoPerfil : foto} alt="" />
                </div>
            </div>
        </>
    )
}
export default CirculoPerfilBarbearia;