import styles from './NavbarCliente.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavbarCliente() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/minha-agenda-cliente':
        setActiveButton(1);
        break;
      case '/meus-cortes':
        setActiveButton(2);
        break;
      case '/historico':
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
          onClick={() => handleNavigation(1, '/minha-agenda-cliente')}
        >
          <span>Meus agendamentos</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 2 ? styles.active : ''}`}
          onClick={() => handleNavigation(2, '/meus-cortes')}
        >
          <span>Meus cortes</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 3 ? styles.active : ''}`}
          onClick={() => handleNavigation(3, '/historico')}
        >
          <span>Histórico</span>
        </div>
      </div>
    </div>
  );
}

export default NavbarCliente;