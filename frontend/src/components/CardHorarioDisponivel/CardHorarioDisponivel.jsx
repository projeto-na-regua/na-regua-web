import React from 'react';
import classNames from 'classnames';
import styles from './CardHorarioDisponivel.module.css';

const CardHorarioDisponivel = ({ horario, onSelect, isSelected }) => {
    const cardClass = classNames(
        styles.conteudoCardHorariosDisponiveis,
        { [styles.selecionado]: isSelected } // Adiciona a classe styles.selecionado se isSelected for true
    );

    return (
        <div className={cardClass} onClick={onSelect}>
            <div className={styles.horario}>
                <span>{horario}</span>
            </div>
        </div>
    );
};

export default CardHorarioDisponivel;
