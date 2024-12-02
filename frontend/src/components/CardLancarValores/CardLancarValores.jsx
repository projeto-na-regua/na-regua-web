import React from 'react'
import styles from './CardLancarValores.module.css'

function CardLancarValores({ setMostrarModal, setScrollHabilitado }) {
    const handleIconClick = () => {
        setMostrarModal(true) // Exibir o modal ao clicar no ícone
        setScrollHabilitado(false) // Desabilitar o scroll
    }

    return (
        <div className={styles.cardTodo} onClick={handleIconClick}>
            <div className={styles.conteudoCard}>
                <div className={styles.divIcon}>
                    <div className={styles.icone}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32 5.05263V8.42105H26.9474V13.4737H23.5789V8.42105H18.5263V5.05263H23.5789V0H26.9474V5.05263H32ZM17.6842 16.8421C19.0787 16.8421 20.2105 15.7103 20.2105 14.3158C20.2105 12.9213 19.0787 11.7895 17.6842 11.7895C16.2897 11.7895 15.1579 12.9213 15.1579 14.3158C15.1579 15.7103 16.2897 16.8421 17.6842 16.8421ZM23.5789 22.2888L22.7149 21.3288C21.3777 19.8383 19.0434 19.8383 17.7027 21.3288L16.5996 22.5583L8.42105 13.4737L3.36842 19.0872V8.42105H15.1579V5.05263H3.36842C1.50737 5.05263 0 6.56 0 8.42105V28.6316C0 30.4926 1.50737 32 3.36842 32H23.5789C25.44 32 26.9474 30.4926 26.9474 28.6316V16.8421H23.5789V22.2888Z" fill="#E3A74F" />
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
    )
}

export default CardLancarValores
