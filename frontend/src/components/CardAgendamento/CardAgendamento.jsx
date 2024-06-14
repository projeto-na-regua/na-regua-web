import React from "react";
import styles from "./CardAgendamento.module.css";

const Agendamento = ({
    dataHora, barbearia, concluido, endereco, preco,
}) => {
    return (
        <div className={styles["card-agendamento"]}>
            <div className={styles["container-data-barbearia"]}>
                <div className={styles["data-hora"]}>
                    <p><span>Data:</span> {dataHora || "N/A"}</p>
                </div>
                <div className={styles["nome-barbearia"]}>
                    <p>{barbearia || "N/A"}</p>
                </div>
            </div>
            <div className={styles["info-agendamento"]}>
                <div className={styles["info-item"]}>
                    <span>Status</span> <span className={styles["line"]}></span> <span>{concluido || "N/A"}</span>
                </div>
                <div className={styles["info-item"]}>
                    <span>Local</span> <span className={styles["line"]}></span> <span>{endereco || "N/A"}</span>
                </div>
                <div className={styles["info-item"]}>
                    <span>Valor</span> <span className={styles["line"]}></span> <span>{preco || "N/A"}</span>
                </div>
            </div>
            <div className={styles["container-botao"]}>
                <button className={styles["botao"]}>Mais informações</button>
            </div>
        </div>
    );
};

export default Agendamento;
