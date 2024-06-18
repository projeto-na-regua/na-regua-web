import React from 'react'
import styles from './LinhaReserva.module.css'

const LinhaReserva = ({
    nomeCliente, nomeServico, data, hora, nomeFuncionario
}) => {
    return (
        <>
            <div className={styles.linhaReserva}>
                <div className={styles.containerLinhaReserva}>
                    <div className={styles.conteudoLinhaReserva}>

                        <div className={styles.nomeCliente}>
                            <span style={{
                                color: "#082031"
                            }}>Cliente</span>
                            <span>{nomeCliente}</span>
                        </div>

                        <div className={styles.servicoEscolhido}>
                            <span style={{
                                color: "#082031"
                            }}>Serviço</span>
                            <span>{nomeServico}</span>
                        </div>

                        <div className={styles.horario}>
                            <div className={styles.linhaDataHorario}>
                                <span style={{
                                color: "#082031"
                            }}>Data:</span>
                                <span>{data}</span>
                            </div>

                            <div className={styles.linhaDataHorario}>
                                <span style={{
                                color: "#082031"
                            }}>Hora:</span>
                                <span>{hora}</span>
                            </div>
                        </div>

                        <div className={styles.statusReserva}>
                            <div className={styles.spanStatusReserva}>
                                <span style={{
                                color: "#082031"
                            }}>Confirmado</span>
                            </div>
                        </div>

                        <div className={styles.nomeBarbeiro}>
                            <span style={{
                                color: "#082031"
                            }}>Barbeiro</span>
                            <span>{nomeFuncionario}</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default LinhaReserva;