import React, { useState, useEffect } from 'react'
import styles from './SelecionarDataHora.module.css'
import { Footer } from '../../components/Footer/Footer'
import logo from '../../utils/assets/logo-scale0.svg'
import Header from '../../components/Header/Header'
import LinhaServicos from '../../components/LinhaServicos/LinhaServicos.jsx'
import CardHorarioDisponivel from '../../components/CardHorarioDisponivel/CardHorarioDisponivel.jsx'
import { theme } from '../../theme'
import { ThemeProvider } from '@emotion/react'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuLateralUsuario from '../../components/MenuLateralUsuario/MenuLateralUsuario.jsx'
import { Button } from '@mui/material'
import FotoPerfilEquipe from '../../components/FotoPerfilEquipe/FotoPerfilEquipe.jsx'
import api from '../../api.js'
import { toast } from 'react-toastify'
import AgendaFullCalendar from '../../components/AgendaFullCalendar/AgendaFullCalendar.jsx'
import 'react-toastify/dist/ReactToastify.css'
import AccountMenu from '../../components/AccountMenu/AccountMenu.jsx'

export function SelecionarDataHora() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const valor = queryParams.get('valor')

    const [isAuth, setIsAuth] = useState(false)
    const token = JSON.parse(sessionStorage.getItem('user'))
    const [open, setOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [showHorariosDisponiveis, setShowHorariosDisponiveis] = useState(false)
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [funcionarios, setFuncionarios] = useState([])
    const [servicos, setServicos] = useState([])
    const [selectedService, setSelectedService] = useState(null)
    const [selectedFuncionario, setSelectedFuncionario] = useState(null)
    const [selectedHorario, setSelectedHorario] = useState(null)
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)
    const [imgPerfilFuncionarios, setImgPerfilFuncionarios] = useState([])
    const [horarioSelecionado, setHorarioSelecionado] = useState(null)

    const handleSelectService = (serviceId) => {
        setSelectedService(serviceId)
        console.log('IdServico selecionado: ' + serviceId)
        fetchFuncionariosBarbearia(serviceId)
    }

    const handleSelectFuncionario = (funcionarioId) => {
        setSelectedFuncionario(funcionarioId)
        setFuncionarioSelecionado(funcionarioId)
    }


    const handleSelecionarHorario = (horario) => {
        setSelectedHorario(horario)
        setHorarioSelecionado(horario)
    }

    const handleNavigate = () => {
        navigate('/perfil/agendamentos')
    }

    const handleClick = () => {
        handleAgendar()
    }


    const handleSelect = (index) => {
        setSelectedIndex(index)
    }

    useEffect(() => {
        fetchServicosBarbearia()
        if (!token) {
            setIsAuth(false)
        } else {
            setIsAuth(true)
        }
    }, [token])

    const handleDateChange = (date) => {
        setSelectedDate(date)
        fetchHorariosDisponiveis(date.format('YYYY-MM-DD'))
    }

    const handleAgendar = () => {
        console.log(selectedService, selectedFuncionario, selectedDate, selectedHorario)
        if (selectedService && selectedFuncionario && selectedDate && selectedHorario) {
            const agendamento = {
                idBarbearia: valor,
                idServico: selectedService,
                idBarbeiro: selectedFuncionario,
                dataHora: `${selectedDate.format('YYYY-MM-DD')} ${selectedHorario}:00`
            }
            console.log(agendamento)

            const loadingToastId = toast.loading("Finalizando seu agendamento...")

            fetchAgendar(agendamento)
                .then(() => {
                    toast.dismiss(loadingToastId) // Remove o toast de carregamento
                    handleNavigate()
                })
                .catch((error) => {
                    toast.dismiss(loadingToastId) // Remove o toast de carregamento em caso de erro
                    console.error('Erro ao agendar:', error)
                })
        } else {
            toast.error('Por favor, selecione todos os campos necessários para agendar.')
        }
    }

    const fetchImagePerfilFuncionarios = async () => {
        try {
            console.log('Fetching imagens de perfil da barbearia (cliente)')
            const response = await api.get(`funcionarios/client-side/get-image-perfil/${valor}`, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response.data)
            const imageBytesList = response.data
            setImgPerfilFuncionarios(imageBytesList)
        } catch (error) {
            console.log('Erro ao buscar a imagem de perfil: ' + error)
        }
    }

    const fetchAgendar = async (agendamento) => {
        try {
            console.log('Fetching agendamento:' + agendamento)
            const response = await api.post(`/agendamentos`, agendamento, {
                headers: {
                    Authorization: token,
                }
            })
            toast.success("Agendamento feito com sucesso!")
            console.log('Agendado com sucesso:', response.data)
        } catch (error) {
            console.error('Erro ao agendar:', error)
        }
    }


    const barbeiroServicoId = {
        barbeiro: selectedFuncionario,
        servico: selectedService,
        barbearia: valor
    }

    const fetchServicosBarbearia = async () => {
        try {
            console.log('Fetching servicos da barbearia (cliente):')
            const response = await api.get(`servicos/client-side/${valor}`, {
                headers: {
                    Authorization: token,
                }
            })
            console.log('Response servicos barbearia:', response.data)
            setServicos(response.data)
        } catch (error) {
            console.error('Erro ao buscar os serviços da barbearia:', error)
        }
    }

    const fetchFuncionariosBarbearia = async (service) => {
        fetchImagePerfilFuncionarios()
        try {
            console.log('Fetching funcionarios da barbearia (cliente):')
            const response = await api.get(`funcionarios/client-side/list-by-servico/${service}`, {
                headers: {
                    Authorization: token,
                }
            })
            console.log('Response funcionarios barbearia:', response.data)
            setFuncionarios(response.data)
        } catch (error) {
            console.error('Erro ao buscar os funcionarios da barbearia:', error)
        }
    }

    const fetchHorariosDisponiveis = async (dataAgendamento) => {
        try {
            console.log('Fetching horários disponíveis para:', dataAgendamento)
            const response = await api.get('agendamentos/list-horarios-disponiveis', {
                headers: {
                    Authorization: token,
                },
                params: {
                    barbeiro: selectedFuncionario,
                    servico: selectedService,
                    barbearia: valor,
                    date: dataAgendamento,
                },
            })
            console.log(
                selectedFuncionario, selectedService, valor, dataAgendamento
            )

            console.log('Response:', response.data[0].hora)

            if (response.data && response.data.length > 0) {

                var horarios = []

                for (var i = 0; i < response.data.length; i++) {
                    horarios[i] = response.data[i].hora
                }
                console.log(horarios)
                setHorariosDisponiveis(horarios)
                setShowHorariosDisponiveis(true)
            } else {
                setHorariosDisponiveis([])
                setShowHorariosDisponiveis(false)
                toast.info('Não há horários disponíveis para a data selecionada.')
            }
        } catch (error) {
            if (error.response) {
                toast.error('Erro ao buscar horários disponíveis!')
                console.error('Error response:', error.response.data)
            } else {
                toast.error('Erro ao tentar se conectar ao servidor!')
                console.error('Error:', error.message)
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.header}>
                <Header
                    esquerda={<img src={logo} alt='logo-na-regua' style={{ width: '70%' }} />}

                    direita={<div>
                        {isAuth
                            ? <AccountMenu />
                            : <Button onClick={() => navigate('/login')} variant='contained' style={{ width: 100 }}>Entrar</Button>}
                    </div>}
                />
            </div>

            <div className={styles.selecionarServicoDataHora}>
                <div className={styles.containerSelecionarServicoDataHora}>
                    <div className={styles.conteudoSelecionarServicoDataHora}>
                        <div className={styles.breadCrumbs}>
                            <span onClick={() => navigate('/busca-barbearias')}>Buscar</span>
                            <span>{">"}</span>
                            <span onClick={() => navigate(-1)}>Perfil Dom Bigode</span>
                            <span>{">"}</span>
                            <span>Selecionar Horário</span>
                        </div>

                        <div className={styles.servicos}>
                            <div className={styles.tituloServico}>
                                <span>Selecionar serviço</span>
                            </div>

                            <div className={styles.servicosDisponiveis}>
                                {Array.isArray(servicos) &&
                                    servicos.map((servico, index) => (
                                        <LinhaServicos
                                            key={index}
                                            index={index}
                                            selectedIndex={selectedIndex}
                                            onSelect={() => {
                                                handleSelect(index)
                                                handleSelectService(servico.id)
                                            }}
                                            nomeServico={servico.tipoServico}
                                            descricaoServico={servico.descricao}
                                            valorServico={servico.preco}
                                        />
                                    ))}
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
                                {Array.isArray(funcionarios) && funcionarios.map((funcionario, index) => (
                                    <FotoPerfilEquipe
                                        key={funcionario.id}
                                        valor={funcionario.id}
                                        nome={funcionario.nome}
                                        foto={imgPerfilFuncionarios[index] == 'https://upload0naregua.blob.core.windows.net/upload/' ? 'https://i.pinimg.com/736x/b1/aa/73/b1aa73786a14bf19fb208dfbf90488e5.jpg' : imgPerfilFuncionarios[index]}
                                        onSelect={() => handleSelectFuncionario(funcionario.id)}
                                        selecionado={funcionario.id === funcionarioSelecionado}
                                        cursorPointer={true}
                                    />
                                ))}
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

                            <div className={styles.calendarioHorario}>
                                <div className={styles.selecionarDataHoraEsquerda}>
                                    <div className={styles.agenda}>
                                        <AgendaFullCalendar handleDateChange={handleDateChange} />
                                    </div>
                                </div>

                                {selectedDate && showHorariosDisponiveis && horariosDisponiveis.length > 0 && (
                                    <div className={styles.selecionarDataHoraDireita}>
                                        {horariosDisponiveis.map((horario, index) => (
                                            <CardHorarioDisponivel
                                                key={index}
                                                horario={horario}
                                                onSelect={() => handleSelecionarHorario(horario)}
                                                isSelected={horario === horarioSelecionado}
                                            />
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className={styles.botaoAgendar}>
                            <Button
                                variant='contained'
                                style={{
                                    width: '20%',
                                    fontWeight: '600'
                                }}
                                onClick={handleClick}>
                                Agendar
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </ThemeProvider>
    )
}

export default SelecionarDataHora
