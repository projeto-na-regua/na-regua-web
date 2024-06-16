import React from "react";
import styles from "./LinhaServicos.module.css";

export function LinhaServicos({ nomeServico, descricaoServico, valorServico, index, selectedIndex, onSelect }) {
    const isSelected = index === selectedIndex;

    const handleClick = () => {
        onSelect(index);
    };

    // Função para formatar o valor para o formato brasileiro (R$ X.XXX,XX)
    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div className={`${styles.conteudoLinhaServicos} ${isSelected ? styles.selected : ''}`} onClick={handleClick}>
            <div className={styles.nomeDescricaoServico}>
                <div className={`${styles.nomeServico} ${isSelected ? styles.selected : ''}`}>
                    <span>{nomeServico}</span>
                </div>
                <div className={`${styles.descricaoServico} ${isSelected ? styles.selected : ''}`}>
                    <span>{descricaoServico}</span>
                </div>
            </div>
            <div className={`${styles.linha} ${isSelected ? styles.selected : ''}`}></div>
            <div className={`${styles.valorServico} ${isSelected ? styles.selected : ''}`}>
                <span>R$</span>
                <span>{formatarValor(valorServico)}</span>
            </div>
        </div>
    );
}

export default LinhaServicos;
