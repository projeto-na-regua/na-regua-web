import React, { useState } from "react";
import styles from "./LinhaServicos.module.css";

export function LinhaServicos({index, selectedIndex, onSelect}) {
    const isSelected = index === selectedIndex;


    const handleClick = () => {
        onSelect(index);
    };

    return (
        <div className={`${styles.conteudoLinhaServicos} ${isSelected ? styles.selected : ''}`} onClick={handleClick}>
            <div className={styles.nomeDescricaoServico}>
                <div className={`${styles.nomeServico} ${isSelected ? styles.selected : ''}`} onClick={handleClick} >
                    <span>Corte + Escova</span>
                </div>

                <div className={`${styles.descricaoServico} ${isSelected ? styles.selected : ''}`} onClick={handleClick}>
                    <span>Inclui apenas corte.</span>
                </div>
            </div>

            <div className={`${styles.linha} ${isSelected ? styles.selected : ''}`} onClick={handleClick}></div>

            <div className={`${styles.valorServico} ${isSelected ? styles.selected : ''}`} onClick={handleClick}>
                <span>R$</span>
                <span>35,90</span>
            </div>
        </div>
    );
}

export default LinhaServicos;
