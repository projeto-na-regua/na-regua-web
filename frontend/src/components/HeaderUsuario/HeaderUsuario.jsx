import iconeSair from '../../utils/assets/IconsHeaderUsuario/Icone Sair.svg'
import exemploImg from '../../utils/assets/IconsHeaderUsuario/exemplo.jpeg'
import iconEditar from '../../utils/assets/IconsHeaderUsuario/IconEditar.svg'
import editFoto from '../../utils/assets/IconsHeaderUsuario/photo-edit_svgrepo.com.png'
import React, { useState } from 'react'
import { TextField } from '@mui/material'


function cadastroBarbearia(){
    window.location = '/cadastro-barbearia'
}

function paginaLogin() {
    window.location = '/login'
}

function HeaderUsuario(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{
            display: "flex",
            width: '100%',
            height: '35vh',
            backgroundColor: '#082031',

        }}>

            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '9998',
                    }}
                    onClick={closeModal}
                />
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '35%',
                    height: '90%',
                    backgroundColor: 'white',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    borderRadius: '15px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    zIndex: '9999',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'

                }}>

                    {/* IMAGEM */}
                    <div style={{
                        width: '100%',
                        height: '35%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div className='imagem' style={{
                            width: '45%',
                            height: '90%',
                            borderRadius: '100%',
                            border: 'solid 7px #E3A74F',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <img src={exemploImg} style={{ height: '100%', width: '100%', borderRadius: '100%' }} alt="" />
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    height: '100%',
                                    width: '100%',
                                    transform: 'translate(-50%, -50%)',
                                    border: 'none',
                                    borderRadius: '100%',
                                    backgroundColor: 'rgba(2, 2, 49, 0.7)',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    openModal();
                                }}
                            >
                                <img src={editFoto} style={{ height: '50px', width: '50px' }} alt="Editar Imagem" />
                            </button>
                        </div>

                    </div>

                    {/* INPUTS */}

                    <div style={{
                        width: '100%',
                        height: '45%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'

                    }}>

                        <div className='inputsEsquerda' style={{
                            width: '45%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 32
                        }}>

                            <TextField label='Nome' placeholder='Digite Aqui' />
                            <TextField label='Email' placeholder='Digite Aqui' />
                            <TextField label='Senha' placeholder='Digite Aqui' type='password' />

                        </div>

                        <div className='inputsDireita' style={{
                            width: '45%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}>
                            <TextField label='Celular' placeholder='Digite Aqui' />
                            <TextField label='Endereço' placeholder='Digite Aqui' />

                        </div>


                    </div>

                    {/* SALVAR E DESCARTAR INFORMAÇÕES */}

                    <div style={{
                        width: '100%',
                        height: '15%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <button style={{
                            width: '47%',
                            height: '70%',
                            backgroundColor: 'white',
                            border: '2px solid #082031',
                            color: '#082031',
                            fontWeight: 'bold',
                            borderRadius: '15px',
                            cursor: 'pointer'
                        }}>Descartar Informações</button>

                        <button  style={{
                            width: '47%',
                            height: '70%',
                            backgroundColor: '#082031',
                            color: 'white',
                            border: 'none',
                            fontWeight: 'bold',
                            borderRadius: '15px',
                            cursor: 'pointer'
                        }}>Salvar Informações
                        </button>


                    </div>
                </div>
            )}

            {/* HEADER */}
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
                            <img src={iconeSair} style={{ height: '23px' }} alt="" />
                            <div style={{
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '18px'
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
                    width: '70%',
                    height: '75%',
                    borderRadius: '100%',
                    border: 'solid 7px #E3A74F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>


                    <img src={exemploImg} style={{ height: '101%', width: '100%', borderRadius: '100%' }} alt="" />

                </div>
            </div>

            {/* DIV INFORMAÇÕES */}
            <div style={{
                width: '23%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="conteudo" style={{
                    width: '95%',
                    height: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',

                }}>

                    <div className="BemVindo" style={{
                        width: '100%',
                        height: '20%',
                        display: 'flex',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            width: '85%',
                        }}>
                            Bem-vindo,<span style={{ color: "#E3A74F" }}>&nbsp; Antonello</span>!
                        </div>

                        <div style={{
                            width: '15%',
                            height: '100%',
                        }} className='buttonEditar'>
                            <button style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                backgroundColor: '#082031',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}

                                onClick={openModal}>
                                <img src={iconEditar} style={{ height: '90%', width: '90%' }} alt="" />
                            </button>
                        </div>

                    </div>

                    <div className="Contato" style={{
                        width: '100%',
                        height: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '25%',
                            fontSize: '15px',
                            fontWeight: 'bold',
                        }}>
                            Contato
                        </div>

                        <div style={{
                            width: '100%',
                            height: '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: '15px',
                        }}>

                            <div style={{
                                width: '100%',
                                height: '100%',
                                color: '#E3A74F'
                            }}>
                                (xx) x xxxx - xxxx
                            </div>

                            <div style={{
                                width: '100%',
                                height: '100%',
                                color: '#E3A74F'
                            }}>
                                antonello@gmail.com
                            </div>

                        </div>

                    </div>

                    <div className="Endereco" style={{
                        width: '100%',
                        height: '30%',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '25%',
                            fontSize: '15px',
                            fontWeight: 'bold',
                        }}>
                            Endereço
                        </div>

                        <div style={{
                            width: '100%',
                            height: '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: '15px',
                        }}>

                            <div style={{
                                width: '100%',
                                height: '100%',
                                color: '#E3A74F',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                Rua xxxxxxxxxxxxxxx, 212 - SP
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* DIV SEPARAÇÃO */}
            <div style={{
                width: '22%',
            }}>

            </div>

            {/* DIV BOTÃO PRA TROCAR DE AMBIENTE */}

            <div style={{
                width: '25%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: '50%',
                    height: '23%',

                }}>
                    <button onClick={cadastroBarbearia}    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: '#E3A74F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderBottomLeftRadius: '15px',
                        borderBottomRightRadius: '15px',
                    }}>
                        Possui Barbearia ?
                    </button>

                </div>
            </div>
        </div>
    )
}

export default HeaderUsuario;
