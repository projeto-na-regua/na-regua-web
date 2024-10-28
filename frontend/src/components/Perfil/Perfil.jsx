import { Avatar, Button, TextField, ThemeProvider, Typography, Skeleton } from '@mui/material'
import { theme } from '../../theme'
import api from '../../api'
import { useEffect, useState } from 'react'
import editicon from '../../utils/assets/editicon.svg'
import { ModalPersonalizado } from '../ModalPersonalizado/ModalPersonalizado'
import utils from '../../utils/globals'
import CloseIcon from '@mui/icons-material/Close'

export function Perfil() {
  const token = JSON.parse(sessionStorage.getItem("user"))
  const tipoUsuario = JSON.parse(sessionStorage.getItem("tipo"))
  const [open, setOpen] = useState(false)
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
  const [modal, setModal] = useState('editarImagem' || 'editarInformacoesPessoais' || 'editarEndereco')
  const [image, setImage] = useState(null)
  const [base64Image, setBase64Image] = useState('')

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

  const handleImageSubmit = async () => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await api.put('/usuarios/editar-img-perfil', formData, {
        headers: {
          Authorization: token
        }
      });

      const updatedImage = response.data.imageURL;

      // Atualize o estado do perfil e a sessionStorage com a nova imagem
      setUserInfo({
        ...userInfo,
        imgPerfil: updatedImage
      });

      // Atualize a sessionStorage
      const currentUser = JSON.parse(sessionStorage.getItem('userInfo'));
      currentUser.imgPerfil = updatedImage;
      sessionStorage.setItem('userInfo', JSON.stringify(currentUser));

      // Adicione um contador ou refresh trigger para forçar a atualização
      setBase64Image(updatedImage);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };



  const handleInfoSubmit = async () => {
    try {
      const response = await api.put('/usuarios/editar-perfil', userInfo, {
        headers: {
          Authorization: token
        }
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

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
                  {!userInfo.imgPerfil ? userInfo.nome.charAt(0) : <img src={userInfo.imgPerfil} alt="Imagem de perfil" style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />}
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
                    {tipoUsuario.dtype} | @{userInfo.username}
                  </Typography>
                )}
              </div>
            </div>

            <Button
              onClick={() => {
                setOpen(true)
                setModal('editarImagem')
              }}
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
                setModal('editarInformacoesPessoais')
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
                setModal('editarEndereco')
              }}
              variant='contained' style={{
                margin: 16,
              }}>
              Editar
            </Button>
          </div>
        </div>
      </div>

      {modal === 'editarImagem' && (
        <ModalPersonalizado
          open={open}
          setOpen={setOpen}
        >
          <div style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 16
          }}>
            <CloseIcon onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            margin: 32,
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 400
          }}>
            <img src={base64Image} alt="Imagem de perfil" style={{
              width: 128,
              height: 128,
              borderRadius: '50%',
              objectFit: 'cover'
            }} />

            <Typography
              variant="h7"
              style={{
                fontWeight: 'bold',
                color: '#082031'
              }}
            >
              Editar Imagem de Perfil
            </Typography>

            <TextField
              type="file"
              variant="outlined"
              onChange={(event) => {
                const file = event.target.files[0]
                setImage(file)
                setBase64Image(URL.createObjectURL(file))
              }}
              fullWidth
            />


            <TextField
              label="Nome"
              variant="outlined"
              value={userInfo.nome}
              fullWidth
            />

            <TextField
              label="Username"
              variant="outlined"
              value={userInfo.username}
              fullWidth
            />

            <Button
              onClick={handleImageSubmit}
              variant="contained"
              style={{
                backgroundColor: '#082031',
                color: '#F4F3EE',
                fontWeight: 'bold'
              }}
            >
              Salvar
            </Button>
          </div>
        </ModalPersonalizado>
      ) || modal === 'editarInformacoesPessoais' && (
        <ModalPersonalizado
          open={open}
          setOpen={setOpen}
        >
          <div style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 16
          }}>
            <CloseIcon onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 32,
            minWidth: 400
          }}>
            <Typography
              variant="h7"
              style={{
                fontWeight: 'bold',
                color: '#082031'
              }}
            >
              Editar Informações Pessoais
            </Typography>

            <TextField
              label="Nome"
              variant="outlined"
              value={userInfo.nome}
              onChange={(event) => setUserInfo({ ...userInfo, nome: event.target.value })}
            />

            <TextField
              label="E-mail"
              variant="outlined"
              value={userInfo.email}
              onChange={(event) => setUserInfo({ ...userInfo, email: event.target.value })}
            />

            <TextField
              label="Celular"
              variant="outlined"
              value={userInfo.celular}
              onChange={(event) => setUserInfo({ ...userInfo, celular: event.target.value })}
            />

            <Button
              onClick={() => {

              }}
              variant="contained"
              style={{
                backgroundColor: '#082031',
                color: '#F4F3EE',
                fontWeight: 'bold'
              }}
            >
              Salvar
            </Button>
          </div>
        </ModalPersonalizado>
      ) || modal === 'editarEndereco' && (
        <ModalPersonalizado
          open={open}
          setOpen={setOpen}
        >
          <div style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 16
          }}>
            <CloseIcon onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 32,
            minWidth: 400
          }}>
            <Typography
              variant="h7"
              style={{
                fontWeight: 'bold',
                color: '#082031'
              }}
            >
              Editar Endereço
            </Typography>

            <TextField
              label="CEP"
              variant="outlined"
              value={userInfo.cep}
              onChange={(event) => setUserInfo({ ...userInfo, cep: event.target.value })}
            />

            <TextField
              label="Logradouro"
              variant="outlined"
              value={userInfo.logradouro}
              onChange={(event) => setUserInfo({ ...userInfo, logradouro: event.target.value })}
            />

            <TextField
              label="Número"
              variant="outlined"
              value={userInfo.numero}
              onChange={(event
              ) => setUserInfo({ ...userInfo, numero: event.target.value })}
            />

            <TextField
              label="Complemento"
              variant="outlined"
              value={userInfo.complemento}
              onChange={(event) => setUserInfo({ ...userInfo, complemento: event.target.value })}
            />

            <TextField
              label="Cidade"
              variant="outlined"
              value={userInfo.cidade}
              onChange={(event) => setUserInfo({ ...userInfo, cidade: event.target.value })}

            />

            <TextField
              label="Estado"
              variant="outlined"
              value={userInfo.estado}
              onChange={(event) => setUserInfo({ ...userInfo, estado: event.target.value })}

            />

            <Button
              onClick={() => {

              }}
              variant="contained"
              style={{
                backgroundColor: '#082031',
                color: '#F4F3EE',
                fontWeight: 'bold'
              }}
            >
              Salvar
            </Button>
          </div>
        </ModalPersonalizado>
      )}
    </ThemeProvider>
  )
}
