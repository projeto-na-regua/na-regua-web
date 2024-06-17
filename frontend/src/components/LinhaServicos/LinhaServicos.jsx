import React from "react";
import styles from "./LinhaServicos.module.css";
import { useNavigate } from "react-router-dom";

export function LinhaServicos({ valor, nomeServico, descricaoServico, valorServico, index, selectedIndex, onSelect }) {
    const isSelected = index === selectedIndex;
    const navigate = useNavigate();

    const handleClick = () => {
        onSelect(index);
    };

    const formatarValor = (valor) => {
        if (typeof valor !== 'number') {
            return 'N/A'; // ou algum valor padrão
        }

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
