import React, { useEffect, useState } from "react";
import styles from "./BoxBarbeariaHistorico.module.css";
import { Button } from '@mui/material';
import { format } from 'date-fns';
import api from '../../api';
import { ThemeProvider } from '@mui/material'
import { theme } from '../../theme'
import { ModalAvaliacao } from '../../components/ModalAvaliacao/ModalAvaliacao';
import { ModalVisualizacaoAvaliacao } from '../../components/ModalAvaliacao/ModalVisualizacaoAvaliacao';
import imagemPerfilDefault from '../../utils/assets/imagem-perfil.svg'
import { toast } from "react-toastify";

function BoxBarbeariaHistorico() {
  const token = JSON.parse(sessionStorage.getItem('user'));
  const [agendamentos, setAgendamentos] = useState([]);
  const [openModalAvaliacao, setOpenModalAvaliacao] = useState(false);
  const [openModalVisualizacao, setOpenModalVisualizacao] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
 
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get('/agendamentos/historico', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (response.status !== 200) {
          throw new Error('Falha ao carregar os dados');
        } else {
          const agendamentosFormatados = response.data.map(agendamento => ({
            id: agendamento ? agendamento.id : null,
            imgBarbearia: agendamento ? agendamento.imgPerfilBarbearia : imagemPerfilDefault,
            nomeBarbearia: agendamento ? agendamento.nomeNegocio : 'Nome não disponível',
            dataAgendamento: agendamento ? format(new Date(agendamento.dataHora), 'dd/MM/yyyy') : "00/00/0000",
            endereco: agendamento ? `${agendamento.enderecoBarbearia.logradouro}, ${agendamento.enderecoBarbearia.numero} - ${agendamento.enderecoBarbearia.estado}` : 'Endereço não disponível',
            servico: agendamento ? agendamento.tipoServico : "N/A",
            valor: agendamento ? agendamento.valorServico : "N/A",
            barbeiro: agendamento ? agendamento.nomeBarbeiro : "N/A",
            avaliacao: agendamento ? agendamento.avaliacao : null,
            comentario: agendamento ? agendamento.comentario : null,
            avaliado: !!(agendamento.avaliacao || agendamento.comentario)
          }));
          setAgendamentos(agendamentosFormatados);

          console.log(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
        console.error('Status:', error.response ? error.response.status : 'Erro desconhecido');
      }
    };

    fetchAgendamentos();
  }, [token]);

  const handleOpenModal = (agendamento) => {
    setSelectedAgendamento(agendamento);
    if (agendamento.avaliado) {
      setOpenModalVisualizacao(true);
    } else {
      setOpenModalAvaliacao(true);
    }
  };

  const handleCloseModalAvaliacao = () => {
    setOpenModalAvaliacao(false);
    setSelectedAgendamento(null);
  };

  const handleCloseModalVisualizacao = () => {
    setOpenModalVisualizacao(false);
    setSelectedAgendamento(null);
  };

  const formatRating = (rating) => {
    return parseFloat(rating.toFixed(2));
  };

  const handleSaveRating = async (idAgendamento, rating, comentario) => {
    try {
        const data = {
            resultadoAvaliacao: formatRating(rating),
            comentario: comentario,
        };

        // Imprimindo o objeto data como string JSON para depuração
        console.log("Dados enviados: " + JSON.stringify(data));
        console.log(data);

        const response = await api.post(
            `/agendamentos/avaliar/${idAgendamento}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
        );

        console.log("Resposta da API: ", response);

        if (response.status !== 200) {
            throw new Error('Erro ao enviar avaliação');
        }

        setAgendamentos(prevAgendamentos =>
            prevAgendamentos.map(agendamento =>
                agendamento.id === idAgendamento
                    ? { ...agendamento, avaliacao: formatRating(rating), comentario: comentario, avaliado: true }
                    : agendamento
            )
        );
        toast.success("Avaliação enviada com sucesso!");
        handleCloseModalAvaliacao();
        console.log(agendamentos)
    } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
        if (error.response) {
            console.error('Resposta do erro: ', error.response);
        }
        toast.error('Erro ao enviar avaliação. Tente novamente mais tarde.');
    }
};
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.divTodo}>
        <div className={styles.container}>
          <div className={styles.gridCards}>
            {agendamentos.map((agendamento, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.divBarbearia}>
                  <div className={styles.dataAgendamento}>{agendamento.dataAgendamento}</div>
                  <div className={styles.imagem}><img src={agendamento.imgBarbearia} alt="foto de perfil barbearia" /></div>
                  <div className={styles.titulo}> {agendamento.nomeBarbearia}</div>
                </div>
                <div className={styles.informacoes}>
                  <div className={styles.containerInformacoes}>
                    <div className={styles.tituloInformacoes}>Informações do agendamento</div>
                    <div className={styles.dados}>Local: {agendamento.endereco}</div>
                    <div className={styles.dados}>Serviço: {agendamento.servico}</div>
                    <div className={styles.dados}>Valor: {agendamento.valor}</div>
                    <div className={styles.dados}>Barbeiro: {agendamento.barbeiro}</div>
                    <div className={styles.botao}>
                      <Button
                        style={{ width: '100%', height: '50px' }}
                        variant={agendamento.avaliado ? 'containedBlue' : 'contained'}
                        onClick={() => handleOpenModal(agendamento)}
                      >
                        {agendamento.avaliado ? 'Avaliação enviada' : 'Enviar avaliação'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedAgendamento && (
          <>
            <ModalAvaliacao
              open={openModalAvaliacao}
              handleClose={handleCloseModalAvaliacao}
              onSave={(rating, comentario) => handleSaveRating(selectedAgendamento.id, rating, comentario)}
            />
            <ModalVisualizacaoAvaliacao
              open={openModalVisualizacao}
              handleClose={handleCloseModalVisualizacao}
              avaliacao={selectedAgendamento.avaliacao}
              comentario={selectedAgendamento.comentario}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default BoxBarbeariaHistorico;
