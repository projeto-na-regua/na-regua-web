import { Typography } from '@mui/material'

export function CardHorario(props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      padding: 32,
      backgroundColor: '#F4F3EE',
      height: '70%',
      minWidth: 300,
      borderRadius: 16,
      alignItems: 'center',
      gap: 16
    }}>
      <div style={{
        height: '80%',
        width: 2,
        backgroundColor: '#E3A74F',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Typography variant="h6">
          {props.nomeCliente}
        </Typography>

        <Typography variant="body1">
          Horário: {props.horario}
        </Typography>

        <Typography variant="body1">
          Duração: {props.duracao}
        </Typography>

        <Typography variant="body1">
          Serviço: {props.servico}
        </Typography>
      </div>
    </div>
  )
}
