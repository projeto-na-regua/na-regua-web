import React from 'react';
import styles from './CardHorarioDisponivel.module.css';

const CardHorarioDisponivel = ({ horario, onSelect }) => {
    return (

        <div className={styles.conteudoCardHorariosDisponiveis} onClick={onSelect}>
            <div className={styles.horario}>
                <span>{horario}</span>
            </div>
        </div>
    );
};

export default CardHorarioDisponivel;