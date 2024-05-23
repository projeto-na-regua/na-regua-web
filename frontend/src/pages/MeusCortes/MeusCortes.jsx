import { useEffect, useState, useRef } from 'react'
import React from 'react'
import styles from './MeusCortes.module.css'
import NavbarUsuario from '../../components/NavbarCliente/NavbarCliente'
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import {TextField, ThemeProvider } from '@mui/material'
import CardPequenoFuncionario from '../../components/CardPequenoFuncionario/CardPequenoFuncionario'
import CardFuncionario from '../../components/CardFuncionario/CardFuncionario'
import api from '../../api'
import CircularProgress from '@mui/material/CircularProgress'
import ModalAdicionar from '../../components/ModalAdicionar/ModalAdicionar'
import { theme } from '../../theme'

export function MeusCortes() {
  const [modalAdicionar, setModalAdicionar] = useState(false)
  const [verMais, setVerMais] = useState(false)
  const [listaImagens, setlistaImagens] = useState([])
  const token = JSON.parse(sessionStorage.getItem('user'))
  const [carregando, setCarregando] = useState(true)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchImagens = async () => {
      try {
        const response = await api.get('/meus-cortes', {
          headers: {
            Authorization: token
          }
        })

        setlistaImagens(response.data)
        setCarregando(false)
      } catch (error) {
        console.error('Erro ao buscar cortes:', error)
      }
    }

    fetchImagens()
  }, [token, listaImagens])

  const handleAdicionar = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log('Arquivo selecionado:', file)
      // Aqui você pode adicionar a lógica para enviar o arquivo para o servidor ou manipulá-lo conforme necessário
      setModalAdicionar(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <HeaderUsuario />

        <div className={styles.conteudo}>
          <div className={styles.container}>
            <div className={styles.conteudoImagens}>
              <NavbarUsuario />

              <div style={{
                display: 'flex',
                marginTop: 32,
                gap: 32,
                width: '100%',
                justifyContent: 'space-between',
              }}>
                <TextField
                  label="Buscar por barbearia"
                  style={{
                    width: '20vw'
                  }}
                />
              </div>

              <div className={styles.quadroImagens}>
                <div className={styles.totalAdicionarImagens}>
                  <CardPequenoFuncionario
                    icon={
                      <svg width="30" height="35" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43 40.5H28M35.5 33V48M3 48C3 38.335 10.835 30.5 20.5 30.5C22.2375 30.5 23.9157 30.7532 25.5 31.2247M30.5 13C30.5 18.5229 26.0228 23 20.5 23C14.9771 23 10.5 18.5229 10.5 13C10.5 7.47715 14.9771 3 20.5 3C26.0228 3 30.5 7.47715 30.5 13Z" stroke="#082031" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                    title="Adicionar cortes"
                    cursor='pointer'
                    onClick={handleAdicionar}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginLeft: 64,
                  gap: 32
                }}>
                  {carregando ? (
                    <CircularProgress style={{
                      alignSelf: 'center',
                      justifySelf: 'center',
                    }} />
                  ) : (
                    listaImagens.length > 0 ? (
                      listaImagens.map((funcionario) => (
                        <CardFuncionario
                          key={funcionario.id}
                          name={funcionario.nome}
                          email={funcionario.email}
                          phone={funcionario.celular}
                          onClick={() => setVerMais(funcionario.id)}
                          setOpen={setVerMais}
                          open={verMais === funcionario.id}
                          atualizarImagens={() => setlistaImagens(listaImagens.filter((func) => func.id !== funcionario.id))}
                        />
                      ))
                    ) : (
                      <div>Nenhum corte adicionado.</div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalAdicionar && (
          <ModalAdicionar
            listaImagens={listaImagens}
            setlistaImagens={setlistaImagens}
            setOpen={setModalAdicionar}
            open={modalAdicionar}
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </ThemeProvider>
  )
}
export default MeusCortes
