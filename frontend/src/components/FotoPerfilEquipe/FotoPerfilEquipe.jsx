import React from "react";
import styles from "./FotoPerfilEquipe.module.css";
import fotoPadrao from "../../utils/assets/barbeiroPerfil.jpg";
import { useState } from "react";

const FotoPerfilEquipe = ({ valor, nome, foto, onSelect, selecionado, cursorPointer }) => {
    const imageUrl = foto ? foto : fotoPadrao;
  
    const formatarNome = (nomeCompleto) => {
        const nomes = nomeCompleto.split(' ');
        return nomes.length > 1 ? `${nomes[0]} ${nomes[1]}` : nomes[0];
    };
  
    const handleClick = () => {
        onSelect(); // Chama a função onSelect para atualizar o estado no componente pai
    };
  
    return (
        <div
            className={`${styles.conteudoFotoPerfilEquipe} ${cursorPointer ? styles.cursorPointer : ''}`}
            onClick={handleClick} // Adiciona o handleClick no evento onClick do componente
        >
            <div className={`${styles.foto} ${selecionado ? styles.clicado : ''}`}>
                <img src={imageUrl} alt="" />
            </div>
  
            <div className={styles.nomeBarbeiro}>
                <span>{formatarNome(nome)}</span>
            </div>
        </div>
    );
}

export default FotoPerfilEquipe;
