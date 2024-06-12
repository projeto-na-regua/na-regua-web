import React, { useState } from 'react';
import styles from './ServicoBarbeiro.module.css';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import { toast } from "react-toastify"
import { theme } from '../../theme';
import { Button, TextField, ThemeProvider, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Checkbox, ListItemText, InputLabel, FormControl } from '@mui/material';
import BoxServicos from '../../components/BoxServicos/BoxServicos';

const durations = Array.from({ length: 10 }, (_, i) => 30 + i * 15);

const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
        return `${hours} h ${mins > 0 ? ` ${mins} m` : ''}`;
    }
    return `${mins} m`;
};

const funcionarios = [
    'João Silva',
    'Maria Souza',
    'Carlos Pereira',
    'Ana Oliveira'
];

export function ServicoBarbeiro() {
    const [open, setOpen] = useState(false);
    const [durationOpen, setDurationOpen] = useState(false);
    const [duration, setDuration] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceValue, setServiceValue] = useState('');
    const [responsaveis, setResponsaveis] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [services, setServices] = useState([]);

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
        setDuration(event.target.value);
        handleDurationClose();
    };

    const handleResponsaveisChange = (event) => {
        setResponsaveis(event.target.value);
    };

    const handleServiceSubmit = () => {
        if (editingService) {
            setServices(services.map(service => service.id === editingService.id ? { ...service, name: serviceName, description: serviceDescription, duration: duration, value: serviceValue, responsaveis } : service));
        } else {
            const newService = {
                id: services.length + 1,
                name: serviceName,
                description: serviceDescription,
                duration: duration,
                value: serviceValue,
                responsaveis: responsaveis
            };
            setServices([...services, newService]);
            toast.success('Cadastro realizado com sucesso!', { autoClose: 2000 })
        }
        handleClose();
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setServiceName(service.name);
        setServiceDescription(service.description);
        setDuration(service.duration);
        setServiceValue(service.value);
        setResponsaveis(service.responsaveis);
        setOpen(true);
    };

    const handleDelete = (id) => {
        setServices(services.filter(service => service.id !== id));
        toast.success('Serviço deletado com sucesso!', { autoClose: 2000 })
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="Header">
                <HeaderUsuario />
                <NavbarBarbeiro />
            </div>
            <div className={styles.conteudo}>
                <div className={styles.containerTodo}>
                    <div style={{
                        display: 'flex',
                        marginTop: 32,
                        gap: 32,
                        width: '100%',
                        justifyContent: 'space-between',
                    }}>
                        <TextField
                            label="Buscar por funcionário"
                            style={{
                                width: '20vw'
                            }}
                        />
                        <Button
                            variant='contained'
                            onClick={handleOpen}
                        >
                            Cadastrar Serviço
                        </Button>
                    </div>
                    <div className={styles.container}>
                        <BoxServicos services={services} onEdit={handleEdit} onDelete={handleDelete} />
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
                        value={duration}
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
                                <MenuItem key={funcionario} value={funcionario}>
                                    <Checkbox checked={responsaveis.indexOf(funcionario) > -1} />
                                    <ListItemText primary={funcionario} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleServiceSubmit}>{editingService ? 'Salvar' : 'Cadastrar'}</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={durationOpen} onClose={handleDurationClose}>
                <DialogTitle>Selecionar Duração</DialogTitle>
                <DialogContent>
                    <Select
                        value={duration}
                        onChange={handleDurationSelect}
                        fullWidth
                    >
                        {durations.map((duration, index) => (
                            <MenuItem key={index} value={formatDuration(duration)}>
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
