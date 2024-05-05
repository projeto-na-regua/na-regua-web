import { ThemeProvider } from '@emotion/react'
import { theme } from '../../theme.js'
import Header from '../../components/Header/Header.jsx'
import { Button, collapseClasses } from '@mui/material'
import logo from '../../utils/assets/logo-scale0.svg'
import GrupoDeInputs from '../../components/GrupoDeInput/GrupoDeInputs.jsx'
import image from '../../utils/assets/Group 221.svg'
import MultiActionAreaCard from '../../components/CardComImagem/CardComImagem.jsx'
import imageTeste from '../../utils/assets/Design sem nome.png'
import { useNavigate } from 'react-router-dom'
import { Teste } from '../../components/Teste.jsx'
import { ModalPersonalizado } from '../../components/ModalPaiEditarFuncionario/ModalPersonalizado.jsx'
import { useState } from 'react'
import ModalEditarFuncionario3 from '../../components/ModalEditarFuncionario1/ModalEditarFuncionario1.jsx'
import ModalEditarFuncionario4 from '../../components/ModalEditarFuncionario2/ModalEditarFuncionario2.jsx'
import ModalEditarFuncionario5 from '../../components/ModalEditarFuncionario3/ModalEditarFuncionario3.jsx'

function Home() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      {/* <Header
        esquerda={<img src={logo} alt='logo-na-regua' style={{ width: '70%' }} />}

        direita={<div><Button variant='contained' onClick={ () => navigate('/login')}>Entrar</Button></div>}
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
          <h1>
          Agende com Facilidade: Barbearias Modernas ao Seu Alcance
          </h1>

          <span>Reserve seu horário com facilidade e agilidade através da nossa plataforma intuitiva para uma experiência de barbearia sem estresse!</span>
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
          }}/>
        </div>

      </div> */}
      <Teste />
      <button onClick={() => setOpen(true)}>abrir</button>
      <ModalPersonalizado open={open} setOpen={setOpen}>
        <ModalEditarFuncionario5/>
      </ModalPersonalizado>

    </ThemeProvider>
  );
}

export default Home;
