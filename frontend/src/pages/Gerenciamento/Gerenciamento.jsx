import { theme } from '../../theme'
import { Sidebar } from '../../components/Sidebar'
import { HeaderUsuario } from '../../components/Header'
import { ThemeProvider } from '@emotion/react'
import { Typography } from '@mui/material'
import DataHora from '../DataHora/DataHora'

function Gerenciamento() {

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Sidebar />

        <div style={{
          width: '85vw',
          marginLeft: '15vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <HeaderUsuario title='Gerenciamento' />

          <div>
            <Typography variant='h7' style={{ color: '#082031', marginLeft: 16 }}>Disponibilidade de Horário</Typography>

            <DataHora />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Gerenciamento
