import React, { useState, useEffect } from 'react'
import styles from "./Perfil.module.css"
import api from '../../../api.js'
import CircularProgress from '@mui/material/CircularProgress'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../theme.js'
import HeaderUsuario from '../../../components/HeaderUsuario/HeaderUsuario.jsx'
import NavbarCliente from '../../../components/NavbarCliente/NavbarCliente.jsx'
import Agendamento from '../../../components/CardAgendamento/CardAgendamento.jsx'

function Perfil() {
  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(false)

  const token = JSON.parse(sessionStorage.getItem('user'))

  const fetchMeusAgendamentos = async () => {
    try {
      console.log('Fetching meus agendamentos (cliente):')

      const response = await api.get('agendamentos/list-all-by-status/none', {
        headers: {
          Authorization: token,
        }
      })

      setAgendamentos(response.data)
    } catch (error) {
      if (error.response) {
        console.error('Erro ao buscar os agendamentos!')
        console.error('Error response:', error.response.data)
      } else {
        console.error('Erro ao tentar se conectar ao servidor!')
        console.error('Error:', error.message)
      }
    } finally {
      setLoading(true)
    }
  }

  useEffect(() => {
    fetchMeusAgendamentos()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={`${styles.fullHeightBg} ${styles.perfilContainer}`}>
        <HeaderUsuario />

        <NavbarCliente />

        <div className={styles.cardsAgendamento}>
          <div className={styles.conteudoCardsAgendamento}>
            {!loading ? <CircularProgress /> : (
              agendamentos.length > 0 ? (
                agendamentos.map((agendamento, index) => (
                  <Agendamento
                    key={index}
                    dataHora={new Date(agendamento.dataHora).toLocaleDateString('pt-BR')}
                    barbearia={agendamento.nomeNegocio}
                    concluido={agendamento.status}
                    endereco={`${agendamento.enderecoBarbearia.logradouro}, ${agendamento.enderecoBarbearia.numero} - ${agendamento.enderecoBarbearia.cidade}`}
                    preco={`R$${agendamento.valorServico.toFixed(2).replace('.', ',')}`}
                  />
                ))
              ) : (
                <div className={styles.noAgendamentos}>Nenhum agendamento encontrado.</div>
              )
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Perfil
