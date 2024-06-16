import React, { useState, useEffect } from "react";
import styles from './VisualizarBarbearia.module.css';
import { Footer } from "../../components/Footer/Footer";
import logo from '../../utils/assets/logo-scale0.svg';
import Header from "../../components/Header/Header";
import NomeAvaliacaoBarbearia from "../../components/NomeAvaliacaoBarbearia/NomeAvaliacaoBarbearia.jsx";
import CirculoPerfilBarbearia from "../../components/CirculoPerfilBarbearia/CirculoPerfilBarbearia.jsx";
import CardAvaliacoesVisualizarBarbearia from "../../components/CardAvaliacoesVisualizarBarbearia/CardAvaliacoesVisualizarBarbearia.jsx";
import LinhaServicos from "../../components/LinhaServicos/LinhaServicos.jsx";
import FotoPerfilEquipe from "../../components/FotoPerfilEquipe/FotoPerfilEquipe.jsx";
import { theme } from '../../theme';
import { ThemeProvider } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx';
import { Button } from '@mui/material';
import bannerBarbearia from '../../utils/assets/bannerBarbearia.jpg';
import mapaBarbearia from '../../utils/assets/mapaBarbearia.png';
import api from "../../api.js";
import Mapa from "../../components/Mapa/mapa.jsx";

export function VisualizarBarbearia() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const valor = queryParams.get('valor');

    const [isAuth, setIsAuth] = useState(false);
    const token = JSON.parse(sessionStorage.getItem('user'));
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [barbearia, setBarbearia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [servicos, setServicos] = useState([])
    const [contatos, setContatos] = useState([])
    const [latitude, setLatitude] = useState();
    const [longititude, setLongitude] = useState();

    useEffect(() => {
        if (!token) {
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
    }, [token]);

    const handleSelect = (index) => {
        setSelectedIndex(index);
    };

    const fetchMapaGoogle = async (endereco) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=AIzaSyAxvzxTNJOHpy1zXGqjfcq2pAncM4EwNfU`);
            const data = await response.json();

            // Verifica se a resposta retornou um status OK
            if (data.status === "OK") {
                // Extrai as coordenadas (latitude e longitude) do resultado
                const location = data.results[0].geometry.location;
                console.log("Coordenadas:", location);
                setLatitude(location.lat)
                setLongitude(location.lng)
            } else {
                console.error("Erro ao buscar coordenadas:", data.status);
            }
        } catch (error) {
            console.error('Erro ao buscar coordenadas:', error);
        }
    };

    const fetchPerfilBarbearia = async () => {
        try {
            console.log('Fetching barbearias (cliente):');
            const response = await api.get(`barbearias/client-side/perfil/${valor}`, {
                headers: {
                    Authorization: token,
                }
            });
            console.log('Response dados barbearia:', response.data);
            setBarbearia(response.data);
            // Verifica se existe celularNegocio e se é um array
            if (response.data.celularNegocio && Array.isArray(response.data.celularNegocio)) {
                setContatos(response.data.celularNegocio);
            } else {
                setContatos([{ telefone: '(11) 98080-8080' }]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar o perfil da barbearia:', error);
            setLoading(false);
        }
    };

    const fetchServicosBarbearia = async () => {
        try {
            console.log('Fetching servicos da barbearia (cliente):');
            const response = await api.get(`servicos/client-side/12`, {
                headers: {
                    Authorization: token,
                }
            });
            console.log('Response servicos barbearia:', response.data);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os serviços da barbearia:', error);
        }
    };

    const fetchFuncionariosBarbearia = async () => {
        try {
            console.log('Fetching servicos da barbearia (cliente):');
            const response = await api.get(`servicos/client-side/12`, {
                headers: {
                    Authorization: token,
                }
            });
            console.log('Response servicos barbearia:', response.data);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os serviços da barbearia:', error);
        }
    };

    useEffect(() => {
        if (!token) {
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
    }, [token]);
    
    useEffect(() => {
        fetchPerfilBarbearia();
        fetchServicosBarbearia();
    }, []);

    useEffect(() => {
        if (barbearia) {
            fetchMapaGoogle(`${barbearia.logradouro}, ${barbearia.numero}, ${barbearia.cep}, ${barbearia.cidade}`);
        }
    }, [barbearia]);

    if (loading) {
        return <div>Carregando...</div>;
    }

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

            <div className={styles.visualizarBarbearia}>
                <div className={styles.containerVisualizarBarbearia}>
                    <div className={styles.conteudoVisualizarBarbearia}>
                        {barbearia && (
                            <>
                                <div className={styles.nomeAvaliacaoBarbearia}>
                                    <NomeAvaliacaoBarbearia
                                        nome={barbearia.nomeNegocio}
                                        horario={barbearia.diaSemanas} />
                                </div>

                                <div className={styles.bannerFotoPerfilBarbearia}>
                                    <div className={styles.bannerBarbearia}>
                                        <img src={barbearia.imgBanner || bannerBarbearia} alt="" />
                                    </div>

                                    <div className={styles.circuloPerfilBarbearia}>
                                        <CirculoPerfilBarbearia fotoPerfil={barbearia.imgPerfil} />
                                    </div>
                                </div>

                                <div className={styles.servicosMapaEnderecoBarbearia}>
                                    <div className={styles.esquerdaServicos}>
                                        <div className={styles.tituloServicos}>
                                            <span>Serviços</span>
                                        </div>

                                        <div className={styles.servicosBarbearia}>
                                            {servicos.map((servico, index) => (
                                                <LinhaServicos
                                                    key={index}
                                                    index={index}
                                                    selectedIndex={selectedIndex}
                                                    onSelect={handleSelect}
                                                    nomeServico={servico.tipoServico}
                                                    descricaoServico={servico.descricao}
                                                    valorServico={servico.preco}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.direitaMapaEnderecoContatoBarbearia}>
                                        <div className={styles.mapaBarbearia}>
                                            <Mapa latitude={latitude} longitude={longititude}/>
                                        </div>

                                        <div className={styles.enderecoBarbearia}>
                                            <div className={styles.linhaLateral}></div>
                                            <div className={styles.spansEnderecoBarbearia}>
                                                <div className={styles.spanRua}>
                                                    <span>{barbearia.logradouro}, {barbearia.numero}</span>
                                                </div>
                                                <div className={styles.spanBairroCep}>
                                                    <span>{barbearia.cep} - {barbearia.cidade}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.contatoBarbearia}>
                                            <div className={styles.linhaLateral}></div>
                                            <div className={styles.tituloSpansContatoBarbearia}>
                                                <div className={styles.tituloContatos}>
                                                    <span>Contato</span>
                                                </div>
                                                <div className={styles.spansContatoBarbearia}>
                                                    {contatos.map((contato, index) => (
                                                        <span key={index}>{contato.telefone}</span>
                                                    ))}
                                                </div>
                                                <div className={styles.botaoEntrarEmContato}>
                                                    <button>
                                                        <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M23.3254 2.67228C21.2289 1.60871 18.7948 1 16.1987 1C8.32677 1 1.94531 6.59644 1.94531 13.5C1.94531 15.4996 2.4807 17.3895 3.4326 19.0656C3.68557 19.511 3.76976 20.0201 3.62311 20.5007L2.77416 23.2834C2.40563 24.4913 3.66571 25.5963 5.04307 25.2731L8.21594 24.5286C8.76404 24.4 9.34455 24.4739 9.85243 24.6956C11.7636 25.5305 13.9186 26 16.1987 26C24.0706 26 30.4521 20.4035 30.4521 13.5C30.4521 11.2232 29.758 9.08859 28.5453 7.25" stroke="#F4F3EE" stroke-width="2" stroke-linecap="round" />
                                                        </svg>
                                                        Entre em contato
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.conteudoNossaEquipeAvaliacoes}>
                                    <div className={styles.nossaEquipe}>
                                        <div className={styles.tituloNossaEquipe}>
                                            <span>Nossa equipe</span>
                                        </div>
                                        <div className={styles.fotosEquipe}>
                                            <FotoPerfilEquipe />
                                            <FotoPerfilEquipe />
                                            <FotoPerfilEquipe />
                                            <FotoPerfilEquipe />
                                            <FotoPerfilEquipe />
                                            <FotoPerfilEquipe />
                                            <FotoPerfilEquipe />
                                        </div>
                                    </div>

                                    <div className={styles.avaliacoes}>
                                        <div className={styles.tituloAvaliacoes}>
                                            <span>Avaliações</span>
                                        </div>
                                        <div className={styles.cardAvaliacoes}>
                                            <CardAvaliacoesVisualizarBarbearia />
                                            <CardAvaliacoesVisualizarBarbearia />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </ThemeProvider>
    );
}

export default VisualizarBarbearia;
