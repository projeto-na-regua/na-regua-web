import { ThemeProvider } from '@emotion/react'
import { theme } from '../../theme.js'
import Header from '../../components/Header/Header.jsx'
import { Button, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import logo from '../../utils/assets/logo-scale0.svg'
import GrupoDeInputs from '../../components/GrupoDeInput/GrupoDeInputs.jsx'
import mockup from '../../utils/assets/mockup.png'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx'
import imageHome from '../../utils/assets/imagem-barbeiro-home.jpg'
import { Footer } from '../../components/Footer/Footer.jsx'
import { Logo } from '../../components/Logo/Logo.jsx'
import api from '../../api.js'

function Home() {
  const navigate = useNavigate()
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const [isAuth, setIsAuth] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [open, setOpen] = useState(false)
  const [barbearias, setBarbearias] = useState([])

  const top3Barbearias = async () => {
    try {
      const response = await api.get('/barbearias/top-3-barbarias-avaliacoes')
      console.log(response.data)
      setBarbearias(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!token) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [token])

  useEffect(() => {
    top3Barbearias()
  }, [])

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
                  <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {userInfo ? userInfo.nome.split(" ")[0] : 'Usuário'}
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
        display: 'flex',
        gap: 16,
        position: 'relative',
        flexDirection: 'column',
        marginTop: 64
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 16
        }}>
          <Typography variant='h1' style={{ color: '#082031', textAlign: 'center', marginRight: 80, marginLeft: 32 }}>
            Melhores avaliações
          </Typography>

          <Typography variant='h6' style={{ color: '#082031', textAlign: 'center', marginRight: 80, marginLeft: 32 }}>
            Veja as barbearias mais bem avaliadas do <span style={{ color: '#E3A74F' }}>cenário</span>!
          </Typography>
        </div>

        <ImageList sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {barbearias.map((item) => (
            <ImageListItem key={item.imgPerfilBarbearia}>
              <img
                src={item.imgPerfilBarbearia}
                alt='barbearia'
                style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 24 }}
              />
              <ImageListItemBar
                title={item.nomeBarbearia}
                position="below"
                style={{
                  textAlign: 'center',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
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
