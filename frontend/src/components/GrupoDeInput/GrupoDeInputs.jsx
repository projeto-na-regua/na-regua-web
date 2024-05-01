import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function GrupoDeInputs() {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      gap: 16,
      width: '100%',
      justifyContent: 'center'
    }}>
      <TextField
        label='Serviço'
      />
      <TextField
        label='Localização'
      />
      <TextField
        label='Data'
      />
      <TextField
        label='Horário'
      />

      <Button onClick={() => {
        navigate('/busca-barbearias')
      }}
      variant='contained'
      style={{
        borderRadius: 12
      }}
      >🔎</Button>
    </div>
  );
}

export default GrupoDeInputs;
