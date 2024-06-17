import React, { useState, useEffect } from "react";
import styles from "./NomeAvaliacaoBarbearia.module.css";
import EstrelasAvaliacao from "../EstrelasAvaliacao/EstrelasAvaliacao.jsx";
import { format, parse, isAfter, isBefore } from "date-fns";

const NomeAvaliacaoBarbearia = ({ nome, avaliacao, horario }) => {
    const [rating, setRating] = useState(2);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 (Domingo) a 6 (Sábado)
        const todaySchedule = horario.find(day => day.id === dayOfWeek);

        console.log(todaySchedule)

        if (todaySchedule) {
            const { horaAbertura, horaFechamento } = todaySchedule;

            if (horaAbertura && horaFechamento) {
                const openTime = parse(horaAbertura, "HH:mm:ss", now);
                const closeTime = parse(horaFechamento, "HH:mm:ss", now);

                if (isBefore(now, openTime)) {
                    setStatus(`Abre às ${format(openTime, "HH:mm")}`);
                } else if (isAfter(now, closeTime)) {
                    setStatus("Fechado");
                } else {
                    setStatus(`Aberto até às ${format(closeTime, "HH:mm")}`);
                }
            } else {
                setStatus("Fechado");
            }
        } else {
            setStatus("Fechado");
        }
    }, [horario]);

    return (
        <>
            <div className={styles.conteudoNomeAvaliacaoBarbearia}>
                <div className={styles.nomeEstrelasBarbearia}>
                    <div className={styles.nomeBarbearia}>
                        <span>{nome}</span>
                    </div>
                    <div className={styles.estrelasHorarioBarbearia}>
                        <div className={styles.estrelasBarbearia}>
                            <EstrelasAvaliacao value={2.5} />
                        </div>
                        <div className={styles.ponto}>
                            <span>•</span>
                        </div>
                        <div className={styles.horarioBarbearia}>
                            <span>{status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NomeAvaliacaoBarbearia;
