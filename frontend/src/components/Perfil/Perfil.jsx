import { Avatar, Button, TextField, ThemeProvider, Typography, Skeleton } from '@mui/material'
import { theme } from '../../theme'
import api from '../../api'
import { useEffect, useState } from 'react'
import editicon from '../../utils/assets/editicon.svg'
import { ModalPersonalizado } from '../ModalPersonalizado/ModalPersonalizado'
import utils from '../../utils/globals'

export function Perfil() {
  const token = JSON.parse(sessionStorage.getItem("user"))
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState('')
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({
    nome: '',
    email: '',
    senha: '',
    celular: '',
    imgPerfil: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    dtypes: ''
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await api.get('/usuarios/perfil', {
          headers: {
            Authorization: token
          }
        })

        const dtypeResponse = await api.get('/usuarios/user', {
          headers: {
            Authorization: token
          }
        })

        let dtypeText = 'Cliente'
        if (dtypeResponse.data.dtype === 'barbeiro' && dtypeResponse.data.adm === true) {
          dtypeText = 'Barbeiro Administrador'
        } else if (dtypeResponse.data.dtype === 'barbearia') {
          dtypeText = 'Barbeiro Comum'
        }

        setUserInfo({
          ...userResponse.data,
          dtypes: dtypeText
        })
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <div
            style={{
              border: '1px solid #CBD5E0',
              borderRadius: 12,
              marginLeft: 16,
              width: 'calc(100% - 32px)',
              display: 'flex',
              gap: 32,
              justifyContent: 'space-between'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}>
              {loading ? (
                <Skeleton variant="circle" width={64} height={64} style={{ margin: 16 }} />
              ) : (
                <Avatar style={{
                  width: 64,
                  height: 64,
                  color: '#082031',
                  backgroundColor: utils.randomColor(),
                  fontSize: 24,
                  margin: 16
                }}>
                  {!userInfo.imgPerfil ? userInfo.nome.charAt(0) : <img src={userInfo.imgPerfil} alt="Imagem de perfil" />}
                </Avatar>
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                {loading ? (
                  <Skeleton variant="text" width={200} height={30} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#082031'
                    }}
                  >
                    {userInfo.nome}
                  </Typography>
                )}

                {loading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#9E9E9E'
                    }}
                  >
                    {userInfo.dtypes}
                  </Typography>
                )}
              </div>
            </div>

            <Button
              endIcon={<img src={editicon} alt="Editar" />}
              variant='contained' style={{
                margin: 16,
              }}>
              Editar
            </Button>
          </div>

          <div
            style={{
              border: '1px solid #CBD5E0',
              borderRadius: 12,
              marginLeft: 16,
              width: 'calc(100% - 32px)',
              display: 'flex',
              gap: 32,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 32
            }}
          >

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              margin: 16,
            }}>
              <Typography variant='h7' fontStyle={{
                fontWeight: 'bold',
              }}>
                Informações Pessoais
              </Typography>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    color: '#082031'
                  }}
                >
                  Nome
                </Typography>

                {loading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#9E9E9E'
                    }}
                  >
                    {userInfo.nome}
                  </Typography>
                )}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    color: '#082031'
                  }}
                >
                  Endereço de E-mail
                </Typography>

                {loading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#9E9E9E'
                    }}
                  >
                    {userInfo.email}
                  </Typography>
                )}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    color: '#082031'
                  }}
                >
                  Celular
                </Typography>

                {loading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#9E9E9E'
                    }}
                  >
                    {userInfo.celular}
                  </Typography>
                )}
              </div>
            </div>

            <Button
              endIcon={<img src={editicon} alt="Editar" />}
              onClick={() => {
                setOpen(true)
                setModal('pessoal')
              }}
              variant='contained' style={{
                margin: 16,
              }}>
              Editar
            </Button>
          </div>

          <div
            style={{
              border: '1px solid #CBD5E0',
              borderRadius: 12,
              marginLeft: 16,
              width: 'calc(100% - 32px)',
              display: 'flex',
              gap: 32,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 32
            }}
          >

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              margin: 16,
            }}>
              <Typography variant='h7' fontStyle={{
                fontWeight: 'bold',
              }}>
                Informações de Endereço
              </Typography>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    color: '#082031'
                  }}
                >
                  Cidade/Estado
                </Typography>

                {loading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#9E9E9E'
                    }}
                  >
                    {userInfo.cidade}, {userInfo.estado}
                  </Typography>
                )}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    color: '#082031'
                  }}
                >
                  Endereço
                </Typography>

                {loading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#9E9E9E'
                    }}
                  >
                    {userInfo.logradouro}, {userInfo.numero}
                  </Typography>
                )}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: 'bold',
                    color: '#082031'
                  }}
                >
                  Complemento
                </Typography>

                {loading ? (
                  <Skeleton variant="text" width={100} height={20} />
                ) : (
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: 'bold',
                      color: '#9E9E9E'
                    }}
                  >
                    {userInfo.complemento}
                  </Typography>
                )}
              </div>
            </div>

            <Button
              endIcon={<img src={editicon} alt="Editar" />}
              onClick={() => {
                setOpen(true)
                setModal('endereco')
              }}
              variant='contained' style={{
                margin: 16,
              }}>
              Editar
            </Button>
          </div>
        </div>
      </div>

      <ModalPersonalizado open={open} setOpen={setOpen} modal={modal} />
    </ThemeProvider>
  )
}
