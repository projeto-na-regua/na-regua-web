import { useEffect, useState } from 'react'
import { HeaderUsuario } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar.jsx'
import { theme } from '../../theme.js'
import { Button, CircularProgress, Pagination, Stack, ThemeProvider, Typography } from '@mui/material'
import api from '../../api.js'
import corte from '../../utils/assets/corte.jpg'

export function Galeria() {
  const [imagens, setImagens] = useState([])
  const [loading, setLoading] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))

  const fetchImagens = async () => {
    try {
      // Simulando uma resposta da API
      setImagens([
      ])
      setLoading(true)
    } catch (error) {
      if (error.response) {
        console.error('Erro ao buscar as imagens!')
        console.error('Error response:', error.response.data)
      } else {
        console.error('Erro ao tentar se conectar ao servidor!')
        console.error('Error:', error.message)
      }
    }
  }

  useEffect(() => {
    fetchImagens()
  }, [])

  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const imagensPaginadas = imagens.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Sidebar />

        <div style={{
          width: '85vw',
          marginLeft: '15vw',
          height: '95vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <HeaderUsuario title='Galeria' />

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography variant='h7' style={{ color: '#082031', marginLeft: 16 }}>Seus cortes</Typography>

            <Button variant='contained' style={{ marginRight: 16 }}>
              Adicionar foto
            </Button>
          </div>

          <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
              }}>
                {imagens.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 16,
                    marginTop: 16,
                    marginLeft: 16,
                    marginRight: 16,
                    overflow: 'auto'
                  }}>
                    {imagensPaginadas.map((imagem, index) => (
                      <div key={index} style={{
                        borderRadius: 8,
                        background: `url(${imagem.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#CBD5E0',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                      }}>
                        <img src={corte} alt='cortes' style={{
                          height: '90%',
                          width: '90%',
                          borderRadius: 8
                        }}/>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography variant='h7' style={{ color: '#082031', marginLeft: 16, marginTop: 16, alignSelf: 'center' }}>Nenhum corte encontrado. Tente adicionar uma! :)</Typography>
                )}
              </div>
            ) : (
              <CircularProgress style={{
                display: 'flex',
                justifySelf: 'center',
                alignSelf: 'center'
              }} />
            )}
          </div>
          <Stack spacing={2} style={{ marginTop: 16, alignItems: 'center' }}>
            <Pagination
              count={Math.ceil(imagens.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </ThemeProvider >
  )
}
