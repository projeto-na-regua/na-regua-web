import { useState, useEffect } from 'react'
import { Stepper, Step, StepLabel, Button, Box, Typography, ThemeProvider } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { theme } from '../../theme'
import { height, styled, width } from '@mui/system'
import { FirstStep } from '../../components/BoxStepperCadastro/Cliente/FirstStep/FirstStep'
import { SecondStep } from '../../components/BoxStepperCadastro/Cliente/SecondStep/SecondStep'
import { ThirdStep } from '../../components/BoxStepperCadastro/Cliente/ThirdStep/ThirdStep'
import { FourthStep } from '../../components/BoxStepperCadastro/Empreendedor/FourthStep/FourthStep'
import finishImage from '../../utils/assets/FinishImage.svg'
import { useNavigate } from 'react-router-dom'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import logo from '../../utils/assets/logo-scale0.svg'
import imagemCadastro from '../../utils/assets/imagem-cadastro.jpg'
import api from '../../api'

const allSteps = {
  empreendedor: ['Escolher seu estilo', 'Informar dados pessoais', 'Informar endereço'],
  cliente: ['Escolher seu estilo', 'Informar dados pessoais', 'Informar endereço']
}

const CustomStepIcon = styled('div')(({ active, completed }) => ({
  backgroundColor: active || completed ? '#082031' : '#e0e0e0',
  color: '#fff',
  width: 30,
  height: 30,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  ...(completed && {
    color: '#E3A74F',
    backgroundColor: '#082031',
    fontSize: 16
  })
}))

const StepIconComponent = ({ active, completed, icon }) => {
  return (
    <CustomStepIcon active={active} completed={completed}>
      {completed ? <CheckIcon /> : icon}
    </CustomStepIcon>
  )
}

export function Cadastro() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [steps, setSteps] = useState(allSteps.cliente)
  const imagemPerfil = sessionStorage.getItem('imgPerfil')

  useEffect(() => {
    if (selectedOption === 'empreendedor') {
      setSteps(allSteps.empreendedor)
    } else if (selectedOption === 'cliente') {
      setSteps(allSteps.cliente)
    }
  }, [selectedOption])

  const handleOption = (option) => {
    setSelectedOption(option)
    sessionStorage.setItem('selectedOption', option)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      submitForm()
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const submitForm = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const enderecoInfo = JSON.parse(sessionStorage.getItem('enderecoInfo'))

    const formData = new FormData()

    if (imagemPerfil) {
      const blob = new Blob([imagemPerfil], { type: 'image/jpeg' })
      formData.append('imagem', blob)
    }

    formData.append('user', JSON.stringify({ ...userInfo, ...enderecoInfo }))

    try {
      const response = await api.post('usuarios/cadastro', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Cadastro realizado com sucesso:', response)

      sessionStorage.setItem('token', response.data)
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    }
  }

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

        <Box style={{
          width: '50%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 32,
          paddingRight: 32,
          gap: 32,
          marginLeft: '45%'
        }}>
          <Stepper activeStep={activeStep} alternativeLabel style={{ width: '90%', marginTop: 32 }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={(props) => <StepIconComponent {...props} icon={index + 1} />}>
                  <Typography variant="body1" style={{ color: '#082031', fontSize: 14 }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box style={{ marginLeft: 32, marginRight: 32 }}>
            {activeStep === steps.length ? (
              <Box style={{
                height: '50vh',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16
                }}>
                  {selectedOption === 'cliente' ? (
                    <div>
                      <Typography variant='h4' style={{ color: '#082031', fontWeight: 'bold', fontSize: 24 }}>
                        Cadastro finalizado!
                      </Typography>

                      <Button onClick={() => navigate('/login')} variant='contained' fullWidth>
                        Fazer login
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Typography variant='h4' style={{ color: '#082031', fontWeight: 'bold', fontSize: 24 }}>
                        Cadastro finalizado! Insira as informações da sua barbearia.
                      </Typography>

                      <Button onClick={() => navigate('/cadastro-barbearia')} variant='contained' fullWidth>
                        Continuar
                      </Button>
                    </div>
                  )}
                </div>
              </Box>
            ) : activeStep === 0 ? (
              <FirstStep selectedOption={selectedOption} handleOption={handleOption} />
            ) : activeStep === 1 ? (
              <SecondStep />
            ) : activeStep === 2 ? (
              <ThirdStep />
            ) : (
              <FourthStep />
            )}
          </Box>

          {activeStep !== steps.length && (
            <div style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'space-between',
              width: '100%',
              paddingBottom: 32
            }}>
              <Button disabled={activeStep === 0} onClick={handleBack} fullWidth variant='outlined'>
                Voltar
              </Button>
              <Button onClick={handleNext} fullWidth variant='contained'>
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
              </Button>
            </div>
          )}
        </Box>
      </div>
    </ThemeProvider>
  )
}
