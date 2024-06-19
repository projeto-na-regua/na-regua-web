import React, { useState, useEffect } from 'react';
import {
  Menu,
  MenuItem as MenuItemMUI,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../api";
import { toast } from "react-toastify";
import styles from "./BoxServicos.module.css";

function BoxServicos({ services }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceValue, setServiceValue] = useState('');
  const [serviceDuration, setServiceDuration] = useState('');
  const [responsaveis, setResponsaveis] = useState([]);
  const [durationOpen, setDurationOpen] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [carregandoFuncionarios, setCarregandoFuncionarios] = useState(true);
  const [enableStack, setEnableStack] = useState([]);
  const [disableStack, setDisableStack] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('user'));

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
  }, []);

  const formatarValor = (serviceValue) => {
    if (typeof serviceValue !== 'number') {
      return 'N/A'; // ou algum valor padrão
    }

    return serviceValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const durations = Array.from({ length: 11 }, (_, i) => 30 + i * 15);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
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

  const handleEnableSelected = async () => {
    try {
      const enablePromises = selectedServices.map(async (service) => {
        const response = await api.put(`/servicos/update-status/${service.id}`, {
          status: true,
        }, {
          headers: {
            Authorization: token,
          },
        });
        return response;
      });

      const enableResponses = await Promise.all(enablePromises);
      const enabledIds = enableResponses.map((response) => response.data.id);
      setEnableStack(enabledIds);

      toast.success('Serviços habilitados com sucesso!', { autoClose: 2000 });
    } catch (error) {
      console.error('Erro ao habilitar serviços:', error);
      toast.error('Erro ao habilitar serviços. Por favor, tente novamente.', { autoClose: 2000 });
    } finally {
      handleClose();
    }
  };

  const handleDisableSelected = async () => {
    try {
      const disablePromises = selectedServices.map(async (service) => {
        const response = await api.put(`/servicos/update-status/${service.id}`, {
          status: false,
        }, {
          headers: {
            Authorization: token,
          },
        });
        return response;
      });

      const disableResponses = await Promise.all(disablePromises);
      const disabledIds = disableResponses.map((response) => response.data.id);
      setDisableStack(disabledIds);

      toast.success('Serviços desabilitados com sucesso!', { autoClose: 2000 });
    } catch (error) {
      console.error('Erro ao desabilitar serviços:', error);
      toast.error('Erro ao desabilitar serviços. Por favor, tente novamente.', { autoClose: 2000 });
    } finally {
      handleClose();
    }
  };

  const atualizarDados = async () => {
    try {
      if (!selectedService) {
        return;
      }
  
      const barbeirosEmails = responsaveis
        .map((nome) => funcionarios.find((funcionario) => funcionario.nome === nome)?.email)
        .filter((email) => email); // Filtra emails válidos
  
      const servicoAtualizado = {
        preco: parseFloat(serviceValue || 0),
        descricao: serviceDescription || '',
        tipoServico: serviceName || '',
        tempoEstimado: parseInt(serviceDuration || 0),
        barbeirosEmails: barbeirosEmails,
        status: true, // Mantém o status como true
      };
  
      // Log dos dados do serviço atualizado e emails dos barbeiros
      console.log('Serviço Atualizado:', servicoAtualizado);
      console.log('Barbeiros relacionados:', barbeirosEmails);
  
      const response = await api.put(`/servicos/${selectedService.id}`, servicoAtualizado, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 200) {
        setServiceName('');
        setServiceDescription('');
        setServiceValue('');
        setServiceDuration('');
        setResponsaveis([]);
        handleClose();
        toast.success('Serviço atualizado com sucesso!', { autoClose: 2000 });
      } else {
        console.error('Erro ao atualizar serviço:', response);
        toast.error('Erro ao atualizar serviço. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      toast.error('Erro ao salvar serviço. Por favor, tente novamente.');
    } finally {
      handleClose();
    }
  };

  const handleClick = (event, service) => {
    setAnchorEl(event.currentTarget);
    setSelectedService(service);
  };

  const handleEdit = () => {
    if (selectedService) {
      setServiceName(selectedService.tipoServico || '');
      setServiceDescription(selectedService.descricao || '');
      setServiceValue(selectedService.preco || '');
      setServiceDuration(selectedService.tempoEstimado || '');

      if (selectedService.barbeirosEmails) {
        const responsaveisNomes = selectedService.barbeirosEmails
          .map((email) => funcionarios.find((funcionario) => funcionario.email === email)?.nome)
          .filter((nome) => nome);

        setResponsaveis(responsaveisNomes);
      } else {
        setResponsaveis([]);
      }

      handleOpen();
      setAnchorEl(null);
    }
  };

  const handleSelectService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((selected) => selected !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSelectAll = () => {
    if (selectedServices.length === services.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(services.map((service) => service));
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} h ${mins > 0 ? `${mins} m` : ""}`;
    }
    return `${mins} m`;
  };

  const handleToggleServiceStatus = async (serviceId, newStatus) => {
    try {
      const response = await api.put(`/servicos/update-status/${serviceId}`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: token,
        },
      });

      toast.success(`Serviço ${newStatus ? 'habilitado' : 'desabilitado'} com sucesso!`, { autoClose: 1000 });

    } catch (error) {
      console.error(`Erro ao ${newStatus ? 'habilitar' : 'desabilitar'} serviço:`, error);
      toast.error(`Erro ao ${newStatus ? 'habilitar' : 'desabilitar'} serviço. Por favor, tente novamente.`, { autoClose: 1000 });
    } finally {
      handleClose();
    }
  };

  return (
    <div className={`${styles.gridContainer} ${styles.widerBox}`}>
      <div className={styles.boxTodoServico}>
        <div className={styles.headerFixoServico}>
          <div>
            <Checkbox
              checked={selectedServices.length === services.length}
              onChange={handleSelectAll}
            />
          </div>
          <div className={styles.divServico}>Serviço</div>
          <div className={styles.divDescricao}>Descrição</div>
          <div className={styles.divDuracao}>Duração</div>
          <div className={styles.divValor}>Valor</div>
          <div className={styles.divVazia}> </div>
        </div>
        <div className={styles.gridServico}>
          {Array.isArray(services) && services.map((service, index) => (
            <div className={styles.servico} key={index}>
              <div className={styles.borda}>
                <div className={styles.divCheckbox}>
                  <Checkbox
                    checked={selectedServices.includes(service)}
                    onChange={() => handleSelectService(service)}
                  />
                </div>
                <div className={styles.divServicoGrid}>{service.tipoServico}</div>
                <div className={styles.divDescricao}>{service.descricao}</div>
                <div className={styles.divDuracao}>
                  {formatDuration(service.tempoEstimado)}
                </div>
                <div className={styles.divValorGrid}>{"R$ " + formatarValor(service.preco)}</div>
              </div>
              <div className={styles.divVaziaGrid}>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleClick(e, service)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItemMUI onClick={handleEdit}>Editar</MenuItemMUI>
                  <MenuItemMUI onClick={() => handleToggleServiceStatus(service.id, !service.status)}>
                    {service.status ? 'Desabilitar' : 'Habilitar'}
                  </MenuItemMUI>
                  <MenuItemMUI onClick={handleEnableSelected}>
                    Habilitar Selecionados
                  </MenuItemMUI>
                  <MenuItemMUI onClick={handleDisableSelected}>
                    Desabilitar Selecionados
                  </MenuItemMUI>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Serviço</DialogTitle>
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
              onChange={(e) => setResponsaveis(e.target.value)}
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
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={atualizarDados} color="primary">
            Salvar
          </Button>
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
    </div>
  );
}

export default BoxServicos;
