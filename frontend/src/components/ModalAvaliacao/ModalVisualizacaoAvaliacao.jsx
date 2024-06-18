import React from 'react';
import { Box, Modal, Rating, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

export function ModalVisualizacaoAvaliacao({ open, handleClose, avaliacao, comentario }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: '450px',
          height: '280px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#F4F3EE',
          borderRadius: 8,
          boxShadow: 24,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '0px 2% 2% 2%', 
        }}
      >

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 2, marginBottom: 3 }}>
          <Button onClick={handleClose} sx={{ color: '#E3A74F', minWidth: 'auto', p: 0 }}>
            <CloseIcon />
          </Button>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600, fontSize: 22, textAlign: 'center', flex: '1 1 auto' }}>
            Avaliação
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Rating
            name="simple-controlled"
            value={avaliacao}
            readOnly
            icon={<StarIcon fontSize="inherit" />}
            emptyIcon={<StarIcon fontSize="inherit" />}
            sx={{
              fontSize: 48,
              marginBottom: '2%',
              '& .MuiRating-iconFilled': {
                borderRadius: '80%',
              },
              '& .MuiRating-iconEmpty': {
                borderRadius: '80%',
              },
            }}
          />
        </Box>

        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
          Comentário: "{comentario}"
        </Typography>
      </Box>
    </Modal>
  );
}
