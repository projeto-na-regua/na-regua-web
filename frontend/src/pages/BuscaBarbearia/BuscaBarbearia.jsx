import React from "react";
import styles from './BuscaBarbearia.module.css';
import { Footer } from "../../components/Footer/Footer";
import HeaderEntrar from "../../components/HeaderEntrar/HeaderEntrar";
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';

export function BuscaBarbearia() {
    

    return (
        <ThemeProvider theme={theme}>
            <HeaderEntrar />
            <NavbarBarbeiro />
            

        <Footer />
        </ThemeProvider>
    );
}

export default BuscaBarbearia;