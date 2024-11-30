import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import Logout from '@mui/icons-material/Logout'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import FilterOutlinedIcon from '@mui/icons-material/FilterOutlined'
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined'
import utils from '../../utils/globals'
import { Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined'

export default function AccountMenu() {
  const barbeariaInfo = JSON.parse(sessionStorage.getItem("barbearia"))
  const token = JSON.parse(sessionStorage.getItem("user"))
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const imagePerfil = sessionStorage.getItem('imgPerfil')
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  React.useEffect(() => {
    const cachedUserInfo = sessionStorage.getItem("tipo")

    if (cachedUserInfo) {
      const userInfo = JSON.parse(cachedUserInfo)
      setIsAdm(userInfo.adm || false)
    } else {
      const fetchUserInfo = async () => {
        try {
          const response = await api.get("/usuarios/user", {
            headers: {
              Authorization: token,
            },
          })

          if (response.status === 200) {
            const userInfo = response.data
            sessionStorage.setItem("tipo", JSON.stringify(userInfo))
            setIsAdm(userInfo.adm || false)
          }
        } catch (error) {
          console.error("Erro ao buscar informações do usuário", error)
        }
      }

      fetchUserInfo()
    }
  }, [token])

  const getImagePerfil = async () => {
    try {
      const response = await api.get('usuarios/get-image', {
        headers: {
          Authorization: token,
        },
      })

      const imagemPerfil = response.data

      if (imagemPerfil) {
        sessionStorage.setItem('imgPerfil', imagemPerfil)
      }
    } catch (error) {
      console.error("Erro ao buscar imagem de perfil", error)
    }
  }

  getImagePerfil()

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Configurações de conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            style={{
              border: '1px solid #CBD5E0',
              borderRadius: 12,
              padding: 8,
            }}
          >
            <Avatar sx={{ width: 32, height: 32, backgroundColor: utils.randomColor, color: '#082031' }}>
              {!imagePerfil ? userInfo.nome.charAt(0) : <img src={imagePerfil} alt="Imagem de perfil" style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',

              }} />}
            </Avatar>

            <Typography variant="body1" style={{ color: '#082031', fontWeight: 600, marginLeft: 8 }}>
              {userInfo.nome}
            </Typography>

            {open ? <ExpandLessIcon style={{ color: '#082031', marginLeft: 12 }} /> : <ExpandMoreIcon style={{ color: '#082031', marginLeft: 12 }} />}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {barbeariaInfo ? (
          <div>
            <MenuItem
              onClick={() => {
                handleClose()
                navigate('/agenda')
              }}
            >
              <ListItemIcon>
                <CalendarMonthOutlinedIcon fontSize="small" style={{ color: '#082031' }}  />
              </ListItemIcon>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Minha agenda
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose()
                navigate('/dashboard')
              }}
            >
              <ListItemIcon>
                <PieChartOutlinedIcon fontSize="small" style={{ color: '#082031' }} />
              </ListItemIcon>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Dashboard
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose()
                navigate('/financeiro')
              }}
            >
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon fontSize="small" style={{ color: '#082031' }} />
              </ListItemIcon>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Financeiro
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose()
                navigate('/gerenciamento')
              }}
            >
              <ListItemIcon>
                <StorefrontOutlinedIcon fontSize="small" style={{ color: '#082031' }} />
              </ListItemIcon>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Gerenciamento
              </Typography>
            </MenuItem>
            <Divider />
          </div>
        ) : (
          <div>
            <MenuItem
              onClick={() => {
                handleClose()
                navigate('/perfil/agendamentos')
              }}
            >
              <ListItemIcon>
                <DateRangeOutlinedIcon fontSize="small" style={{ color: '#082031' }} />
              </ListItemIcon>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Minha agenda
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                navigate('/perfil/galeria')
              }}
            >
              <ListItemIcon>
                <FilterOutlinedIcon fontSize="small" style={{ color: '#082031' }} />
              </ListItemIcon>
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Galeria
              </Typography>
            </MenuItem>
            <Divider />
          </div>
        )}

        <MenuItem onClick={() => {
          handleClose()
          navigate('/')
        }}>
          <ListItemIcon>
            <HouseOutlinedIcon fontSize="small" style={{ color: '#082031' }} />
          </ListItemIcon>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            Início
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          navigate('/configuracoes')
        }}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" style={{ color: '#082031' }} />
          </ListItemIcon>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            Configurações
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          sessionStorage.clear()
          navigate('/login')
        }}>
          <ListItemIcon>
            <Logout fontSize="small" style={{ color: '#082031' }} />
          </ListItemIcon>
          <Typography variant="body1" style={{ fontWeight: 600 }}>
            Sair
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
