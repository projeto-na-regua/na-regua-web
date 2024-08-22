import React from "react";
import styles from "./CardBarbeariaEncontrada.module.css"
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material'
import EstrelasAvaliacao from "../EstrelasAvaliacao/EstrelasAvaliacao";

const CardBarbeariaEncontrada = ({
    nomeBarbearia, endereco, foto, valor, avaliacao }) => {

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

                    {/*<EstrelasAvaliacao value={avaliacao}/>*/}

                    <div className={styles.nomeDistancia}>
                        <span>{nomeBarbearia}</span>
                    </div>

                    <div className={styles.endereco}>
                        <span>{endereco}</span>
                    </div>

                    <div className={styles.botaoVisualizarPerfil}>
                        <Button onClick={handleClick}>Visualizar perfil</Button>
                    </div>
                </div>

            </div>
        </>
    )
};
export default CardBarbeariaEncontrada;
