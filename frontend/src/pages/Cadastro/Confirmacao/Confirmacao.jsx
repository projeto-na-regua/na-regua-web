import { Button, ThemeProvider } from '@mui/material'
import { theme } from '../../../theme.js'

function Confirmacao() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        gap: 16
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: 24, color: '#082031', margin: 0 }}>Perfeito!</h1>

          <h2 style={{ fontSize: 16, fontWeight: 500, color: '#082031' }}>
          Seu cadastro foi concluído com sucesso. Estamos animados para começar essa jornada juntos!
          </h2>
        </div>

        <Button>Acessar</Button>
      </div>
    </ThemeProvider>
  )
}

export default Confirmacao
