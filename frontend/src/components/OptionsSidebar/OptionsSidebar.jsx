import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function OptionsSidebar(props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        switch (props.text) {
          case 'Agendamentos':
            navigate('/perfil/agendamentos')
            break
          case 'Galeria':
            navigate('/perfil/galeria')
            break
          case 'Agenda':
            navigate('/agenda')
            break
          case 'Dashboard':
            navigate('/dashboard')
            break
          case 'Serviços':
            navigate('/servicos')
            break
          case 'Fluxo de Caixa':
            navigate('/fluxo-de-caixa')
            break
          case 'Funcionários':
            navigate('/funcionarios')
            break
          case 'Configurações':
            navigate('/configuracoes')
            break
          case 'Voltar':
            navigate('/')
            break
          default:
            break
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer'
      }}>
      <div style={{
        height: 24,
        width: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img alt='icon' src={props.icon} />
      </div>

      <Typography variant='body1' style={{ color: props.selected ? '#E3A74F' : 'white' }}>{props.text}</Typography>
    </div>
  )
}
