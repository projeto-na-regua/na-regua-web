import React, { useState, useEffect } from "react";
import styles from './BuscaBarbearia.module.css';
import { Footer } from "../../components/Footer/Footer";
import LinhaFiltroBuscarBarbearia from "../../components/LinhaFiltroBuscarBarbearia/LinhaFiltroBuscarBarbearia";
import CardBarbeariaEncontrada from "../../components/CardBarbeariaEncontrada/CardBarbeariaEncontrada.jsx";
import logo from '../../utils/assets/logo-scale0.svg';
import Header from "../../components/Header/Header";
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx';
import imgBarbeariaPadrao from '../../utils/assets/barbeariaPadrao.png'
import { Button } from '@mui/material';
import api from '../../api.js';

export function BuscaBarbearia() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const [isAuth, setIsAuth] = useState(false);
    const token = JSON.parse(sessionStorage.getItem('user'));
    const [open, setOpen] = useState(false);
    const [barbearias, setBarbearias] = useState([]);
    const [imgPerfil, setImgPerfil] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [servico, setServico] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        setServico(urlParams.get('servico'));
        setData(urlParams.get('data'));
        setHorario(urlParams.get('horario'));
    }, []); // Este useEffect será executado apenas uma vez, quando o componente for montado

    useEffect(() => {
        if (!token) {
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
    }, [token]);

    useEffect(() => {
        fetchBarbearias();
        fetchImage();
    }, [servico, data, horario]); // Agora as buscas são acionadas quando os parâmetros mudam

    const fetchBarbearias = async () => {
        console.log('Serviço:', servico);
        console.log('Data:', data);
        console.log('Horário:', horario);
        try {
            console.log('Fetching barbearias (cliente):');
            const response = await api.get('barbearias/client-side/pesquisa-by-localizacao', {
                headers: {
                    Authorization: token,
                },
                params: {
                    servico: servico,
                    date: data,
                    time: horario
                }
            });
            console.log('Response fetch barbearias:', response.data);
            setBarbearias(response.data);
        } catch (error) {
            console.error('Erro ao buscar as barbearias:', error);
        }
    };

    const fetchImage = async () => {
        try {
            console.log('Fetching imagens de perfil das barbearias (cliente)');
            const response = await api.get('barbearias/client-side/get-image-perfil', {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            setImgPerfil(response.data);
        } catch (error) {
            console.log('Erro ao buscar a imagem de capa: ' + error);
        }
    };

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
                                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {userInfo ? userInfo.nome.split(" ")[0] : 'Usuário'}
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

            <div className={`${styles.fullHeightBg} ${styles.perfilContainer}`}>
                <div className={styles.containerBuscarBarbearias}>
                    <div className={styles.conteudoBuscarBarbearias}>
                        <div className={styles.linhaFiltroBuscarBarbearia}>
                            <LinhaFiltroBuscarBarbearia />
                        </div>

                        <div className={styles.CardsBarbeariaEncontrada}>
                            {barbearias.map((barbearia, index) => (
                                <CardBarbeariaEncontrada
                                    valor={barbearia.id}
                                    key={barbearia.id} // Use o id como chave
                                    nomeBarbearia={barbearia.nomeNegocio}
                                    endereco={`${barbearia.logradouro}, ${barbearia.numero}`}
                                    foto={imgPerfil[index] && /^https:\/\/upload0naregua\.blob\.core\.windows\.net\/upload\/.+/.test(imgPerfil[index]) ? imgPerfil[index] : imgBarbeariaPadrao}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </ThemeProvider>
    );
}

export default BuscaBarbearia;
