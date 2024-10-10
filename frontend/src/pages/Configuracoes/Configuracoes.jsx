import { theme } from '../../theme'
import { Sidebar } from '../../components/Sidebar'
import { HeaderUsuario } from '../../components/Header'
import { ThemeProvider } from '@emotion/react'
import { MenuItem, ListItemIcon, Typography, Divider } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { Profile } from '../Profile/Profile'
import DeleteIcon from '@mui/icons-material/Delete'


function Configuracoes() {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState('profile')
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Sidebar />

        <div style={{
          width: '85vw',
          marginLeft: '15vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <HeaderUsuario title='Configurações' />

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 32,
            height: '100%'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <MenuItem onClick={() => {
                handleClose()
                setPage('profile')
              }} style={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <AccountCircleIcon
                    fontSize='medium'
                    style={{color: '#082031' }}
                  />
                </ListItemIcon>

                <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                  Perfil
                </Typography>
              </MenuItem>

              <MenuItem onClick={() => {
                handleClose()
                sessionStorage.clear()
                navigate('/login')
              }} style={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <LogoutIcon
                    fontSize='medium'
                    style={{color: '#082031' }}
                  />
                </ListItemIcon>

                <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                  Sair
                </Typography>
              </MenuItem>

              <Divider style={{
                marginTop: 16,
                marginBottom: 16,
                marginLeft: 16,
                width: '100%',
                backgroundColor: '#082031'
              }} />

              <MenuItem onClick={() => {
                handleClose()
                // TODO
                alert('Deletar conta')
              }} style={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <DeleteIcon
                    fontSize='medium'
                    style={{color: '#780e0e'}}
                  />
                </ListItemIcon>

                <Typography variant='body1' style={{ color: '#780e0e', fontWeight: 'bold' }}>
                  Deletar conta
                </Typography>
              </MenuItem>

              <MenuItem onClick={() => {
                handleClose()
                // TODO
                alert('Deletar conta')
              }} style={{ cursor: 'pointer' }}>
                <ListItemIcon>
                  <DeleteIcon
                    fontSize='medium'
                    style={{color: '#780e0e'}}
                  />
                </ListItemIcon>

                <Typography variant='body1' style={{ color: '#780e0e', fontWeight: 'bold' }}>
                  Deletar barbearia
                </Typography>
              </MenuItem>
            </div>

            <div style={{
              width: '100%',
              height: '100%',
            }}>
              {page === 'profile' ? (
                <Profile />
              ) : (
                <div>
                  <h1>oi</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Configuracoes
