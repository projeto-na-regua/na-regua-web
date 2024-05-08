import { Button, ThemeProvider } from '@mui/material'
import { theme } from '../../../theme.js'
import api from '../../../api.js'
import { toast } from "react-toastify"

function ConfirmacaoBarbearia() {
  const userDataString = sessionStorage.getItem('user')
  const userData = JSON.parse(userDataString)

  const mandarDados = async () => {
    try {
      await api.post('/usuarios/cadastrar-barbearia', userData)

      toast.success('Cadastro realizado com sucesso!', { autoClose: 2000 })

    } catch (error) {
      toast.error('Erro ao cadastrar', { autoClose: 2000 })
      console.error('Erro ao cadastrar:', error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        gap: 16
      }}>
        <div style={{
          width: '35vw'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: 24, color: '#082031', margin: 0 }}>Perfeito!</h1>

            <h2 style={{ fontSize: 16, fontWeight: 500, color: '#082031', textAlign: 'center' }}>
            Seu cadastro foi concluído com sucesso. Estamos animados para começar essa jornada juntos!
            </h2>
          </div>

          <Button
            variant='contained'
            onClick={mandarDados}
            style={{
              height: 40,
              width: '100%'
            }}
            
            >Acessar</Button>
        </div>
        </div>
    </ThemeProvider>
  )
}

export default ConfirmacaoBarbearia
