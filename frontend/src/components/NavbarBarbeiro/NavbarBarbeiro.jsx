import styles from './NavbarBarbeiro.module.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function NavbarBarbeiro(){

    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(1);

    function trocarTela(n){
      setActiveButton(n);
        switch(n) {
            case 1:
              navigate("/minha-agenda")
              break;
            case 2:
              //navigate("/dashboard")
              break;
            case 3:
              //navigate("/servicos")
              break;
            case 4:
              //navigate("/fluxo-de-caixa")
              break;
            case 5:
              navigate("/funcionarios")
              break;
            case 6:
              navigate("/personalizar-barbearia")
              break;
            default:
              navigate("/*")
              break;
          }
    }

    return (
        <div className={styles.hoverTrocaTelas}>
            <div className={styles.utilHoverTrocaTelas}>
                <div className={`${styles.opcoesTelas} ${activeButton === 1 ? styles.active : ''}`} onClick={() => trocarTela(1)}><span>Agenda</span></div>
                <div className={`${styles.opcoesTelas} ${activeButton === 2 ? styles.active : ''}`} onClick={() => trocarTela(2)}><span>Dashboard</span></div>
                <div className={`${styles.opcoesTelas} ${activeButton === 3 ? styles.active : ''}`} onClick={() => trocarTela(3)}><span>Serviços</span></div>
                <div className={`${styles.opcoesTelas} ${activeButton === 4 ? styles.active : ''}`} onClick={() => trocarTela(4)}><span>Fluxo de Caixa</span></div>
                <div className={`${styles.opcoesTelas} ${activeButton === 5 ? styles.active : ''}`} onClick={() => trocarTela(5)}><span>Funcionarios</span></div>
                <div className={`${styles.opcoesTelas} ${activeButton === 6 ? styles.active : ''}`} onClick={() => trocarTela(6)}><span>Personalização</span></div>
            </div>
        </div>
    );
}

export default NavbarBarbeiro;
