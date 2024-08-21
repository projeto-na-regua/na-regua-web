import { Button, Typography } from '@mui/material'

export function HeaderUsuario (props) {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 16,
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant='h6' style={{ color: '#082031', marginLeft: 16 }}>{props.title}</Typography>

        <Button
          variant='outlined' style={{
            marginRight: 16,
          }}>
          {userInfo.nome}
        </Button>
      </div>
    </div>
  )
}
