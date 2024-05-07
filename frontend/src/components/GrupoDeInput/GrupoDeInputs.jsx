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
      ><svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M41.6236 36.8834C44.3911 34.0575 46.2682 30.4815 47.022 26.5986C47.7821 22.7049 47.3918 18.6742 45.8988 14.9986C44.4186 11.3437 41.8915 8.20763 38.6348 5.98421C32.0273 1.47141 23.3287 1.47141 16.7213 5.98421C13.4644 8.20763 10.9373 11.3437 9.45734 14.9986C7.96422 18.6742 7.57382 22.7049 8.33414 26.5986C9.08774 30.4815 10.9649 34.0575 13.7325 36.8834C17.3975 40.6444 22.4263 42.7657 27.6781 42.7657C32.9297 42.7657 37.9585 40.6444 41.6236 36.8834Z" stroke="#082031" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M27.6554 9.64922C28.9735 9.78887 29.9287 10.9706 29.7892 12.2887C29.6494 13.6069 28.4676 14.5621 27.1495 14.4225L27.6554 9.64922ZM21.731 17.6147C21.2142 18.8354 19.8058 19.406 18.585 18.8892C17.3646 18.3724 16.794 16.964 17.3108 15.7434L21.731 17.6147ZM11.7454 34.878C12.6833 33.9416 14.203 33.9429 15.1393 34.8812C16.0759 35.8191 16.0743 37.3388 15.1364 38.2751L11.7454 34.878ZM4.2948 49.0975C3.35656 50.0341 1.8372 50.0328 0.900564 49.0946C-0.0357552 48.1564 -0.0344772 46.637 0.903763 45.7004L4.2948 49.0975ZM27.1495 14.4225C24.8375 14.1775 22.6372 15.4737 21.731 17.6147L17.3108 15.7434C19.041 11.656 23.2414 9.18151 27.6554 9.64922L27.1495 14.4225ZM15.1364 38.2751L4.2948 49.0975L0.903763 45.7004L11.7454 34.878L15.1364 38.2751Z" fill="#082031"/>
      </svg>
      </Button>
    </div>
  );
}

export default GrupoDeInputs;
