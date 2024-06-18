import React from "react"
import { ThemeProvider } from '@mui/material'
import NavbarCliente from "../../components/NavbarCliente/NavbarCliente";
import HeaderUsuario from "../../components/HeaderUsuario/HeaderUsuario";
import BoxBarbeariaHistorico from "../../components/BoxBarbeariaHistorico/BoxBarbeariaHistorico"
import { theme } from '../../theme'

export function HistoricoUsuario() {

    return (
        <ThemeProvider theme={theme}>
          
            <div className="Header">

                <HeaderUsuario />

                <div className="fullHeightBg">

                    <NavbarCliente />

                    <BoxBarbeariaHistorico style={{marginTop: 20}}/>
        
                </div>
            </div>

        </ThemeProvider >
    )
}
export default HistoricoUsuario;
