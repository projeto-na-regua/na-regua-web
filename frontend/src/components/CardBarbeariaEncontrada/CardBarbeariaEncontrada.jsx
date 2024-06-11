import React from "react";
import styles from "./CardBarbeariaEncontrada.module.css"
import foto from "../../utils/assets/imagem-barbearia.jpg"

export function CardBarbeariaEncontrada() {
    return (
        <>
            <div className={styles.conteudoCardBarbeariaEncontrada}>

                <div className={styles.fotoBarbearia}>
            
                    <img src={foto} alt="" />

                </div>

                <div className={styles.informacoesBarbearia}>
                    <div className={styles.nomeDistancia}>
                        <span>Dom Bigode</span>
                        <span>1,4 km</span>
                    </div>

                    <div className={styles.endereco}>
                        <span>Rua Flores de Cinzas, 1988 - SP</span>
                    </div>

                    <div className={styles.botaoVisualizarPerfil}>
                        <button>Visualizar perfil</button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default CardBarbeariaEncontrada;