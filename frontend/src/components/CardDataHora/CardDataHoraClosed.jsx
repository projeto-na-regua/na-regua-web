import React from 'react';
import { Box, Button, ThemeProvider } from '@mui/material';
import { theme } from "../../theme";

function CardDataHoraClosed(props) {
  const { nome } = props;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        bgcolor: '#F4F3EE',
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        <Button
          variant="contained"
          type="button"
          style={{ width: '100%', height: '45%' }}
          disabled={true}
        >
          Fechado
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default CardDataHoraClosed;
