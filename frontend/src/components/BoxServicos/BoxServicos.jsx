import React, { useState } from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../api";
import { toast } from "react-toastify";
import styles from "./BoxServicos.module.css";

function BoxServicos({ services, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('user'));

  const handleClick = (event, service) => {
    setAnchorEl(event.currentTarget);
    setSelectedService(service);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(selectedService);
    handleClose();
  };

  const handleDeleteOpen = () => {
    setConfirmOpen(true);
    handleClose();
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedService.id);
    setConfirmOpen(false);
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
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

  const handleDisableService = async () => {
    try {
      let response = await api.post(`servicos/update-status/${selectedService.id}`, {
        status: false,
      }, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        toast.success("Serviço desabilitado com sucesso!", { autoClose: 2000 });
      } else {
        console.error("Erro ao desabilitar serviço:", response);
        toast.error("Erro ao desabilitar serviço. Por favor, tente novamente.");
      }
      console.log(response.data)
    } catch (error) {
    
      console.error("Erro ao desabilitar serviço:", error);
      toast.error("Erro ao desabilitar serviço. Por favor, tente novamente.");
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
          {services.map((service, index) => (
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
                <div className={styles.divValorGrid}>{service.preco}</div>
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
                  <MenuItemMUI onClick={handleDisableService}>Desabilitar</MenuItemMUI>
                  <MenuItemMUI onClick={handleDeleteOpen}>Excluir</MenuItemMUI>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={confirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir este serviço?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BoxServicos;
