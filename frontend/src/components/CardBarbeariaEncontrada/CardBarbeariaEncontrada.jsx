import React from "react";
import styles from "./CardBarbeariaEncontrada.module.css"

const CardBarbeariaEncontrada = ({
    nomeBarbearia, endereco, foto}) => {
    return (
        <>
            <div className={styles.conteudoCardBarbeariaEncontrada}>

                <div className={styles.fotoBarbearia}>
            
                    <img src={foto} alt="" />

                </div>

                <div className={styles.informacoesBarbearia}>
                    <div className={styles.nomeDistancia}>
                        <span>{nomeBarbearia}</span>
                        <span>1,4 km</span>
                    </div>

                    <div className={styles.endereco}>
                        <span>{endereco}</span>
                    </div>

                    <div className={styles.botaoVisualizarPerfil}>
                        <button>Visualizar perfil</button>
                    </div>
                </div>

            </div>
        </>
    )
};
export default CardBarbeariaEncontrada;