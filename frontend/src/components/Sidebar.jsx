import { Button, ThemeProvider, Typography } from '@mui/material'
import { theme } from '../theme.js'
import { OptionsSidebar } from './OptionsSidebar/OptionsSidebar.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import calendario from '../utils/assets/calendario.svg'
import galeria from '../utils/assets/galeria.svg'
import dashboard from '../utils/assets/dashboard.svg'
import servicos from '../utils/assets/servicos.svg'
import funcionarios from '../utils/assets/funcionarios.svg'
import chart from '../utils/assets/chart.svg'
import config from '../utils/assets/config.svg'
import iconVoltar from '../utils/assets/icon voltar branco.svg'

export function Sidebar() {
  const [isAuth, setIsAuth] = useState(false)
  const barbeariaInfo = JSON.parse(sessionStorage.getItem('barbearia'))
  const navigate = useNavigate()

  useEffect(() => {
    const validarTipoUsuario = async () => {
      try {
        if (barbeariaInfo !== null) {
          setIsAuth(true)
        } else {
          setIsAuth(false)
        }
      } catch (error) {
        console.error('Erro ao validar o funcionário', error)
      }
    }

    validarTipoUsuario()
  }, [barbeariaInfo])

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundColor: '#082031',
        width: '15vw',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{
          width: '100%',
          gap: 8,
          marginTop: 32,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 16
        }}>
          <Typography variant='h7' style={{ color: 'white' }}>Perfil</Typography>

          <OptionsSidebar text='Agendamentos' icon={calendario} />

          <OptionsSidebar text='Galeria' icon={galeria} />

          {isAuth && (
            <div style={{
              marginTop: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              <Typography variant='h7' style={{ color: 'white' }}>{barbeariaInfo.nomeNegocio}</Typography>

              <OptionsSidebar text='Agenda' icon={calendario} />

              <OptionsSidebar text='Dashboard' icon={chart} />

              <OptionsSidebar text='Serviços' icon={servicos} />

              <OptionsSidebar text='Fluxo de Caixa' icon={dashboard} />

              <OptionsSidebar text='Funcionários' icon={funcionarios} />
            </div>
          )}

        </div>

        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginLeft: 16,
          marginBottom: 32
        }}>
          <Button
            variant='contained'
            onClick={() => navigate('/cadastro-barbearia')}
            style={{
              display: isAuth ? 'none' : 'flex',
              width: 180
            }}>Possui barbearia?</Button>

          <OptionsSidebar text='Voltar' icon={iconVoltar} />
          <OptionsSidebar text='Configurações' icon={config} />
        </div>
      </div>
    </ThemeProvider>
  )
}
