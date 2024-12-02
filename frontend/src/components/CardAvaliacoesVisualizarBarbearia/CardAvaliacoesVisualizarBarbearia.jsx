import React from "react";
import styles from "./CardAvaliacoesVisualizarBarbearia.module.css"
import EstrelasAvaliacao from "../EstrelasAvaliacao/EstrelasAvaliacao";

const CardAvaliacoesVisualizarBarbearia = ({ nomeCliente,
    dataAvaliacao,
    comentario,
    estrelas,
    imgPerfil }) => {
    return (
        <>
            <div className={styles.conteudoCardAvaliacoesVisualizarBarbearia}>
                <div className={styles.informacoesCard}>

                    <div className={styles.nomeData}>
                        <div className={styles.nome}>
                            <span>{nomeCliente}</span>
                        </div>

                        <div className={styles.data}>
                            <span>{dataAvaliacao}</span>
                        </div>
                    </div>

                    <div className={styles.linhaConteudo}>
                        <div className={styles.conteudoAvaliacao}>
                            <span>{comentario}</span>
                        </div>

                        <div className={styles.valorAvaliacao}>
                            <EstrelasAvaliacao value={estrelas}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardAvaliacoesVisualizarBarbearia;
