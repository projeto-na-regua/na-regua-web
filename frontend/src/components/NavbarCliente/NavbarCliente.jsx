import styles from './NavbarCliente.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavbarCliente() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/perfil/meus-agendamentos':
        setActiveButton(1);
        break;
      case '/perfil/meus-cortes':
        setActiveButton(2);
        break;
      case '/perfil/historico':
        setActiveButton(3);
        break;
      default:
        setActiveButton(0);
        break;
    }
  }, [location.pathname]);

  const handleNavigation = (n, path) => {
    setActiveButton(n);
    navigate(path);
  };

  return (
    <div className={styles.hoverTrocaTelas}>
      <div className={styles.utilHoverTrocaTelas}>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 1 ? styles.active : ''}`}
          onClick={() => handleNavigation(1, '/perfil/meus-agendamentos')}
        >
          <span>Meus agendamentos</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 3 ? styles.active : ''}`}
          onClick={() => handleNavigation(3, '/perfil/historico')}
        >
          <span>Histórico</span>
        </div>
      </div>
    </div>
  );
}

export default NavbarCliente;
