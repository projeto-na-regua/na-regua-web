import React from 'react';
import { Box } from '@mui/material';

function CardDataHora(props) {
  const { nome, horaInicio, horaFim } = props;

  return (
    <Box sx={{
      bgcolor: '#F4F3EE',
      borderRadius: 3,
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '6%',
      width: '150px',
      height: '125px',
      position: 'relative',
      marginBottom: '25px',
      marginRight: '0px',
      ...props.style
    }}> 
      <div className="labelDiaSemana" style={{
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        padding: '9px',
        color: 'white',
        backgroundColor: '#082031',
        fontWeight: 300,
        borderRadius: '6px',
        width: '60%',
        zIndex: 1,
      }}>
        {nome}
      </div>
      <label style={{ marginTop: '8px', marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>Horário de Abertura:</label>
      <div style={{ marginBottom: '16px', fontSize: '14px' }}>{horaInicio}</div>
      <label style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>Horário de Fechamento:</label>
      <div style={{ fontSize: '14px' }}>{horaFim}</div>
    </Box>
  );
}

export default CardDataHora;
