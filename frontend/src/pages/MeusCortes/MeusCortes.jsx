// CardPage.js
import React from 'react';
import './MeusCortes.module.css';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import NavbarCliente from '../../components/NavbarCliente/NavbarCliente'
import CardMeusCortes from '../../components/CardMeusCortes/CardMeusCortes';
import { Footer } from '../../components/Footer/Footer';

const MeusCortesPage = () => {

  return (
    <div>
      <HeaderUsuario />
      <NavbarCliente />
      <CardMeusCortes />
      <Footer />

    </div>
  );
};

export default MeusCortesPage;