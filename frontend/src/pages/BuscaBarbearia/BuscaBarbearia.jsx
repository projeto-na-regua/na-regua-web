import React, { useState, useEffect } from "react"
import styles from './BuscaBarbearia.module.css'
import { Footer } from "../../components/Footer/Footer"
import CardBarbeariaEncontrada from "../../components/CardBarbeariaEncontrada/CardBarbeariaEncontrada.jsx"
import logo from '../../utils/assets/logo-scale0.svg'
import Header from "../../components/Header/Header"
import { theme } from '../../theme'
import { ThemeProvider } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import imgBarbeariaPadrao from '../../utils/assets/barbeariaPadrao.png'
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material'
import api from '../../api.js'
import AccountMenu from '../../components/AccountMenu/AccountMenu.jsx'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export function BuscaBarbearia() {
    const navigate = useNavigate()
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const [isAuth, setIsAuth] = useState(false)
    const token = JSON.parse(sessionStorage.getItem('user'))
    const [open, setOpen] = useState(false)
    const [barbearias, setBarbearias] = useState([])
    const [imgPerfil, setImgPerfil] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!token) {
            setIsAuth(false)
        } else {
            setIsAuth(true)
        }
    }, [token])

    useEffect(() => {
        fetchBarbearias()
    }, [])

    const fetchBarbearias = async () => {
        try {
            setLoading(true) // Inicia o estado de carregamento
            console.log('Fetching barbearias (cliente):')

            const searchParams = new URLSearchParams(window.location.search)
            const servico = searchParams.get('servico')
            const localizacao = searchParams.get('localizacao')
            const data = searchParams.get('data')
            const horario = searchParams.get('horario')

            const response = await api.get('pesquisa/client-side', {
                headers: {
                    Authorization: token,
                },
                params: {
                    servico,
                    localizacao,
                    data,
                    horario
                }
            })

            console.log('Response fetch barbearias:', response.data)
            setBarbearias(response.data)
            var imagens = []
            for (var i = 0; i < response.data.length; i++) {
                imagens[i] = response.data[i].imgPerfil
                console.log(imagens)
            }
            setImgPerfil(imagens)
        } catch (error) {
            console.error('Erro ao buscar as barbearias:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100vh'
            }}>
                <div className={styles.header}>
                    <Header
                        esquerda={<img onClick={() => navigate('/')} src={logo} alt='logo-na-regua' style={{ width: '70%' }} />}
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

                <div className={`${styles.fullHeightBg} ${styles.perfilContainer}`}>
                    <div className={styles.containerBuscarBarbearias}>
                        <div className={styles.conteudoBuscarBarbearias}>
                            {loading ? (
                                <div>
                                    <Grid container spacing={2}>
                                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Box display="flex" flexDirection="column" alignItems="center">
                                                    <Skeleton variant="rectangular" width={300} height={150} />
                                                    <Skeleton variant="text" width={200} height={30} style={{ marginTop: '16px' }} />
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            ) : barbearias.length === 0 ? (
                                <div className={styles.nenhumaBarbeariaEncontrada}>
                                    <SentimentVeryDissatisfiedIcon style={{ fontSize: 100, color: '#082031' }} />

                                    <Typography variant='body1' style={{ color: '#082031', fontWeight: 600, width: 400, textAlign: 'center' }}>
                                        Não encontramos nenhuma barbearia com os filtros selecionados.
                                        Tente novamente com outros filtros :)
                                    </Typography>

                                    <Button onClick={() => navigate('/')} variant='contained' style={{ width: 200, marginTop: 16 }}>Voltar</Button>
                                </div>
                            ) : (
                                <div className={styles.CardsBarbeariaEncontrada}>
                                    {barbearias.map((barbearia, index) => (
                                        <CardBarbeariaEncontrada
                                            valor={barbearia.id}
                                            key={barbearia.id}
                                            nomeBarbearia={barbearia.nomeNegocio}
                                            endereco={`${barbearia.logradouro}, ${barbearia.numero}`}
                                            foto={imgPerfil[index] && /^https:\/\/upload0naregua\.blob\.core\.windows\.net\/upload\/.+/.test(imgPerfil[index]) ? imgPerfil[index] : imgBarbeariaPadrao}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default BuscaBarbearia
