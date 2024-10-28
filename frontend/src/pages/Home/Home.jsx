import { ThemeProvider } from '@emotion/react'
import { theme } from '../../theme.js'
import Header from '../../components/Header/Header.jsx'
import { Button, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import logo from '../../utils/assets/logo-scale0.svg'
import GrupoDeInputs from '../../components/GrupoDeInput/GrupoDeInputs.jsx'
import mockup from '../../utils/assets/mockup.png'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import imageHome from '../../utils/assets/imagem-barbeiro-home.jpg'
import { Footer } from '../../components/Footer/Footer.jsx'
import { Logo } from '../../components/Logo/Logo.jsx'
import api from '../../api.js'
import AccountMenu from '../../components/AccountMenu/AccountMenu.jsx'

function Home() {
  const navigate = useNavigate()
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const [isAuth, setIsAuth] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [open, setOpen] = useState(false)
  const [barbearias, setBarbearias] = useState([])

  useEffect(() => {
    if (!token) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundImage: `url(${imageHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <Header
          esquerda={<img src={logo} alt='logo-na-regua' style={{ width: '70%' }} />}

          direita={<div>
            {isAuth
              ? <AccountMenu />
              : <Button onClick={() => navigate('/login')} variant='contained' style={{ width: 100 }}>Entrar</Button>}
          </div>}
        />

        <div style={{
          display: 'flex',
          height: '40vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 32,
          borderRadius: 24,
          padding: '32px 64px 32px 64px',
          marginTop: 120
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 800,
            gap: 16
          }}>
            <Typography variant='h1' style={{ color: '#F4F3EE', textAlign: 'center' }}>
              Fique <Logo /> com a gente!
            </Typography>

            <Typography variant='body1' style={{ color: '#F4F3EE', textAlign: 'center', fontSize: 16 }}>
              Estilo e conveniência ao alcance de suas mãos!
            </Typography>
          </div>

          <GrupoDeInputs />
        </div>
      </div>

      <div style={{
        backgroundColor: '#082031',
        height: '60vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 200,
        marginTop: 200
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 600,
          gap: 16
        }}>
          <Typography variant='h1' style={{ color: '#E3A74F' }}>
            <span style={{ color: '#fff' }}>Barbearia Moderna:</span> A Experiência que Você Merece
          </Typography>

          <Typography variant='h2' style={{ color: '#ffffff' }}>
            Agende seu horário com facilidade e agilidade através da nossa plataforma intuitiva para uma experiência de barbearia sem estresse!
          </Typography>
        </div>
        <div style={{
          width: 600,
          height: 600,
          backgroundColor: '#E3A74F',
          borderRadius: '50%',
          border: '25px solid white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img src={mockup} alt='homem-usando-aplicativo' style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover'
          }} />
        </div>
      </div>

      <div style={{
        padding: '32px 80px 32px 80px',
      }}>
        <div style={{
          backgroundColor: '#082031',
          borderRadius: 24,
          padding: '80px 80px 80px 80px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <Typography variant='h1' style={{ color: '#ffffff', fontWeight: 800 }}>
              Se interessou?
            </Typography>

            <Typography variant='body1' style={{ color: '#ffffff', fontSize: 16 }}>
              Inscreva-se e faça parte de uma comunidade que faz a diferença!
            </Typography>
          </div>

          <div style={{
            display: 'flex',
            gap: 32,
          }}>
            <Button variant='contained' onClick={() => navigate('/login')} style={{ width: 200 }}>Já possui uma conta?</Button>

            <Button variant='outlined' onClick={() => navigate('/cadastro')} style={{ width: 200 }}>Não possui? Faça seu cadastro</Button>
          </div>
        </div>
      </div>

      <Footer />
    </ThemeProvider>
  )
}

export default Home
