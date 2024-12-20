import { Typography } from '@mui/material'
import AccountMenu from './AccountMenu/AccountMenu'

export function HeaderUsuario(props) {
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
        <Typography variant='h6' style={{ color: '#082031', marginLeft: 16, fontWeight: 'bold' }}>{props.title}</Typography>

        <div style={{
          paddingRight: 16
        }}>
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
