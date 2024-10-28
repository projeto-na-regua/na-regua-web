import { Box, Typography, ThemeProvider, Button } from '@mui/material'
import { theme } from '../../theme'
import { FourthStep } from '../../components/BoxStepperCadastro/Empreendedor/FourthStep/FourthStep'
import { useNavigate } from 'react-router-dom'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import logo from '../../utils/assets/logo-scale0.svg'
import imagemCadastro from '../../utils/assets/imagem-cadastro.jpg'

export function CadastroBarbearia() {
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}>
        <div
          style={{
            width: '40%',
            height: '90vh',
            backgroundImage: `url(${imagemCadastro})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: 16,
            padding: 16,
            marginLeft: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'fixed'
          }}>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <img alt='logo' src={logo} style={{ width: 100 }} />
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#ffffff3e',
              borderRadius: 200,
              cursor: 'pointer',
              height: 30,
              padding: '8px 16px',
              gap: 12
            }} onClick={() => navigate('/')}>
              <Typography variant='h4' style={{ color: '#fff', fontSize: 16 }}>
                Voltar para o site
              </Typography>
              <PublicOutlinedIcon style={{ color: '#fff' }} />
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginBottom: 128
          }}>
            <Typography variant='h4' style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
              Seja bem-vindo!
            </Typography>
            <Typography variant='body1' style={{ color: '#fff', fontSize: 16 }}>
              Administre sua barbearia ou encontre os melhores profissionais para o seu estilo.
            </Typography>
          </div>
        </div>

        <div style={{
          width: '50%',
          height: '100vh',
          marginLeft: '45%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 128
        }}>
          <FourthStep />
        </div>
      </div>
    </ThemeProvider>
  )
}
