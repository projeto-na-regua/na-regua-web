import styles from './NavbarCliente.module.css' 
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function NavbarCliente(){

    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(1);
    
    function trocarTela(n){
        setActiveButton(n);
        switch(n) {
            case 1:
              navigate('/minha-agenda-cliente');
              break;
            case 2:
              navigate('/meus-cortes');
              break;
            case 3:
              navigate('/historico');
              break;
            default:
              navigate('/minha-agenda-cliente');
        }
    }

    return (
        <div className={styles.hoverTrocaTelas}>
            <div className={styles.utilHoverTrocaTelas}>
                <div className={`${styles.opcoesTelas} ${activeButton === 1 ? styles.active : ''}`} onClick={() => trocarTela(1)}><span>Meus agendamentos</span></div>
                <div className={`${styles.opcoesTelas} ${activeButton === 2 ? styles.active : ''}`} onClick={() => trocarTela(2)}><span>Meus cortes</span></div>
                <div className={`${styles.opcoesTelas} ${activeButton === 3 ? styles.active : ''}`} onClick={() => trocarTela(3)}><span>Histórico</span></div>
            </div>
        </div>
    );
}

export default NavbarCliente;
