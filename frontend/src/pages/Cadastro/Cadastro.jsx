import { useState, useRef } from 'react'
import { Stepper, Step, StepLabel, Button, Box, Typography, Divider, styled, ThemeProvider } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { theme } from '../../theme'
import { FirstStep } from '../../components/BoxStepperCadastro/FirstStep/FirstStep'
import { SecondStep } from '../../components/BoxStepperCadastro/SecondStep/SecondStep'
import { ThirdStep } from '../../components/BoxStepperCadastro/ThirdStep/ThirdStep'

const steps = ['Escolher seu estilo', 'Informar dados pessoais', 'Informar endereço']

const CustomStepIcon = styled('div')(({ theme, active, completed }) => ({
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
  const [activeStep, setActiveStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const hoverRef = useRef(null)
  const iconRef = useRef(null)
  const textRef = useRef(null)

  const handleOption = (option) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box style={{
        width: '40%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 64
      }}>
        <Stepper activeStep={activeStep} alternativeLabel style={{ width: '100%', marginTop: 32 }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={(props) => (
                  <StepIconComponent {...props} icon={index + 1} />
                )}
              >
                <Typography variant="body1" style={{ color: '#082031', fontSize: 14 }}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box style={{ marginLeft: 32, marginRight: 32 }}>
          {activeStep === steps.length ? (
            <Box>
              <p>Todos os passos foram concluídos!</p>
              <Button onClick={handleReset}>Resetar</Button>
            </Box>
          ) : activeStep === 0 ? (
            <FirstStep />
          ) : activeStep === 1 ? (
            <SecondStep />
          ) : (
            <ThirdStep />
          )}
        </Box>


        <div style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            fullWidth
            variant='outlined'
          >
            Voltar
          </Button>

          <Button
            onClick={handleNext}
            fullWidth
            variant='contained'
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </Box>
    </ThemeProvider >
  )
}
