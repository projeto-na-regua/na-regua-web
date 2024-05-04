import React, { useState } from 'react';
import styles from "./Perfil.module.css";
import { AgendamentoContent, CortesContent, HistoricoContent } from './ContentComponents';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import NavbarCliente from '../../components/NavbarCliente/NavbarCliente';

function NavBar({ setActiveTab }) {
  return (
    <div className="nav-bar">
      <button className={styles["botao-nav"]} onClick={() => setActiveTab('agendamentos')}>Meus agendamentos</button>
      <button className={styles["botao-nav"]} onClick={() => setActiveTab('cortes')}>Meus cortes</button>
      <button className={styles["botao-nav"]} onClick={() => setActiveTab('historico')}>Histórico</button>
    </div>
  );
}

function Perfil() {
  const [activeTab, setActiveTab] = useState('agendamentos');

  const getActiveTabContent = () => {
    switch (activeTab) {
      case 'historico':
        return <HistoricoContent />;
      case 'cortes':
        return <CortesContent />;
      default:
        return <AgendamentoContent />;
    }
  };

  return (
    <div>
      <div>
        <HeaderUsuario />
      </div>
      <div>
        <NavbarCliente setActiveTab={setActiveTab} />
        <div className="content-area">
          <div className={styles["content-animation"]} style={{transform: activeTab === 'cortes' ? 'translateX(-100%)' : 'none'}}>
            {getActiveTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;