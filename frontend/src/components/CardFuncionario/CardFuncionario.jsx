// CardFuncionario.jsx

import React, { useState } from 'react';
import styles from './CardFuncionario.module.css';
import { Button, Typography } from '@mui/material';
import { ModalPersonalizado } from '../ModalPersonalizado/ModalPersonalizado';
import api from '../../api';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

function CardFuncionario(props) {
  const [carregando, setCarregando] = useState(false);
  const [verMais, setVerMais] = useState(false); // Estado local para controlar a abertura do modal

  const deletarFuncionario = async () => {
    setCarregando(true);

    try {
      await api.delete(`/funcionarios/${props.email}`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem('user'))
        }
      });

      toast.success('Funcionário deletado com sucesso!', {
        autoClose: 2000
      });

      setCarregando(false);
      props.atualizarFuncionarios();
      props.setOpen(false);

    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
    }
  };

  return (
    <div className={styles.funcionario}>
      <div className={styles.fotoFuncionario}>
        <img className={styles.fotoTeste} src={props.image} alt='imagem-barbeiro' />
      </div>

      <div className={styles.nomeFuncionario}>
        <span>{props.name}</span>
      </div>

      <Button onClick={() => setVerMais(true)} variant='contained'> {/* Atualizando o estado local `verMais` */}
        Ver mais
      </Button>

      <ModalPersonalizado
        children={
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            padding: 32,
            alignItems: 'center',
            width: 400,
          }}>
            {carregando && <CircularProgress />}
            <Typography variant='h5'>{props.name}</Typography>

            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                <Typography variant='h7'>E-mail:</Typography>
                <Typography variant='h7'>Telefone:</Typography>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}>
                <Typography variant='h7'>{props.email}</Typography>
                <Typography variant='h7'>{props.phone}</Typography>
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: 16,
              width: '100%',
              justifyContent: 'center'
            }}>
              <Button
                variant='outlined'
                onClick={() => setVerMais(false)}
              >
                Fechar
              </Button>

              <Button
                variant='contained'
                onClick={deletarFuncionario}
              >
                Deletar funcionário
              </Button>
            </div>
          </div>
        }
        open={verMais}
        setOpen={setVerMais}
        handleClose={() => setVerMais(false)}
      />
    </div>
  );
}

export default CardFuncionario;
