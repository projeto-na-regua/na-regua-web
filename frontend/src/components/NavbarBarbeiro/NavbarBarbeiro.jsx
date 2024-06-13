import styles from './NavbarBarbeiro.module.css'
import React from 'react';
import { useNavigate } from "react-router-dom";

function NavbarBarbeiro(){

    const navigate = useNavigate();

    function trocarTela(n){
        switch(n) {
            case 1:
              navigate("/minha-agenda")
              break;
            case 2:
              navigate("/dashboard")
              break;
            case 3:
              navigate("/servicos")
              break;
            case 4:
              navigate("/fluxo-de-caixa")
              break;
            case 5:
              navigate("/funcionarios")
              break;
            case 6:
              navigate("/personalizacao")
              break;
            default:
              navigate("/*")
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
                <div className={styles.opcoesTelas} onClick={() => trocarTela(5)}><span>Funcionários</span></div>
                <div className={styles.opcoesTelas} onClick={() => trocarTela(6)}><span>Personalização</span></div>
            </div>
        </div>
    );
}

export default NavbarBarbeiro;
