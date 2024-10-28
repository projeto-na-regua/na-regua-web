import { Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'

import PieChartIcon from '@mui/icons-material/PieChart'
import StoreIcon from '@mui/icons-material/Store'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'
import CollectionsIcon from '@mui/icons-material/Collections'

export function OptionsSidebar(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = () => {
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
      case 'Financeiro':
        navigate('/financeiro')
        break
      case 'Funcionários':
        navigate('/funcionarios')
        break
      case 'Gerenciamento':
        navigate('/gerenciamento')
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
  }

  const renderIcon = () => {
    let IconComponent

    switch (props.text) {
      case 'Agendamentos':
        IconComponent = location.pathname.includes('/perfil/agendamentos') ? CalendarMonthIcon : CalendarMonthOutlinedIcon
        break
      case 'Galeria':
        IconComponent = location.pathname.includes('/perfil/galeria') ? CollectionsIcon : CollectionsOutlinedIcon
        break
      case 'Agenda':
        IconComponent = location.pathname.includes('/agenda') ? CalendarMonthIcon : CalendarMonthOutlinedIcon
        break
      case 'Dashboard':
        IconComponent = location.pathname.includes('/dashboard') ? PieChartIcon : PieChartOutlinedIcon
        break
      case 'Serviços':
        IconComponent = location.pathname.includes('/servicos') ? ContentCutIcon : ContentCutOutlinedIcon
        break
      case 'Financeiro':
        IconComponent = location.pathname.includes('/financeiro') ? CurrencyExchangeIcon : CurrencyExchangeOutlinedIcon
        break
      case 'Funcionários':
        IconComponent = location.pathname.includes('/funcionarios') ? GroupIcon : GroupOutlinedIcon
        break
      case 'Gerenciamento':
        IconComponent = location.pathname.includes('/gerenciamento') ? StoreIcon : StoreOutlinedIcon
        break
      case 'Configurações':
        IconComponent = location.pathname.includes('/configuracoes') ? SettingsIcon : SettingsOutlinedIcon
        break
      default:
        return null
    }

    return <IconComponent style={{ color: isSelected() ? '#E3A74F' : 'white' }} />
  }

  const isSelected = () => {
    switch (props.text) {
      case 'Agendamentos':
        return location.pathname === '/perfil/agendamentos'
      case 'Galeria':
        return location.pathname === '/perfil/galeria'
      case 'Agenda':
        return location.pathname === '/agenda'
      case 'Dashboard':
        return location.pathname === '/dashboard'
      case 'Serviços':
        return location.pathname === '/servicos'
      case 'Financeiro':
        return location.pathname === '/financeiro'
      case 'Funcionários':
        return location.pathname === '/funcionarios'
      case 'Gerenciamento':
        return location.pathname === '/gerenciamento'
      case 'Configurações':
        return location.pathname === '/configuracoes'
      default:
        return false
    }
  }

  return (
    <div
      onClick={handleNavigation}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          height: 24,
          width: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {renderIcon()}
      </div>
      <Typography
        variant='body1'
        style={{
          color: isSelected() ? '#E3A74F' : 'white',
          fontWeight: 600,
        }}
      >
        {props.text}
      </Typography>
    </div>
  )
}
