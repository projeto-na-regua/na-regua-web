import { ThemeProvider } from '@emotion/react'
import { theme } from '../../theme.js'
import Header from '../../components/Header/Header.jsx'
import { Button } from '@mui/material'
import logo from '../../utils/assets/logo-scale0.svg'
import MenuHeader from '../../components/Menu/Menu.jsx'
import GrupoDeInputs from '../../components/GrupoDeInput/GrupoDeInputs.jsx'
import image from '../../utils/assets/Group 221.svg'
import MultiActionAreaCard from '../../components/CardComImagem/CardComImagem.jsx'

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Header
        esquerda={<img src={logo} alt='logo-na-regua' style={{ width: '70%' }} />}
        meio={<div style={{ display: 'flex' }}>
          <Button variant='text' style={{ color: 'white' }}>Home</Button>
          <MenuHeader />
        </div>}
        direita={<div><Button variant='contained'>Entrar</Button></div>}
      />

      <div style={{
        display: 'flex',
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}>
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
        backgroundColor: '#2a86c8',
        height: '50vh'
      }}>
        <MultiActionAreaCard />
      </div>
    </ThemeProvider>
  );
}

export default Home;
