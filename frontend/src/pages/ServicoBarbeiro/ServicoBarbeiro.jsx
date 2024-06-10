import React from 'react'
import styles from './ServicoBarbeiro.module.css'
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro'
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import Footer from '../../components/Footer/Footer'
import api from '../../api'
import { theme } from '../../theme'
import { Button, TextField, ThemeProvider } from '@mui/material'
import BoxServicos from '../../components/BoxServicos/BoxServicos'

export function ServicoBarbeiro() {
    return (
        <ThemeProvider theme={theme}>
            <div className="Header">
                <HeaderUsuario />
                <NavbarBarbeiro />
            </div>
            <div>
            </div>
            <div className={styles.conteudo}>
                <div className={styles.containerTodo}>
                    <div style={{
                display: 'flex',
                marginTop: 32,
                gap: 32,
                width: '100%',
                justifyContent: 'space-between',
              }}>
                <TextField
                  label="Buscar por funcionário"
                  style={{
                    width: '20vw'
                  }}
                />

                <Button
                  variant='contained'
                >
                  Cadastrar Serviço
                </Button>
              </div>

                    <div className={styles.container}>
                        <BoxServicos />
                    </div>
                </div>
            </div>


        </ThemeProvider>

    );
}

export default ServicoBarbeiro;