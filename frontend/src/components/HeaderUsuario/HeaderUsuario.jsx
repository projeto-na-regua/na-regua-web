import iconeSair from '../../utils/assets/IconsHeaderUsuario/Icone Sair.svg'
import iconEditar from '../../utils/assets/IconsHeaderUsuario/IconEditar.svg'
import editFoto from '../../utils/assets/IconsHeaderUsuario/photo-edit_svgrepo.com.png'
import { Button, TextField, ThemeProvider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import api from '../../api'
import styles from './HeaderUsuario.module.css'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../theme'

function HeaderUsuario() {
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const token = JSON.parse(sessionStorage.getItem('user'))
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const barbeariaInfo = JSON.parse(sessionStorage.getItem('barbearia'))
    const [usuario, setUsuario] = useState()


    useEffect(() => {
        const validarTipoUsuario = async () => {
            try {
                if (barbeariaInfo !== null) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            } catch (error) {
                console.error('Erro ao validar o funcionário', error)
            }
        }
        fetchPerfil()
        validarTipoUsuario()
    }, [barbeariaInfo])

    const handleLogout = () => {
        navigate('/')
    }

    const cadastroBarbearia = () => {
        navigate('/cadastro-barbearia')
    }

    const fetchPerfil = async () => {
        try {
            console.log('Fetching perfil')
            const response = await api.get(`usuarios/perfil`, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response.data)
            setUsuario(response.data)
        } catch (error) {
            console.log('Erro ao buscar o perfil: ' + error)
        }
    }

    const [values, setValues] = useState({
        nome: '',
        email: '',
        senha: '',
        celular: '',
        logradouro: '',
        numero: '',
        cidade: '',
        cep: ''
    })

    const resetValues = () => {
        setValues({
            nome: '',
            email: '',
            senha: '',
            celular: '',
            logradouro: '',
            numero: '',
            cidade: '',
            cep: '',
            imgPerfil: ''
        })

        setIsModalOpen(false)
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const enviarAtualizacaoUsuario = async () => {
        try {
            const response = await api.put('/usuarios/editar-perfil', {
                nome: values.nome,
                email: values.email,
                celular: values.celular,
                imgPerfil: values.imgPerfil,
            }, {
                headers: {
                    Authorization: token
                }
            })

            if (response.status === 200) {
                const userInfoString = sessionStorage.getItem('userInfo')
                let userInfo = {}
                if (userInfoString) {
                    userInfo = JSON.parse(userInfoString)
                }

                userInfo.nome = values.nome
                userInfo.email = values.email
                userInfo.celular = values.celular
                userInfo.imgPerfil = values.imgPerfil

                sessionStorage.setItem('userInfo', JSON.stringify(userInfo))

                setIsModalOpen(false)
            }
        } catch (error) {
            console.error('Erro ao enviar a atualização do funcionário', error)
        }
    }

    const [urlContemPerfil, setUrlContemPerfil] = useState(false)

    useEffect(() => {
        const url = window.location.href

        if (url.includes('perfil')) {
            setUrlContemPerfil(true)
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.headerDivGrande}>
                {isModalOpen && (
                    <>
                        <div
                            className={styles.firstIsModalOpen}
                            onClick={() => { setIsModalOpen(false) }}
                        />
                        <div className={styles.secondIsModalOpen}>
                            <div className={styles.divImagemModal}>
                                <div className={styles.imagemModal}>
                                    <img src={userInfo.imgPerfil} style={{ height: '100%', width: '100%', borderRadius: '100%' }} alt="" />
                                    <button className={styles.buttonDentroImagemModal} onClick={() => { setIsModalOpen(false) }}>
                                        <img src={editFoto} style={{ height: '50px', width: '50px' }} alt="Editar Imagem" />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.divTodoInputs}>
                                <div className={styles.divEsquerdaInputs}>
                                    <TextField
                                        label='Nome'
                                        placeholder='Digite Aqui'
                                        value={values.nome}
                                        onChange={handleChange('nome')}
                                        fullWidth
                                    />
                                    <TextField
                                        label='Email'
                                        placeholder='Digite Aqui'
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        fullWidth
                                    />
                                    <TextField
                                        label='Celular'
                                        placeholder='Digite Aqui'
                                        value={values.celular}
                                        onChange={handleChange('celular')}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className={styles.divButtonDescartarESalvar}>
                                <Button
                                    variant='outlined'
                                    onClick={resetValues}
                                    style={{
                                        height: '100%'
                                    }}
                                    fullWidth
                                >
                                    Descartar informações
                                </Button>

                                <Button
                                    variant='contained'
                                    onClick={resetValues}
                                    fullWidth
                                >
                                    Salvar informações
                                </Button>
                            </div>
                        </div>
                    </>
                )}
                <div className={styles.divTodoBotaoSair}>
                    <div className={styles.divParaOBotao}>
                        <button className={styles.botaoSair} onClick={() => {
                            navigate('/')
                        }}>
                            <div className={styles.divConteudoDentroBotao}>
                                <img src={iconeSair} style={{ height: '24px' }} alt="" />
                                <div className={styles.textoSair} onClick={handleLogout}>Página Inicial</div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className={styles.divTodoImagem}>
                    <div className={styles.divImagem}>
                        <img src={userInfo.imgPerfil} style={{ height: '100%', width: '100%', borderRadius: '50%' }} alt="imagem-de-perfil" />
                    </div>
                </div>
                <div className={styles.divTodoInformacoes}>
                    <div className={styles.divInformacoesConteudo}>
                        <div className={styles.divBemVindo}>
                            <div className={styles.divBemVindoConteudo}>
                                Bem-vindo,<span style={{ color: "#E3A74F" }}>&nbsp; {userInfo.nome}</span>!
                            </div>
                            <div className={styles.divBotaoEditar}>
                                <button className={styles.botaoEditar} onClick={() => setIsModalOpen(true)}>
                                    <img src={iconEditar} style={{ height: '90%', width: '90%' }} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className={styles.divContato}>
                            <div className={styles.divTextContato}>Contato</div>
                            <div className={styles.divTelefoneEEmail}>
                                <div className={styles.divInfoConteudo}>{userInfo.celular}</div>
                                <div className={styles.divInfoConteudo}>{userInfo.email}</div>
                            </div>
                        </div>
                        <div className={styles.divEndereco}>
                            {!userInfo.logradouro && !userInfo.numero && (
                                <>
                                    <div className={styles.divTextEndereco}>Endereço</div>
                                    <div className={styles.divConteudoEndereco}>
                                        <div className={styles.divConteudoEnderecoTexto}>
                                            Nenhum endereço cadastrado
                                        </div>
                                    </div>
                                </>
                            )}
                            {userInfo.logradouro && userInfo.numero && (
                                <>
                                    <div className={styles.divTextEndereco}>Endereço</div>
                                    <div className={styles.divConteudoEndereco}>
                                        <div className={styles.divConteudoEnderecoTexto}>
                                            {userInfo.logradouro}, {userInfo.numero}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.divSeparacao}></div>
                {isAuth ? (
                    <div className={styles.validacaoAmbiente}>
                        <div className={styles.divTodoTrocaAmbiente}>
                            <div className={styles.divConteudoTrocaAmbiente}>
                                <Button
                                    variant='contained'
                                    style={{
                                        borderRadius: '0 0 12px 12px',
                                        width: '100%',
                                        backgroundColor: urlContemPerfil ? '#E3A74F' : '#54514d',
                                    }}
                                    onClick={() => navigate('/perfil/meus-agendamentos')}>
                                    Meu perfil
                                </Button>
                            </div>
                        </div>
                        <div className={styles.divTodoTrocaAmbiente}>
                            <div className={styles.divConteudoTrocaAmbiente}>
                                <Button
                                    variant='contained'
                                    style={{
                                        borderRadius: '0 0 12px 12px',
                                        backgroundColor: urlContemPerfil ? '#54514d' : '#E3A74F',
                                    }}
                                    onClick={() => navigate('/agenda')}>
                                    {barbeariaInfo.nomeNegocio}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.validacaoAmbiente}>
                        <div className={styles.divTodoTrocaAmbiente}>
                            <div className={styles.divConteudoTrocaAmbiente}>
                                <Button
                                    variant='contained'
                                    className={styles.botaoTrocaAmbiente}
                                    onClick={cadastroBarbearia}
                                    style={{
                                        backgroundColor: '#E3A74F',
                                        color: '#FFF',
                                        borderRadius: '0 0 10px 10px',
                                        width: '100%',
                                        height: '100%'
                                    }}>
                                    Possui barbearia?
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ThemeProvider>
    )
}

export default HeaderUsuario
