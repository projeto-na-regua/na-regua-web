import { ThemeProvider } from '@emotion/react'
import { theme } from '../../theme.js'
import Header from '../../components/Header/Header.jsx'
import { Button } from '@mui/material'
import logo from '../../utils/assets/logo-scale0.svg'
import GrupoDeInputs from '../../components/GrupoDeInput/GrupoDeInputs.jsx'
import image from '../../utils/assets/Group 221.svg'
import MultiActionAreaCard from '../../components/CardComImagem/CardComImagem.jsx'
import imageTeste from '../../utils/assets/Design sem nome.png'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx'

function validar(navigate) {
  const token = JSON.parse(sessionStorage.getItem('user'));

  if (token) {
    return <div>salve chupetinhas</div>;
  } else {
    return (
      <div>
        <Button variant='contained' onClick={() => navigate('/login')}>Entrar</Button>
      </div>
    );
}
}

function Home() {
  const navigate = useNavigate()

  const [isAuth, setIsAuth] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(!token) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
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
<path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              Usuário
              <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path fill="#ffffff" fill-rule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
</svg>
              <MenuLateralUsuario open={open}/>
              </Button>
            : <Button onClick={() => navigate('/login')} variant='contained'>Entrar</Button>}
        </div>}
      />

      <div style={{
        display: 'flex',
        height: '60vh',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 32
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 600,
        }}>
          <h1 style={{
            color: '#E3A74F',
            textAlign: 'center'
          }}>
            Barbearias à sua volta
          </h1>

          <span style={{
            color: '#082031',
            textAlign: 'center'
          }}>
            Estilo e conveniência ao alcance de suas mãos!
          </span>
        </div>

        <GrupoDeInputs />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '90vh'
      }}>
        <img src={image} alt='imagem-de-fundo' style={{ width: '100%' }} />
      </div>

      <div style={{
        display: 'flex',
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32
      }}>
        <MultiActionAreaCard />
        <MultiActionAreaCard />
        <MultiActionAreaCard />
      </div>

      <div style={{
        backgroundColor: '#082031',
        height: '60vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 600
        }}>
          <h1 style={{
            color: 'white'
          }}>
            <span style={{ color: '#E3A74F'}}>Agende com Facilidade:</span> Barbearias Modernas ao Seu Alcance
          </h1>

          <span style={{
            color: 'white'
          }}>Reserve seu horário com facilidade e agilidade através da nossa plataforma intuitiva para uma experiência de barbearia sem estresse!</span>
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
    </ThemeProvider>
  )
}

export default Home
