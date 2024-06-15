import React, { useEffect, useState } from 'react'
import HeaderUsuario from '../../../components/HeaderUsuario/HeaderUsuario'
import NavbarBarbeiro from '../../../components/NavbarBarbeiro/NavbarBarbeiro'
import { Typography } from '@mui/material'
import { CardHorario } from '../../../components/CardHorario/CardHorario'
import api from '../../../api'

function AgendamentoBarbearia() {
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [compromissos, setCompromissos] = useState([])
  const [status, setStatus] = useState('Agendado')

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get(`/agendamentos/list-all-by-status/${status}`, {
          headers: {
            Authorization: token
          }
        })

        setCompromissos(response.data)
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error)
      }
    }

    fetchAgendamentos()
  }, [token, status])

  const formatarDataHora = (dataHora) => {
    const data = new Date(dataHora);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    return `${dia}/${mes}/${ano} às ${hora}:${minutos < 10 ? '0' + minutos : minutos}`;
  };

  return (
    <div>
      <HeaderUsuario />

      <NavbarBarbeiro />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 40px 20px 40px',
        gap: 24
      }}>
        <Typography variant="h6">
          Sua agenda de hoje
        </Typography>

        <div style={{
          height: 200,
          backgroundColor: '#082031',
          borderRadius: 24,
          display: 'flex',
          gap: 32,
          alignItems: 'center',
          padding: 16,
          overflowX: 'auto',
          overflowY: 'hidden'
        }}>
          {compromissos.length === 0 ? (
            <Typography variant="body1" style={{ color: 'white' }}>
              Nenhum compromisso agendado para hoje
            </Typography>
          )
            : compromissos.map((compromisso, index) => (
              <CardHorario
                key={index}
                nomeCliente={compromisso.nomeCliente}
                horario={formatarDataHora(compromisso.dataHora)}
                duracao={compromisso.tempoEstimado}
                servico={compromisso.tipoServico}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default AgendamentoBarbearia
