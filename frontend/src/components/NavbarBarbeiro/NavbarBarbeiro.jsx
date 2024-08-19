import styles from './NavbarBarbeiro.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavbarBarbeiro() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/agenda':
        setActiveButton(1);
        break;
      case '/dashboard':
        setActiveButton(2);
        break;
      case '/servicos':
        setActiveButton(3);
        break;
      case '/fluxo-de-caixa':
        setActiveButton(4);
        break;
      case '/funcionarios':
        setActiveButton(5);
        break;
      case '/personalizar-barbearia':
        setActiveButton(6);
        break;
      case '/data-hora':
        setActiveButton(7);
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
          onClick={() => handleNavigation(1, '/agenda')}
        >
          <span>Agenda</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 2 ? styles.active : ''}`}
          onClick={() => handleNavigation(2, '/dashboard')}
        >
          <span>Dashboard</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 3 ? styles.active : ''}`}
          onClick={() => handleNavigation(3, '/servicos')}
        >
          <span>Serviços</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 4 ? styles.active : ''}`}
          onClick={() => handleNavigation(4, '/fluxo-de-caixa')}
        >
          <span>Fluxo de Caixa</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 5 ? styles.active : ''}`}
          onClick={() => handleNavigation(5, '/funcionarios')}
        >
          <span>Funcionários</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 6 ? styles.active : ''}`}
          onClick={() => handleNavigation(6, '/personalizar-barbearia')}
        >
          <span>Personalização</span>
        </div>
        <div
          className={`${styles.opcoesTelas} ${activeButton === 7 ? styles.active : ''}`}
          onClick={() => handleNavigation(7, '/data-hora')}
        >
          <span>Horários</span>
        </div>
      </div>
    </div>
  );
}

export default NavbarBarbeiro;
