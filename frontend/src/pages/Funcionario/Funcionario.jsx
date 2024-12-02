import { useEffect, useState } from 'react'
import React from 'react'
import styles from './Funcionario.module.css'
import { Button, Pagination, Stack, TextField, ThemeProvider, Typography } from '@mui/material'
import CardPequenoFuncionario from '../../components/CardPequenoFuncionario/CardPequenoFuncionario'
import CardFuncionario from '../../components/CardFuncionario/CardFuncionario'
import api from '../../api'
import CircularProgress from '@mui/material/CircularProgress'
import ModalAdicionar from '../../components/ModalAdicionar/ModalAdicionar'
import { theme } from '../../theme'
import { toast } from "react-toastify"
import { Sidebar } from '../../components/Sidebar'
import { HeaderUsuario } from '../../components/Header'

export function Funcionarios() {
  const [modalAdicionar, setModalAdicionar] = useState(false)
  const [verMais, setVerMais] = useState(false)
  const [listaFuncionarios, setListaFuncionarios] = useState([])
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [carregando, setCarregando] = useState(true)
  const totalFuncionarios = listaFuncionarios.length

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get('/funcionarios', {
          headers: {
            Authorization: token
          }
        })

        setListaFuncionarios(response.data)
        setCarregando(false)
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
      }
    }

    fetchFuncionarios()
  }, [token, listaFuncionarios])

  const handleAdicionar = () => {
    setModalAdicionar(true)
  }

  const handleExtrairRelatorio = async () => {
    try {
      const response = await api.get('/funcionarios/relatorio', {
        headers: {
          Authorization: token
        },
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'relatorio_funcionarios.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast.success('Relatório extraído com sucesso!', { autoClose: 2000 })
    } catch (error) {
      console.error('Erro ao extrair relatório:', error.response ? error.response.data : error.message)
      toast.error('Erro ao extrair relatório.')
    }
  }

  const [page, setPage] = useState(1)
  const rowsPerPage = 4
  const funcionariosPaginados = listaFuncionarios.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Sidebar />

        <div className={styles.conteudo}>
          <div className={styles.container}>
            <HeaderUsuario title='Funcionários' />
            <div className={styles.conteudoFuncionarios}>
              <div style={{
                display: 'flex',
                marginTop: 32,
                gap: 32,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Typography variant='h7'>Total de funcionários: {listaFuncionarios.length}</Typography>

                <div style={{
                  display: 'flex',
                  gap: 16
                }}>
                  <Button
                    variant='contained'
                    onClick={handleExtrairRelatorio}
                  >
                    Extrair relatório
                  </Button>

                  <Button
                    variant='contained'
                    onClick={handleAdicionar}
                  >
                    Adicionar funcionário
                  </Button>
                </div>
              </div>

              <div className={styles.quadroFuncionarios}>
                {/* <div className={styles.totalAdicionarFuncionarios}>
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
                </div> */}

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '60vh',
                  width: '100%',
                  alignItems: 'center',
                }}>
                  <div style={{
                    display: 'flex',
                    gap: 32,
                    minHeight: '50vh',
                  }}>
                    {carregando ? (
                      <CircularProgress style={{
                        alignSelf: 'center',
                        justifySelf: 'center',
                      }} />
                    ) : (
                      listaFuncionarios.length > 0 ? (
                        funcionariosPaginados.map((funcionario) => (
                          <CardFuncionario
                            key={funcionario.id}
                            name={funcionario.nome}
                            image={funcionario.imgPerfil || `https://ui-avatars.com/api/?name=${funcionario.nome}&background=random`}
                            email={funcionario.email}
                            phone={funcionario.celular}
                            onClick={() => setVerMais(funcionario.id)}
                            setOpen={setVerMais}
                            open={verMais === funcionario.id}
                            atualizarFuncionarios={() => setListaFuncionarios(listaFuncionarios.filter((func) => func.id !== funcionario.id))}
                          />
                        ))
                      ) : (
                        <div>Nenhum funcionário encontrado.</div>
                      )
                    )}
                  </div>
                  <Stack spacing={2} style={{ marginTop: 16, alignItems: 'center' }}>
                    <Pagination
                      count={Math.ceil(listaFuncionarios.length / rowsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalAdicionar && (
          <ModalAdicionar
            listaFuncionarios={listaFuncionarios}
            setListaFuncionarios={setListaFuncionarios}
            setOpen={setModalAdicionar}
            open={modalAdicionar}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default Funcionarios
