import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import styles from "./LinhaFiltroBuscarBarbearia.module.css"
import { TextField, ThemeProvider } from '@mui/material'
import { theme } from '../../theme'

export function LinhaFiltroBuscarBarbearia() {
    const [localizacao, setLocalizacao] = useState('')
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const localizacaoParam = params.get('localizacao')
        if (localizacaoParam) {
            setLocalizacao(localizacaoParam)
        }
    }, [location.search])

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.conteudoLinhaFiltroBuscarBarbearia}>
                <div className={styles.inputs}>
                    <TextField
                        label="Barbearias próximas de:"
                        variant="outlined"
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                        style={{
                            width: '25%'
                        }}
                    />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default LinhaFiltroBuscarBarbearia
