import React, { useState, useEffect } from 'react';
import styles from "./Perfil.module.css";
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import NavbarCliente from '../../components/NavbarCliente/NavbarCliente';
import Agendamento from '../../components/CardAgendamento/CardAgendamento';
import api from '../../api.js';
import dayjs from 'dayjs';

function Perfil() {
  const [activeTab, setActiveTab] = useState('agendamentos');
  const [agendamentos, setAgendamentos] = useState([]);

  const token = JSON.parse(sessionStorage.getItem('user'));

  const fetchMeusAgendamentos = async () => {
    try {
      console.log('Fetching meus agendamentos (cliente):');

      const response = await api.get('agendamentos/list-all-by-status/none', {
        headers: {
          Authorization: token,
        }
      });

      console.log('Response:', response.data);
      setAgendamentos(response.data);  // Armazena os dados no estado

    } catch (error) {
      if (error.response) {
        console.error('Erro ao buscar os agendamentos!');
        console.error('Error response:', error.response.data);
      } else {
        console.error('Erro ao tentar se conectar ao servidor!');
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchMeusAgendamentos();
  }, []);

  return (
    <div>
      <div>
        <HeaderUsuario />
      </div>
      <div>
        <NavbarCliente setActiveTab={setActiveTab} />
        <div className={styles.cardsAgendamento}>
          <div className={styles.conteudoCardsAgendamento}>
            {agendamentos.map((agendamento, index) => (
              <Agendamento
              key={index}
              dataHora={dayjs(agendamento.dataHora).format('DD/MM/YYYY')} // Formata a data
              barbearia={agendamento.nomeNegocio}
              concluido={agendamento.status}
              endereco={`${agendamento.enderecoBarbearia.logradouro}, ${agendamento.enderecoBarbearia.numero} - ${agendamento.enderecoBarbearia.cidade}`}
              preco={`R$ ${parseFloat(agendamento.valorServico).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
