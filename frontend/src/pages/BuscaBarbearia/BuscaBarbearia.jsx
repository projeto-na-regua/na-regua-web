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
    /* const [idsBarbearias, setIdsBarbearias] = useState([]); */
    const [imgPerfil, setImgPerfil] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [servico, setServico] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const location = useLocation();
    /* const [avaliacoes, setAvaliacoes] = useState([]);
    const [avaliacoesCarregadas, setAvaliacoesCarregadas] = useState(false);
    const [mediaAvaliacao, setMediaAvaliacao] = useState(null); // Inicialmente null
    const [carregandoAvaliacoes, setCarregandoAvaliacoes] = useState(true); // Estado de carregamento */

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
    }, []);

    /* useEffect(() => {
        if (idsBarbearias.length > 0) {
            fetchAvaliacoes();
        }
    }, [idsBarbearias]); // Chama fetchAvaliacoes quando idsBarbearias muda */

    const fetchBarbearias = async () => {
        try {
            console.log('Fetching barbearias (cliente):');
            const response = await api.get('barbearias/client-side/pesquisa', {
                headers: {
                    Authorization: token,
                }
            });
            console.log('Response fetch barbearias:', response.data);
            setBarbearias(response.data);
            /* setIdsBarbearias(response.data.map(barbearia => barbearia.id)); // Atualiza idsBarbearias */
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

    /* const fetchAvaliacoes = async () => {
        try {
            console.log('Fetching avaliacoes (cliente)');
            setCarregandoAvaliacoes(true); // Inicia o carregamento
            const response = await api.get('/agendamentos/cliente-side/all-ultimas-avaliacoes', {
                headers: {
                    Authorization: token
                },
                params: {
                    qtd: 1000,
                    idBarbearias: idsBarbearias.join(',')
                }
            });

            const valoresAvaliacoes = [];
            const avaliacoesFiltradas = [];

            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].resultadoAvaliacao != null) {
                    valoresAvaliacoes.push(response.data[i].resultadoAvaliacao);
                    avaliacoesFiltradas.push(response.data[i]);
                }
            }

            setMediaAvaliacao(mediaAvaliacaoBarbearia(valoresAvaliacoes));
            setAvaliacoes(avaliacoesFiltradas);
            setAvaliacoesCarregadas(true);
            setCarregandoAvaliacoes(false); // Atualiza o estado de carregamento
        } catch (error) {
            console.error('Erro ao buscar avaliações da barbearia:', error.response ? error.response.data : error.message);
            setCarregandoAvaliacoes(false); // Atualiza o estado de carregamento mesmo em erro
        }
    };

    function mediaAvaliacaoBarbearia(vetor) {
        if (vetor.length === 0) return 0; // Evita divisão por zero
        const soma = vetor.reduce((acc, valor) => acc + valor, 0);
        return soma / vetor.length;
    } */

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
                                    foto={imgPerfil[index] && /^https:\/\/upload0naregua\.blob\.core\.windows\.net\/upload\/.+/.test(imgPerfil[index]) ? imgPerfil[index] : imgBarbeariaPadrao }
                                    /* avaliacao={avaliacoes.find(av => av.barbeariaId === barbearia.id)?.resultadoAvaliacao || 0} // Forneça uma avaliação padrão */
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
