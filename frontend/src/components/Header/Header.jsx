function Header(props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '10vh',
      width: '100%',
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginLeft: 32
      }}>{props.esquerda}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>{props.meio}</div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginRight: 32
      }}>{props.direita}
      </div>
    </div>
  )
}

export default Header
