import React from 'react'
import styles from './ServicoBarbeiro.module.css'
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro'
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import Footer from '../../components/Footer/Footer'
import api from '../../api'
import { theme } from '../../theme'
import { TextField, ThemeProvider } from '@mui/material'
import BoxServicos from '../../components/BoxServicos/BoxServicos'

export function ServicoBarbeiro() {
    return (
        <ThemeProvider theme={theme}>
            <div className="Header">
                <HeaderUsuario />
                <NavbarBarbeiro />
            </div>

            <div className={styles.conteudo}>
                <div className={styles.container}>
                    <BoxServicos />
                </div>
            </div>


        </ThemeProvider>

    );
}

export default ServicoBarbeiro;