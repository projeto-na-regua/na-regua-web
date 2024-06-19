import React from "react";
import styles from "./CardAvaliacoesVisualizarBarbearia.module.css"
import foto from "../../utils/assets/barbeiroPerfil.jpg"
import EstrelasAvaliacao from "../EstrelasAvaliacao/EstrelasAvaliacao";

const CardAvaliacoesVisualizarBarbearia = ({ nomeCliente,
    dataAvaliacao,
    comentario,
    estrelas }) => {
    return (
        <>
            <div className={styles.conteudoCardAvaliacoesVisualizarBarbearia}>
                <div className={styles.foto}>
                    <img src={foto} alt="" />
                </div>

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
                        <div className={styles.linha}></div>
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