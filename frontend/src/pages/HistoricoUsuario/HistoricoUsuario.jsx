import React from "react";
import styles from "./HistoricoUsuario.module.css";
import { Button, TextField, ThemeProvider } from '@mui/material'
import NavbarCliente from "../../components/NavbarCliente/NavbarCliente";
import HeaderUsuario from "../../components/HeaderUsuario/HeaderUsuario";
import BoxBarbeariaHistorico from "../../components/BoxBarbeariaHistorico/BoxBarbeariaHistorico"
import { theme } from '../../theme'

export function HistoricoUsuario() {

    return (
        <ThemeProvider theme={theme}>
            <div className="Header">

                <HeaderUsuario />

                <NavbarCliente />

                <BoxBarbeariaHistorico />

            </div>

        </ThemeProvider >
    )
}
export default HistoricoUsuario;
