import React from 'react';
import styles from './CardLancarValores.module.css';

function CardLancarValores({ setMostrarModal, setScrollHabilitado }) {
    const handleIconClick = () => {
        setMostrarModal(true); // Exibir o modal ao clicar no ícone
        setScrollHabilitado(false); // Desabilitar o scroll
    };

    return (
        <div className={styles.cardTodo}>
            <div className={styles.conteudoCard}>
                <div className={styles.divIcon}>
                    <div className={styles.icone} onClick={handleIconClick}>
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_2133_1144)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.5575 2.00649C13.5575 1.41475 13.0778 0.935059 12.486 0.935059C11.8943 0.935059 11.4146 1.41475 11.4146 2.00649V11.1521H2.20033C1.6086 11.1521 1.12891 11.6318 1.12891 12.2236C1.12891 12.8153 1.6086 13.295 2.20033 13.295H11.4146V22.5779C11.4146 23.1697 11.8943 23.6493 12.486 23.6493C13.0778 23.6493 13.5575 23.1697 13.5575 22.5779V13.295H22.7718C23.3635 13.295 23.8432 12.8153 23.8432 12.2236C23.8432 11.6318 23.3635 11.1521 22.7718 11.1521H13.5575V2.00649Z"
                                    fill="black"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_2133_1144">
                                    <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                        transform="translate(0.484375 0.291992)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className={styles.divInformacoes}>
                    <div className={styles.labelCard}>
                        <span>Lançar valores</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardLancarValores;
