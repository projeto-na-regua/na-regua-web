import iconeSair from '../../utils/assets/IconsHeaderUsuario/Icone Sair.svg'
import exemploImg from '../../utils/assets/IconsHeaderUsuario/exemplo.jpeg'
import iconEditar from '../../utils/assets/IconsHeaderUsuario/IconEditar.svg'
import editFoto from '../../utils/assets/IconsHeaderUsuario/photo-edit_svgrepo.com.png'
import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import api from '../../api'
import styles from './HeaderUsuario.module.css'

function cadastroBarbearia() {
    window.location = '/cadastro-barbearia'
}

function abrirPerfilBarbeiro(){
    window.location = '/not-found'
}

function abrirPerfilBarbearia(){
    window.location = '/not-found'
}

function paginaLogin() {
    window.location = '/login'
}

function HeaderUsuario(props) {
    const [isAuth, setIsAuth] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        const validarTipoUsuario = async () => {
          try {
            const response = await api.get('/usuarios/user', {
              headers: {
                Authorization: token
              }
            })
    
            console.log(response.data)
            if(response.data.adm == null){
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                            <button className={styles.buttonDentroImagemModal} onClick={() => { openModal(); }}
                            >
                                <img src={editFoto} style={{ height: '50px', width: '50px' }} alt="Editar Imagem" />
                            </button>
                        </div>

                    </div>

                    {/* INPUTS */}

                    <div className={styles.divTodoInputs} >

                        <div className={styles.divEsquerdaInputs}>

                            <TextField label='Nome' placeholder='Digite Aqui' />
                            <TextField label='Email' placeholder='Digite Aqui' />
                            <TextField label='Senha' placeholder='Digite Aqui' type='password' />

                        </div>

                        <div className={styles.divDireitaInputs}>
                            <TextField label='Celular' placeholder='Digite Aqui' />
                            <TextField label='Endereço' placeholder='Digite Aqui' />

                        </div>


                    </div>

                    {/* SALVAR E DESCARTAR INFORMAÇÕES */}

                    <div className={styles.divButtonDescartarESalvar}>
                        <button className={styles.buttonDescartarInfos}>Descartar Informações</button>

                        <button className={styles.buttonSalvarInfos}>Salvar Informações
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
                            <div className={styles.textoSair}>Sair</div>
                        </div>

                    </button>

                </div>

            </div>

            {/* DIV IMAGEM */}
            <div className={styles.divTodoImagem}>
                {/* IMAGEM */}
                <div className={styles.divImagem}>

                    <img style={{ height: '101%', width: '100%', borderRadius: '100%' }} alt="" />

                </div>
            </div>

            {/* DIV INFORMAÇÕES */}
            <div className={styles.divTodoInformacoes}>
                <div className={styles.divInformacoesConteudo}>

                    <div className={styles.divBemVindo}>
                        <div className={styles.divBemVindoConteudo}>
                            Bem-vindo,<span style={{ color: "#E3A74F" }}>&nbsp; Antonello</span>!
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
                                (xx) x xxxx - xxxx
                            </div>

                            <div className={styles.divInfoConteudo}>
                                antonello@gmail.com
                            </div>

                        </div>

                    </div>

                    <div className={styles.divEndereco}>
                        <div className={styles.divTextEndereco}>
                            Endereço
                        </div>

                        <div className={styles.divConteudoEndereco}>

                            <div className={styles.divConteudoEnderecoTexto}>
                                Rua xxxxxxxxxxxxxxx, 212 - SP
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
                                Dom bigode
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
