import styles from './NavbarBarbeiro.module.css' 
import React from 'react';
import { useNavigate } from "react-router-dom";

function NavbarBarbeiro(){

    const navigate = useNavigate();
    
    function trocarTela(n){
        switch(n) {
            case 1:
              navigate("/meus-cortes")
              break;
            case 2:
              // Código para caso 2
              break;
            case 3:
              // Código para caso 3
              break;
            case 4:
              // Código para caso 4
              break;
            case 5:
              // Código para caso 5
              break;
            case 6:
              // Código para caso 6
              break;
          }
    }

    return (
        <div className={styles.hoverTrocaTelas}>
            <div className={styles.utilHoverTrocaTelas}>
                <div className={styles.opcoesTelas} onClick={() => trocarTela(1)}><span>Agenda</span></div>
                <div className={styles.opcoesTelas} onClick={() => trocarTela(2)}><span>Dashboard</span></div>
                <div className={styles.opcoesTelas} onClick={() => trocarTela(3)}><span>Serviços</span></div>
                <div className={styles.opcoesTelas} onClick={() => trocarTela(4)}><span>Fluxo de Caixa</span></div>
                <div className={styles.opcoesTelas} onClick={() => trocarTela(5)}><span>Funcionarios</span></div>
                <div className={styles.opcoesTelas} onClick={() => trocarTela(6)}><span>Personalização</span></div>
            </div>
        </div>
    );
}

export default NavbarBarbeiro;
