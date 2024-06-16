import React from 'react';
import { Box, Modal, Button } from '@mui/material';

export function ModalEditar({ open, handleClose, handleConfirm }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#F4F3EE',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 4,
        width: 450,
        height: 190
      }}>
        <h2 style={{ fontWeight: 600, color: '#082031', marginBottom: 30 }}>Editar Barbearia</h2>
        <p style={{ fontSize: 22, fontWeight: 500, marginTop: 0, marginBottom: 30 }}>Deseja salvar as alterações?</p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 30, alignItems: 'center' }}>
          <Button style={{ width: 200, height: 52 }} variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button style={{ width: 200, height: 52 }} variant="contained" onClick={handleConfirm}>
            Confirmar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
