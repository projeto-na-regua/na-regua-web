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
import imgBarbeariaPadrao from '../../utils/assets/barbeariaPadrao.png'
import bannerBarbeariaPadrao from '../../utils/assets/bannerBarbearia.jpg';
import api from "../../api.js";
import Mapa from "../../components/Mapa/mapa.jsx";
import AccountMenu from '../../components/AccountMenu/AccountMenu.jsx'

export function VisualizarBarbearia() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const valor = queryParams.get('valor');

    const [isAuth, setIsAuth] = useState(false);
    const token = JSON.parse(sessionStorage.getItem('user'));
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [barbearia, setBarbearia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [servicos, setServicos] = useState([])
    const [contatos, setContatos] = useState([])
    const [latitude, setLatitude] = useState();
    const [longititude, setLongitude] = useState();
    const [funcionarios, setFuncionarios] = useState([]);
    const [imgPerfil, setImgPerfil] = useState();
    const [imgBanner, setImgBanner] = useState();
    const [imgPerfilFuncionarios, setImgPerfilFuncionarios] = useState([])
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [avaliacoesCarregadas, setAvaliacoesCarregadas] = useState(false);
    const [mediaAvaliacao, setMediaAvaliacao] = useState();
    const valoresAvaliacoes = [];
    const avaliacoesFiltradas = [];

    useEffect(() => {
        if (!token) {
            setIsAuth(false);
        } else {
            setIsAuth(true);
        }
    }, [token]);

    const handleSelect = (index) => {
        setSelectedIndex(index);
        navigate(`/selecionar-data-hora?valor=${valor}`);
    };

    const fetchAvaliacoes = async () => {
        try {
            console.log('Fetching avaliacoes (cliente)');
            const response = await api.get(`agendamentos/cliente-side/ultimas-avaliacoes`, {
                headers: {
                    Authorization: token
                },
                params: {
                    qtd: 1000,
                    idBarbearia: valor
                }
            });
            var j = 0;
            for (var i = 0; i < response.data.length; i++) {
                if (!(response.data[i].resultadoAvaliacao == null)) {
                    valoresAvaliacoes[j] = response.data[i].resultadoAvaliacao
                    avaliacoesFiltradas[j] = response.data[i]
                    j++;
                }
            }
            setMediaAvaliacao(mediaAvaliacaoBarbearia(valoresAvaliacoes))
            setAvaliacoes(avaliacoesFiltradas);
            setAvaliacoesCarregadas(true); // Marca as avaliações como carregadas
            console.log(response.data);
        } catch (error) {
            console.log('Erro as avaliações da barbearia: ' + error);
        }
    };

    function mediaAvaliacaoBarbearia(vetor) {
        var soma = 0;
        for (var i = 0; i < vetor.length; i++) {
            soma += vetor[i]
        }
        return soma / vetor.length;
    }

    const fetchImagePerfilFuncionarios = async () => {
        try {
            console.log('Fetching imagens de perfil da barbearia (cliente)');
            const response = await api.get(`funcionarios/client-side/get-image-perfil/${valor}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data)
            const imageBytesList = response.data;
            setImgPerfilFuncionarios(imageBytesList);

        } catch (error) {
            console.log('Erro ao buscar a imagem de perfil: ' + error);
        }
    };

    const fetchMapaGoogle = async (endereco) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=AIzaSyB_bpX4vjXwCdDSo5xd0E4tqIWOJexOJYQ`);
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
            setImgBanner(response.data.imgBanner)
            setImgPerfil(response.data.imgPerfil)
            console.log(imgBanner)
        } catch (error) {
            console.error('Erro ao buscar o perfil da barbearia:', error);
            setLoading(false);
        }
    };

    const fetchServicosBarbearia = async () => {
        try {
            console.log('Fetching servicos da barbearia (cliente):');
            const response = await api.get(`servicos/client-side/${valor}`, {
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
            console.log('Fetching funcionarios da barbearia (cliente):');
            const response = await api.get(`funcionarios/client-side/${valor}`, {
                headers: {
                    Authorization: token,
                }
            });
            console.log('Response funcionarios barbearia:', response.data);
            setFuncionarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar os funcionarios da barbearia:', error);
        }
    };

    useEffect(() => {
        fetchPerfilBarbearia();
        fetchServicosBarbearia();
        fetchFuncionariosBarbearia();
        fetchImagePerfilFuncionarios();
        fetchAvaliacoes();
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
                                ? <AccountMenu />
                                : <Button onClick={() => navigate('/login')} variant='contained' style={{ width: 100 }}>Entrar</Button>
                            }
                        </div>
                    }
                />
            </div>

            <div className={styles.visualizarBarbearia}>
                <div className={styles.containerVisualizarBarbearia}>
                    <div className={styles.conteudoVisualizarBarbearia}>
                        {barbearia && avaliacoesCarregadas ? (
                            <>
                                <div className={styles.nomeAvaliacaoBarbearia}>
                                    <NomeAvaliacaoBarbearia
                                        nome={barbearia.nomeNegocio}
                                        horario={barbearia.diaSemanas}
                                        avaliacao={mediaAvaliacao} />
                                </div>

                                <div className={styles.bannerFotoPerfilBarbearia}>
                                    <div className={styles.bannerBarbearia}>
                                        <img
                                            src={imgBanner && /^https:\/\/upload0naregua\.blob\.core\.windows\.net\/upload\/.+/.test(imgBanner) ? imgBanner : bannerBarbeariaPadrao}
                                            alt=""
                                        />
                                    </div>





                                    <div className={styles.circuloPerfilBarbearia}>
                                        <CirculoPerfilBarbearia fotoPerfil={imgPerfil && /^https:\/\/upload0naregua\.blob\.core\.windows\.net\/upload\/.+/.test(imgPerfil) ? imgPerfil : imgBarbeariaPadrao} />

                                    </div>
                                </div>

                                <div className={styles.servicosMapaEnderecoBarbearia}>
                                    <div className={styles.esquerdaServicos}>
                                        <div className={styles.tituloServicos}>
                                            <span>Serviços</span>
                                        </div>

                                        <div className={styles.servicosBarbearia}>
                                            {Array.isArray(servicos) && servicos.map((servico, index) => (
                                                <LinhaServicos
                                                    key={index}
                                                    index={index}
                                                    valor={barbearia.id}
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
                                            <Mapa latitude={latitude} longitude={longititude} />
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
                                            {Array.isArray(funcionarios) && funcionarios.map((funcionario, index) => (
                                                <FotoPerfilEquipe key={index} nome={funcionario.nome} foto={imgPerfilFuncionarios[index] === 'https://upload0naregua.blob.core.windows.net/upload/' ? 'https://i.pinimg.com/736x/b1/aa/73/b1aa73786a14bf19fb208dfbf90488e5.jpg' : imgPerfilFuncionarios[index]} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.avaliacoes}>
                                        <div className={styles.tituloAvaliacoes}>
                                            <span>Avaliações</span>
                                        </div>
                                        <div className={styles.cardAvaliacoes}>
                                            {Array.isArray(avaliacoes) && avaliacoes.map((avaliacao, index) => (
                                                <CardAvaliacoesVisualizarBarbearia
                                                    key={index}
                                                    nomeCliente={avaliacao.nomeCliente}
                                                    dataAvaliacao={avaliacao.data}
                                                    comentario={avaliacao.comentario}
                                                    estrelas={avaliacao.resultadoAvaliacao}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>Carregando...</div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </ThemeProvider>
    );
}

export default VisualizarBarbearia;
