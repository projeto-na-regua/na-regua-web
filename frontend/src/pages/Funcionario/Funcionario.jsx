
import { useState } from 'react'
import React from 'react'
import styles from './Funcionario.module.css'
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro'
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import { Button, TextField, Typography } from '@mui/material'
import CardPequenoFuncionario from '../../components/CardPequenoFuncionario/CardPequenoFuncionario'
import CardFuncionario from '../../components/CardFuncionario/CardFuncionario'
import { ModalPersonalizado } from '../../components/ModalPaiEditarFuncionario/ModalPersonalizado'
import api from '../../api'

export function Funcionarios() {
  const [modal, setModal] = useState(false)
  const [modalAdicionar, setModalAdicionar] = useState(false)

  const handleAdicionar = () => {
    setModalAdicionar(true)
  }

  const [listaFuncionarios, setListaFuncionarios] = useState([])
  const token = JSON.parse(sessionStorage.getItem('user'))
  console.log(token);

  React.useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get('/funcionarios', {
          headers: {
            Authorization: token
          }
        });
        setListaFuncionarios(response.data);

        console.log(response);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchFuncionarios();

  }, [token])


    const totalFuncionarios = listaFuncionarios.length

  return (
    <div className="Header">

      <HeaderUsuario />

      <div className={styles.conteudo}>
        <div className={styles.container}>
          <div className={styles.conteudoFuncionarios}>
            <NavbarBarbeiro />

            <div style={{
              display: 'flex',
              marginTop: 32,
              gap: 32,
              width: '100%',
              justifyContent: 'space-between',
            }}>
              <div style={{
                display: 'flex',
                gap: 32
              }}>
                <TextField
                  label="Buscar por funcionário"
                  variant="outlined"
                />

                <TextField
                  label="Filtro por cargo"
                  variant="outlined"
                />
              </div>

              <Button
                variant='contained'
                onClick={() => setModalAdicionar(true)}
              >
                Extrair relatório
              </Button>
            </div>

            <div className={styles.quadroFuncionarios}>
              <div className={styles.totalAdicionarFuncionarios}>
                <CardPequenoFuncionario
                  title='Total de funcionários'
                  icon={totalFuncionarios}
                />

                <CardPequenoFuncionario
                  icon={
                    <svg width="30" height="35" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M43 40.5H28M35.5 33V48M3 48C3 38.335 10.835 30.5 20.5 30.5C22.2375 30.5 23.9157 30.7532 25.5 31.2247M30.5 13C30.5 18.5229 26.0228 23 20.5 23C14.9771 23 10.5 18.5229 10.5 13C10.5 7.47715 14.9771 3 20.5 3C26.0228 3 30.5 7.47715 30.5 13Z" stroke="#082031" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                  title="Adicionar funcionário"
                  cursor='pointer'
                  onClick={handleAdicionar}
                />
              </div>

              <div className={styles.listaFuncionarios}>
                {listaFuncionarios.map((funcionario) => (
                  <CardFuncionario
                    name={funcionario.nome}
                    onClick={() => setModal(true)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
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
              <Typography variant='h5'>Nome do Funcionário</Typography>

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
                  <Typography variant='h7'>Cargo:</Typography>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}>
                  <Typography variant='h7'>Monique Farias</Typography>
                  <Typography variant='h7'>(11) 99999-9999</Typography>
                  <Typography variant='h7'>Cargo: Funcionário</Typography>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: 32,
              }}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    setModal(false)
                  }}
                >
                  Deletar funcionário
                </Button>

                <Button
                  variant='contained'
                  onClick={() => {
                    setModal(false)
                  }}
                >
                  Editar funcionário
                </Button>
              </div>
            </div>
          }
          open={modal}
          setOpen={setModal}
          handleClose={() => setModal(false)}
        />
      )}

      {modalAdicionar && (
        <ModalPersonalizado
          children={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              padding: 32,
              alignItems: 'center',
              width: 400,
            }}>
              <Typography variant='h5'>Adicionar funcionário</Typography>

              <TextField
                label='Nome'
                variant='outlined'
                fullWidth
                margin='normal'
              />

              <TextField
                label='Email'
                variant='outlined'
                fullWidth
                margin='normal'
              />

              <TextField
                label='Senha'
                variant='outlined'
                fullWidth
                margin='normal'
              />

              <TextField
                label='Telefone'
                variant='outlined'
                fullWidth
                margin='normal'
              />

              <Button
                variant='contained'
                onClick={() => {
                  setModalAdicionar(false)
                }}
              >
                Adicionar funcionário
              </Button>
            </div>
          }
          open={modalAdicionar}
          setOpen={setModalAdicionar}
          handleClose={() => setModalAdicionar(false)}
        />
      )}
    </div>
  )
}
export default Funcionarios
