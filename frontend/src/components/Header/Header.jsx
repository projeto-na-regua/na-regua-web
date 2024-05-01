function Header(props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'space-between',
      padding: 10,
      flexGrow: 1,
      height: '10vh',
      backgroundColor: '#082031',
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        height: '100%',

      }}>{props.esquerda}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: '100%',

      }}>{props.meio}</div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        height: '100%',

      }}>{props.direita}

        {/* MODAL PARA FAZER */}
        {/* <div style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
                width: '100%',
                height: '100%',
            }}>{direitaModal}
            </div> */}
      </div>
    </div>
  )
}

export default Header
