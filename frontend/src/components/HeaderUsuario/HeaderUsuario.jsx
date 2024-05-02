import iconeSair from '../../utils/assets/Icone Sair.svg'
import exemploImg from '../../utils/assets/exemplo.jpeg'

function paginaLogin() {
    window.location = '/login'
}

function HeaderUsuario(props) {
    return (
        <div style={{
            display: "flex",
            width: '100%',
            height: '33vh',
            backgroundColor: '#082031',

        }}>
            {/* DIV BOTÃO DE SAIR */}
            <div className="botaoSair" style={{
                width: '10%',
                display: 'flex',
                height: '100%',
                justifyContent: 'center'
            }}>

                <div className="botao" style={{
                    width: '100%',
                    height: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <button style={{
                        display: 'flex',
                        width: '80%',
                        height: '60%',
                        border: 'none',
                        backgroundColor: '#082031',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'

                    }} onClick={paginaLogin}>

                        <div style={{
                            width: '90%',
                            display: 'flex',
                            justifyContent: 'space-evenly'
                        }}>
                            <img src={iconeSair} style={{ height: '20px' }} alt="" />
                            <div style={{
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '15px'
                            }}>Sair</div>
                        </div>

                    </button>

                </div>

            </div>

            {/* DIV IMAGEM */}
            <div style={{
                width: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                {/* IMAGEM */}
                <div style={{
                    width: '75%',
                    height: '80%',
                    borderRadius: '100%',
                    border: 'solid 5px #E3A74F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>


                    <img src={exemploImg} style={{ height: '100%', width: '100%', borderRadius: '100%' }} alt="" />

                </div>
            </div>

            {/* DIV INFORMAÇÕES */}
            <div style={{
                width: '20%',
                backgroundColor: "green",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="conteudo" style={{
                    width: '90%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'blue'

                }}>

                    <div className="BemVindo" style={{
                        display: 'flex',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        Bem-vindo,<span style={{ color: "#E3A74F" }}>&nbsp; Antonello</span>!
                    </div>

                    <div className="BemVindo" style={{
                        display: 'flex',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        Bem-vindo,<span style={{ color: "#E3A74F" }}>&nbsp; Antonello</span>!
                    </div>

                    <div className="BemVindo" style={{
                        display: 'flex',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        Bem-vindo,<span style={{ color: "#E3A74F" }}>&nbsp; Antonello</span>!
                    </div>

                </div>

            </div>

            {/* DIV SEPARAÇÃO */}
            <div style={{
                width: '25%',
                backgroundColor: "gray"
            }}>

            </div>

            {/* DIV BOTÃO PRA TROCAR DE AMBIENTE */}

            <div style={{
                width: '25%',
                backgroundColor: "purple"
            }}>

            </div>
        </div>
    )
}

export default HeaderUsuario;
