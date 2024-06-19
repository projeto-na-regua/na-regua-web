import React from "react";
import styles from "./CardBarbeariaEncontrada.module.css"
import { useNavigate } from "react-router-dom";

const CardBarbeariaEncontrada = ({
    nomeBarbearia, endereco, foto, valor }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/visualizar-barbearia?valor=${valor}`);
    };

    return (
        <>
            <div className={styles.conteudoCardBarbeariaEncontrada}>

                <div className={styles.fotoBarbearia}>

                    <img src={foto} alt="" />

                </div>

                <div className={styles.informacoesBarbearia}>
                    <div className={styles.nomeDistancia}>
                        <span>{nomeBarbearia}</span>
                    </div>

                    <div className={styles.endereco}>
                        <span>{endereco}</span>
                    </div>

                    <div className={styles.botaoVisualizarPerfil}>
                        <button onClick={handleClick}>Visualizar perfil</button>
                    </div>
                </div>

            </div>
        </>
    )
};
export default CardBarbeariaEncontrada;
