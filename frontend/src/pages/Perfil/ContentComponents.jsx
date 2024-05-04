import React from 'react';
import CardAgendamento from '../../components/CardAgendamento/CardAgendamento';
import CardMeusCortes from '../../components/CardMeusCortes/CardMeusCortes';
import styles from './ContentComponents.module.css';

const agendamentos = [
  {
    dataHora: "2024-05-01T10:00:00",
    barbearia: "Barbearia do João",
    concluido: "Confirmado",
    endereco: "Rua das Flores, 123",
    preco: "R$ 50,00",
  },
  {
    dataHora: "2024-05-02T15:30:00",
    barbearia: "Barbearia do Carlos",
    concluido: "Pendente",
    endereco: "Avenida Principal, 456",
    preco: "R$ 35,00",
  },
  {
    dataHora: "2024-05-03T09:00:00",
    barbearia: "Barbearia do Pedro",
    concluido: "Cancelado",
    endereco: "Rua das Árvores, 789",
    preco: "R$ 40,00",
  },
  {
    dataHora: "2024-05-04T11:45:00",
    barbearia: "Barbearia do Miguel",
    concluido: "Confirmado",
    endereco: "Travessa dos Pássaros, 101",
    preco: "R$ 55,00",
  },
];

const cortes = [
  {
    title: "Teste 1", 
    description: "Description 1"
  },
  {
    title: "Teste 2", 
    description: "Description 2"
  },
]

export function AgendamentoContent() {
  return (
    <div className={styles["container-agendamentos"]}>
      {agendamentos.map(agendamento => (
        <CardAgendamento key={agendamento.dataHora} agendamento={agendamento} />
      ))}
    </div>
  );
}

export function CortesContent() {
  return (
    <div className={styles["container-meus-cortes"]}>
       {cortes.map(corte => (
        <CardMeusCortes key={corte.title} corte={corte} />
      ))}
  </div>
  );
}

export function HistoricoContent() {
  return (
    <div>
      {/* Conteúdo do histórico */}
    </div>
  );
}
