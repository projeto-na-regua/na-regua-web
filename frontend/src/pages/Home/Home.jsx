import { ThemeProvider } from '@emotion/react'
import { theme } from '../../theme.js'
import Header from '../../components/Header/Header.jsx'
import { Button, Typography } from '@mui/material'
import logo from '../../utils/assets/logo-scale0.svg'
import GrupoDeInputs from '../../components/GrupoDeInput/GrupoDeInputs.jsx'
import MultiActionAreaCard from '../../components/CardComImagem/CardComImagem.jsx'
import imageTeste from '../../utils/assets/Design sem nome.png'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx'
import imageHome from '../../utils/assets/fotoHome.png'
import { Footer } from '../../components/Footer/Footer.jsx'

function Home() {
  const navigate = useNavigate()

  const [isAuth, setIsAuth] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [open, setOpen] = useState(false)

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
              ? <Button onClick={() => setOpen(!open)} variant='contained' style={{
                borderRadius: '10px',
                gap: 20,
                fontWeight: 600,
                fontSize: 20,
                backgroundColor: '#082031',
                color: '#fff',
                cursor: 'pointer'
              }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Usuário
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#ffffff" fill-rule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z" />
                </svg>
                <MenuLateralUsuario open={open} />
              </Button>
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
          backgroundColor: '#f4f3eee1',
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
            <Typography variant='h1' style={{ color: '#082031', textAlign: 'center' }}>
              <span style={{ color: '#E3A74F' }}>Barbearia Moderna:</span> A Experiência que Você Merece
            </Typography>

            <Typography variant='body1' style={{ color: '#082031', textAlign: 'center', fontSize: 16 }}>
              Agende seu horário com facilidade e agilidade através da nossa plataforma intuitiva para uma experiência de barbearia sem estresse!
            </Typography>
          </div>

          <GrupoDeInputs />
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        height: '70vh',
      }}>
        <Typography variant='h1' style={{ color: '#082031', fontWeight: 800 }}>
          Melhores avaliações
        </Typography>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32
        }}>
          <MultiActionAreaCard />
          <MultiActionAreaCard />
          <MultiActionAreaCard />
        </div>
      </div>

      <div style={{
        backgroundColor: '#082031',
        height: '60vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 128
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
          width: 500,
          height: 500,
          backgroundColor: '#E3A74F',
          borderRadius: '50%',
          border: '25px solid white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img src={imageTeste} alt='homem-usando-aplicativo' style={{
            width: '90%',
            height: '90%',
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
