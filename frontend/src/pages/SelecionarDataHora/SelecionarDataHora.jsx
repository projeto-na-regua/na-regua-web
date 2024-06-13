import React, { useState, useEffect } from "react";
import styles from './SelecionarDataHora.module.css';
import { Footer } from "../../components/Footer/Footer";
import logo from '../../utils/assets/logo-scale0.svg';
import Header from "../../components/Header/Header";
import LinhaServicos from "../../components/LinhaServicos/LinhaServicos.jsx";
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx';
import { Button, Card } from '@mui/material';
import FotoPerfilEquipe from "../../components/FotoPerfilEquipe/FotoPerfilEquipe.jsx";

export function SelecionarDataHora() {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);
    const token = JSON.parse(sessionStorage.getItem('user'));
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
    }, [token]);

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.header}>
                <Header
                    esquerda={<img src={logo} alt='logo-na-regua' style={{ width: '70%' }} />}
                    direita={
                        <div>
                            {isAuth
                                ? <Button onClick={() => setOpen(!open)} variant='contained' style={{
                                    borderRadius: '10px',
                                    gap: 20,
                                    fontWeight: 600,
                                    fontSize: 20,
                                    backgroundColor: '#082031',
                                    color: '#fff',
                                    cursor: 'pointer'
                                }}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Usuário
                                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                                        <path fill="#ffffff" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z" />
                                    </svg>
                                    <MenuLateralUsuario open={open} />
                                </Button>
                                : <Button onClick={() => navigate('/login')} variant='contained' style={{ width: 100 }}>Entrar</Button>
                            }
                        </div>
                    }
                />
            </div>

            <div className={styles.selecionarServicoDataHora}>
                <div className={styles.containerSelecionarServicoDataHora}>
                    <div className={styles.conteudoSelecionarServicoDataHora}>

                        <div className={styles.breadCrumbs}>
                            <span>Buscar</span>
                            <span>{">"}</span>
                            <span>Perfil Dom Bigode</span>
                            <span>{">"}</span>
                            <span>Selecionar Horário</span>
                        </div>

                        <div className={styles.servicos}>
                            <div className={styles.tituloServico}>
                                <span>Selecionar serviço</span>
                            </div>

                            <div className={styles.servicosDisponiveis}>
                                <LinhaServicos />
                                <LinhaServicos />
                                <LinhaServicos />
                                <LinhaServicos />
                            </div>
                        </div>

                        <div className={styles.selecionarBarbeiro}>
                            <div className={styles.tituloSelecionarBarbeiro}>
                                <span>Selecionar barbeiro</span>
                            </div>

                            <div className={styles.subTituloSelecionarBarbeiro}>
                                <span>Todos os barbeiros abaixo aceitam o tipo de serviço que você escolheu</span>
                            </div>

                            <div className={styles.barbeirosDisponiveis}>
                                <FotoPerfilEquipe />
                                <FotoPerfilEquipe />
                                <FotoPerfilEquipe />
                                <FotoPerfilEquipe />
                            </div>


                        </div>

                        <div className={styles.selecionarDataHora}>

                            <div className={styles.tituloSubTituloSelecionarHorario}>

                                <div className={styles.tituloSelecionarHorario}>
                                    <span>Selecionar horário</span>
                                </div>

                                <div className={styles.subTituloSelecionarHorario}>
                                    <span>Todos os horários abaixo são de acordo com suas opções escolhidas, tente trocar os filtros se quiser um outro dia ou outro horário {":)"}</span>
                                </div>
                            </div>

                            <div className={styles.selecionarDataHoraEsquerda}>
                                <div className={styles.agenda}>

                                </div>
                            </div>

                            <div className={styles.selecionarDataHoraDireita}>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </ThemeProvider>
    );
}

export default SelecionarDataHora;
