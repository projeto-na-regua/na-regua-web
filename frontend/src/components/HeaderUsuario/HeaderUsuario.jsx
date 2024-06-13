import iconeSair from '../../utils/assets/IconsHeaderUsuario/Icone Sair.svg'
import exemploImg from '../../utils/assets/IconsHeaderUsuario/exemplo.jpeg'
import iconEditar from '../../utils/assets/IconsHeaderUsuario/IconEditar.svg'
import editFoto from '../../utils/assets/IconsHeaderUsuario/photo-edit_svgrepo.com.png'
import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import api from '../../api'
import utils from "../../utils/globals";
import styles from './HeaderUsuario.module.css'


function cadastroBarbearia() {
    window.location = '/cadastro-barbearia'
}

function abrirPerfilBarbeiro() {
    window.location = '/meus-cortes'
}

function abrirPerfilBarbearia() {
    window.location = '/funcionarios'
}

function paginaLogin() {
    window.location = '/login'
    sessionStorage.clear()
}

function HeaderUsuario(props) {
    const [isAuth, setIsAuth] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({ nome: '', celular: '', email: '', logradouro: '', numero: '', cidade: '', estado: '', cep: '' })
    const token = JSON.parse(sessionStorage.getItem('user'))
    const nomeBarbearia = JSON.parse(sessionStorage.getItem('user')).nomeBarbearia

    useEffect(() => {
        const validarTipoUsuario = async () => {
            try {
                const response = await api.get('/usuarios/user', {
                    headers: {
                        Authorization: token
                    }
                })

                console.log(response.data)
                if (response.data.adm == null) {
                    setIsAuth(false)
                } else {
                    setIsAuth(true)
                }
            } catch (error) {
                console.error('Erro ao validar o funcionário', error)
            }
        }

        validarTipoUsuario()
    }, [token])

    function enviarAtualizacaoUsuario(email, nome, celular) {
        const enviarAtualizacaoUsuario = async () => {
            try {
                const response = await api.put('usuarios/editar-perfil', {
                    nome: nome,
                    email: email,
                    celular: celular
                }, {
                    headers: {
                        Authorization: token
                    }
                });
                console.log(response.data);
                closeModal(true);
            } catch (error) {
                console.error('Erro ao enviar a atualização do funcionário', error);
            }
        };
        enviarAtualizacaoUsuario();
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get('/usuarios/perfil', {
                    headers: {
                        Authorization: token
                    }
                })
                const { nome, celular, email, logradouro, numero, cidade, estado, cep } = response.data
                console.log(response.data)
                setUserInfo({ nome, celular, email, logradouro, numero, cidade, estado, cep })
            } catch (error) {
                console.error('Erro ao receber as informações do funcionário', error)
            }
        }

        fetchUserInfo()
    }, [token])

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleLogout = () => {
        utils.logout();
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
            cep: ''
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    return (
        <div className={styles.headerDivGrande}>

            {isModalOpen && (
                <div
                    className={styles.firstIsModalOpen}
                    onClick={closeModal}
                />
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div className={styles.secondIsModalOpen}>

                    {/* IMAGEM */}
                    <div className={styles.divImagemModal}>
                        <div className={styles.imagemModal}>
                            <img src={exemploImg} style={{ height: '100%', width: '100%', borderRadius: '100%' }} alt="" />
                            <button className={styles.buttonDentroImagemModal} onClick={() => { openModal() }}
                            >
                                <img src={editFoto} style={{ height: '50px', width: '50px' }} alt="Editar Imagem" />
                            </button>
                        </div>

                    </div>

                    {/* INPUTS */}

                    <div className={styles.divTodoInputs}>

                        <div className={styles.divEsquerdaInputs}>

                            <TextField
                                label='Nome'
                                placeholder='Digite Aqui'
                                value={values.nome}
                                onChange={handleChange('nome')}
                            />
                            <TextField
                                label='Email'
                                placeholder='Digite Aqui'
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                            <TextField
                                label='Senha'
                                placeholder='Digite Aqui'
                                type='password'
                                value={values.senha}
                                onChange={handleChange('senha')}
                            />
                            <TextField
                                label='Celular'
                                placeholder='Digite Aqui'
                                value={values.celular}
                                onChange={handleChange('celular')}
                            />

                        </div>

                        <div className={styles.divDireitaInputs}>
                            <TextField
                                label='Logradouro'
                                placeholder='Digite Aqui'
                                value={values.logradouro}
                                onChange={handleChange('logradouro')}
                            />
                            <TextField
                                label='Número'
                                placeholder='Digite Aqui'
                                value={values.numero}
                                onChange={handleChange('numero')}
                            />
                            <TextField
                                label='Cidade'
                                placeholder='Digite Aqui'
                                value={values.cidade}
                                onChange={handleChange('cidade')}
                            />
                            <TextField
                                label='CEP'
                                placeholder='Digite Aqui'
                                value={values.cep}
                                onChange={handleChange('cep')}
                            />

                        </div>
                    </div>

                    {/* SALVAR E DESCARTAR INFORMAÇÕES */}

                    <div className={styles.divButtonDescartarESalvar}>
                        <button className={styles.buttonDescartarInfos} onClick={() => { resetValues() }}>Descartar Informações</button>
                        <button className={styles.buttonSalvarInfos} onClick={() => { enviarAtualizacaoUsuario(values.email, values.nome, values.celular) }}>Salvar Informações
                        </button>

                    </div>
                </div>
            )}



            {/* HEADER */}
            {/* DIV BOTÃO DE SAIR */}
            <div className={styles.divTodoBotaoSair}>

                <div className={styles.divParaOBotao}>

                    <button className={styles.botaoSair} onClick={paginaLogin}>

                        <div className={styles.divConteudoDentroBotao}>
                            <img src={iconeSair} style={{ height: '23px' }} alt="" />
                            <div className={styles.textoSair} onClick={handleLogout}>Sair</div>
                        </div>

                    </button>

                </div>

            </div>

            {/* DIV IMAGEM */}
            <div className={styles.divTodoImagem}>
                {/* IMAGEM */}
                <div className={styles.divImagem}>
                    

                    <img src={exemploImg} style={{ height: '101%', width: '100%', borderRadius: '100%' }} alt="" />

                </div>
            </div>

            {/* DIV INFORMAÇÕES */}
            <div className={styles.divTodoInformacoes}>
                <div className={styles.divInformacoesConteudo}>

                    <div className={styles.divBemVindo}>
                        <div className={styles.divBemVindoConteudo}>
                            Bem-vindo,<span style={{ color: "#E3A74F" }}>&nbsp; {userInfo.nome}</span>!
                        </div>

                        <div className={styles.divBotaoEditar}>
                            <button className={styles.botaoEditar} onClick={openModal}>
                                <img src={iconEditar} style={{ height: '90%', width: '90%' }} alt="" />
                            </button>
                        </div>

                    </div>

                    <div className={styles.divContato}>
                        <div className={styles.divTextContato}>
                            Contato
                        </div>

                        <div className={styles.divTelefoneEEmail}>

                            <div className={styles.divInfoConteudo}>
                                {userInfo.celular}
                            </div>

                            <div className={styles.divInfoConteudo}>
                                {userInfo.email}
                            </div>

                        </div>

                    </div>

                    <div className={styles.divEndereco}>
                        <div className={styles.divTextEndereco}>
                            Endereço
                        </div>

                        <div className={styles.divConteudoEndereco}>

                            <div className={styles.divConteudoEnderecoTexto}>
                                Rua Jericoacara, 147 - São Paulo - SP
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* DIV SEPARAÇÃO */}
            <div className={styles.divSeparacao}>

            </div>

            {/* DIV BOTÃO PRA TROCAR DE AMBIENTE */}


            {isAuth ? (
                <div className={styles.validacaoAmbiente}>
                    <div className={styles.divTodoTrocaAmbiente}>
                        <div className={styles.divConteudoTrocaAmbiente}>
                            <button id={styles.perfil} className={styles.botaoTrocaAmbiente} onClick={abrirPerfilBarbeiro}>
                                Perfil
                            </button>
                        </div>
                    </div>

                    <div className={styles.divTodoTrocaAmbiente}>
                        <div className={styles.divConteudoTrocaAmbiente}>
                            <button className={styles.botaoTrocaAmbiente} onClick={abrirPerfilBarbearia}>
                                {nomeBarbearia}
                            </button>
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
    )
}

export default HeaderUsuario;
