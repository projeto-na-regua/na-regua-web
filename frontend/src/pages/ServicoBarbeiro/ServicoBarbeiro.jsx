import React, { useState, useEffect } from 'react';
import styles from './ServicoBarbeiro.module.css';
import api from '../../api';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import { toast } from 'react-toastify';
import { theme } from '../../theme';
import {
  Button,
  TextField,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
} from '@mui/material';
import BoxServicos from '../../components/BoxServicos/BoxServicos';

const durations = Array.from({ length: 10 }, (_, i) => 30 + i * 15);

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours} h ${mins > 0 ? `${mins} m` : ''}`;
  }
  return `${mins} m`;
};

export function ServicoBarbeiro() {
  const [open, setOpen] = useState(false);
  const token = JSON.parse(sessionStorage.getItem('user'));
  const [durationOpen, setDurationOpen] = useState(false);
  const [serviceDuration, setServiceDuration] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceValue, setServiceValue] = useState('');
  const [responsaveis, setResponsaveis] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [listaServicos, setListaServicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [funcionarios, setFuncionarios] = useState([]);
  const [carregandoFuncionarios, setCarregandoFuncionarios] = useState(true);

  const pegarFuncionario = async () => {
    try {
      const response = await api.get('/funcionarios', {
        headers: {
          Authorization: token,
        },
      });

      // Mapeia a resposta para retornar apenas nome e email
      return response.data.map((funcionario) => ({
        nome: funcionario.nome,
        email: funcionario.email,
      }));
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      toast.error('Erro ao buscar funcionários. Por favor, tente novamente.');
      return []; // Retorna um array vazio em caso de erro
    }
  };

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const funcionariosData = await pegarFuncionario();
        setFuncionarios(funcionariosData);
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
      } finally {
        setCarregandoFuncionarios(false);
      }
    };

    fetchFuncionarios();
  }, []); // Não inclui nenhuma dependência, pois não precisamos recarregar

  const mandarDados = async () => {
    try {
      const barbeirosEmails = responsaveis.map((nome) =>
        funcionarios.find((funcionario) => funcionario.nome === nome)?.email
      ).filter(email => email); // Filtra emails válidos

      let response = await api.post('/servicos', {
        preco: parseFloat(serviceValue), // Converte para float
        descricao: serviceDescription,
        tipoServico: serviceName,
        tempoEstimado: parseInt(serviceDuration), // Converte para integer
        barbeirosEmails: barbeirosEmails, // Inclui a lista de emails dos barbeiros selecionados
        status: true, // Definindo o status como true por padrão ao cadastrar
      }, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 201) {
        setListaServicos([...listaServicos, response.data]);

        setServiceName('');
        setServiceDescription('');
        setServiceValue('');
        setServiceDuration('');
        setResponsaveis([]);
        handleClose();

        toast.success('Serviço cadastrado com sucesso!', { autoClose: 2000 });
      } else {
        console.error('Erro ao cadastrar serviço:', response);
        toast.error('Erro ao cadastrar serviço. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      toast.error('Erro ao salvar serviço. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get('/servicos', {
          headers: {
            Authorization: token,
          },
        });

        // Filtra apenas os serviços com status true
        const servicosAtivos = response.data.filter(servico => servico.status === true);
        setListaServicos(servicosAtivos);
      } catch (error) {
        console.error('Erro ao buscar servicos:', error);
      } finally {
        setCarregando(false);
      }
    };

    fetchServicos();
  }, [token]);

  const handleOpen = () => {
    setEditingService(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDurationOpen = () => {
    setDurationOpen(true);
  };

  const handleDurationClose = () => {
    setDurationOpen(false);
  };

  const handleDurationSelect = (event) => {
    setServiceDuration(event.target.value);
    handleDurationClose();
  };

  const handleResponsaveisChange = (event) => {
    setResponsaveis(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <HeaderUsuario />
        <NavbarBarbeiro />
      </div>
      <div className={styles.conteudo}>
        <div className={styles.containerTodo}>
          <div
            style={{
              display: 'flex',
              marginTop: 32,
              gap: 32,
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              label="Buscar por serviço"
              style={{ width: '20vw' }}
            />
            <Button variant="contained" onClick={handleOpen}>
              Cadastrar Serviço
            </Button>
          </div>
          <div className={styles.container}>
            {/* Passa apenas os serviços ativos para o componente BoxServicos */}
            <BoxServicos services={listaServicos} funcionarios={funcionarios} />
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingService ? 'Editar Serviço' : 'Cadastrar Serviço'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do serviço"
            type="text"
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descrição do serviço"
            type="text"
            fullWidth
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Valor do serviço"
            type="number"
            fullWidth
            value={serviceValue}
            onChange={(e) => setServiceValue(e.target.value)}
          />
          <Button variant="outlined" onClick={handleDurationOpen}>
            Selecionar Duração
          </Button>
          <TextField
            margin="dense"
            label="Duração"
            type="text"
            fullWidth
            value={formatDuration(serviceDuration)}
            disabled
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Responsáveis</InputLabel>
            <Select
              multiple
              value={responsaveis}
              onChange={handleResponsaveisChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {funcionarios.map((funcionario) => (
                <MenuItem key={funcionario.nome} value={funcionario.nome}>
                  <Checkbox checked={responsaveis.indexOf(funcionario.nome) > -1} />
                  <ListItemText primary={funcionario.nome} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={mandarDados}>{editingService ? 'Salvar' : 'Cadastrar'}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={durationOpen} onClose={handleDurationClose}>
        <DialogTitle>Selecionar Duração</DialogTitle>
        <DialogContent>
          <Select
            value={serviceDuration}
            onChange={handleDurationSelect}
            fullWidth
          >
            {durations.map((duration, index) => (
              <MenuItem key={index} value={duration}>
                {formatDuration(duration)}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDurationClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ServicoBarbeiro;
