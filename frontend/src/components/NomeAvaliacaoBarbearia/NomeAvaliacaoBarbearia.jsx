import React, { useState } from "react";
import styles from "./NomeAvaliacaoBarbearia.module.css"
import EstrelasAvaliacao from "../EstrelasAvaliacao/EstrelasAvaliacao.jsx"

export function NomeAvaliacaoBarbearia() {
    const [rating, setRating] = useState(2);

    return (
        <>
            <div className={styles.conteudoNomeAvaliacaoBarbearia}>
                <div className={styles.nomeEstrelasBarbearia}>
                    <div className={styles.nomeBarbearia}>
                        <span>Dom Bigode</span>
                    </div>
                    <div className={styles.estrelasHorarioBarbearia}>
                        <div className={styles.estrelasBarbearia}>
                            <EstrelasAvaliacao value={2.5}/>
                        </div>
                        <div className={styles.ponto}>
                            <span>•</span>
                        </div>
                        <div className={styles.horarioBarbearia}>
                            <span>Aberto até as 19h</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default NomeAvaliacaoBarbearia;
