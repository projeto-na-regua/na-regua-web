import React, { useState, useEffect } from "react"
import styles from './BuscaBarbearia.module.css'
import { Footer } from "../../components/Footer/Footer"
import LinhaFiltroBuscarBarbearia from "../../components/LinhaFiltroBuscarBarbearia/LinhaFiltroBuscarBarbearia"
import CardBarbeariaEncontrada from "../../components/CardBarbeariaEncontrada/CardBarbeariaEncontrada.jsx"
import logo from '../../utils/assets/logo-scale0.svg'
import Header from "../../components/Header/Header"
import { theme } from '../../theme'
import { ThemeProvider } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx'
import imgBarbeariaPadrao from '../../utils/assets/barbeariaPadrao.png'
import { Button, CircularProgress } from '@mui/material'
import api from '../../api.js'
import AccountMenu from '../../components/AccountMenu/AccountMenu.jsx'

export function BuscaBarbearia() {
    const navigate = useNavigate()
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const [isAuth, setIsAuth] = useState(false)
    const token = JSON.parse(sessionStorage.getItem('user'))
    const [open, setOpen] = useState(false)
    const [barbearias, setBarbearias] = useState([])
    const [imgPerfil, setImgPerfil] = useState([])
    const [loading, setLoading] = useState(false) // Estado para indicar carregamento

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
            setLoading(false) // Finaliza o estado de carregamento
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

                <div className={`${styles.fullHeightBg} ${styles.perfilContainer}`}>
                    <div className={styles.containerBuscarBarbearias}>
                        <div className={styles.conteudoBuscarBarbearias}>
                            {loading ? (
                                <div className={styles.loadingContainer}>
                                    <CircularProgress />
                                    <span>Carregando barbearias...</span>
                                </div>
                            ) : barbearias.length === 0 ? (
                                <div className={styles.nenhumaBarbeariaEncontrada}>
                                    <span>Nenhuma barbearia encontrada de acordo com sua pesquisa.</span>
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
