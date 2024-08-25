import { Button, ThemeProvider, Typography } from '@mui/material'
import { theme } from '../../theme'

export function VisualizarAtendimento(props) {
  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundColor: '#082031',
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        width: '25vw',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 32px 24px 32px',
        gap: 32
      }}>
        <div>
          <Typography variant="h6" color={'#ffffff'}>
            Informações do agendamento
          </Typography>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 12,
          width: '100%',
          padding: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography variant="h6" color={'#082031'}>
            {props.nomeCliente}
          </Typography>
        </div>

        <div style={{
          display: 'flex',
          gap: 16,
          flexDirection: 'column',
          marginTop: 16,
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Typography variant="h7" color={'#ffffff'}>
              Data:
            </Typography>

            <Typography variant="h7" color={'#ffffff'}>
              {props.data}
            </Typography>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Typography variant="h7" color={'#ffffff'}>
              Serviço:
            </Typography>

            <Typography variant="h7" color={'#ffffff'}>
              {props.servico}
            </Typography>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Typography variant="h7" color={'#ffffff'}>
              Status:
            </Typography>

            <Typography variant="h7" color={'#ffffff'}>
              {props.status}
            </Typography>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: 16,
          width: '100%',
          justifyContent: 'center'
        }}>
          <Button
            variant='outlined'
            onClick={props.onClickCancel}
          >
            Cancelar atendimento
          </Button>

          <Button
            variant="contained"
            onClick={props.onClickConfirm}
          >
            {props.titleButton} atendimento
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}
