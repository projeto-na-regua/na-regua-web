import { Button, Divider, TextField, ThemeProvider, Typography, Skeleton } from '@mui/material'
import { theme } from '../../theme'
import Header from '../../components/Header/Header'
import { useEffect, useRef, useState } from 'react'
import logo from '../../utils/assets/logo-scale0.svg'
import AccountMenu from '../../components/AccountMenu/AccountMenu'
import { useNavigate } from 'react-router-dom'
import ImageIcon from '@mui/icons-material/Image'
import { Post } from '../../components/Post/Post'
import api from '../../api'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

export function Comunidade() {
  const [modalOpen, setModalOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [imagePost, setImagePost] = useState(null)
  const [postText, setPostText] = useState('')
  const [base64Image, setBase64Image] = useState(null)
  const [comentarios, setComentarios] = useState([])
  const [comentario, setComentario] = useState('')
  const [postagemId, setPostagemId] = useState(null)
  const hiddenFileInput = useRef(null)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const imagePerfil = sessionStorage.getItem('imgPerfil')

  useEffect(() => {
    if (!token) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [token])

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImagePost(file)

      const reader = new FileReader()
      reader.onload = () => {
        const base64Image = reader.result
        setBase64Image(base64Image)
      }
      reader.readAsDataURL(file)
    }
  }

  const abrirModal = (idPost) => {
    setModalOpen(true)
    fetchComentariosDosPosts(idPost)
    setPostagemId(idPost)
  }

  const postar = async () => {
    const formData = new FormData()
    formData.append("descricao", postText)

    if (imagePost) {
      formData.append("midia", imagePost)
    }

    try {
      const response = await api.post('/postagens', formData, {
        headers: {
          Authorization: token
        }
      })

      if (response.status === 201) {
        fetchPosts()
        setPostText('')
        setBase64Image(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const curtirPost = async (idPost) => {
    try {
      const response = await api.post('/curtidas', null, {
        headers: {
          Authorization: token,
        },
        params: {
          id: idPost,
          tipo: 'postagem'
        }
      })

      if (response.status === 201) {
        setPosts(posts.map(post => {
          if (post.id === idPost) {
            return {
              ...post,
              liked: !post.liked,
              qtdCurtidas: post.liked ? post.qtdLikes - 1 : post.qtdLikes + 1
            }
          }
          return post
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/postagens/feed', {
        headers: {
          Authorization: token
        }
      })

      setPosts(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComentariosDosPosts = async (idPost) => {
    try {
      const response = await api.get(`comentarios/by-post`, {
        headers: {
          Authorization: token
        },
        params: {
          idPostagem: idPost
        }
      })

      setComentarios(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const comentarPost = async (idPost) => {
    try {
      const response = await api.post('/comentarios', null, {
        headers: {
          Authorization: token
        },
        params: {
          conteudo: comentario,
          idPostagem: idPost
        }
      })

      if (response.status === 201) {
        fetchComentariosDosPosts(idPost)
        setComentario('')
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message)
    }
  }

  const handleDeletePost = async (idPost) => {
    try {
      const response = await api.put(`/postagens/delete`, null, {
        headers: {
          Authorization: token,
        },
        params: {
          id: idPost
        }
      })

      if (response.status === 204) {
        setPosts(posts.filter(post => post.id !== idPost)) // Atualiza o estado removendo o post
      }
    } catch (error) {
      console.error(error)
    }
  }

  const likeMockado = (idPost) => {
    setLiked(!liked)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header
          esquerda={<img src={logo} alt='logo-na-regua' style={{ width: '70%' }} />}
          direita={
            <div>
              {isAuth
                ? <AccountMenu />
                : <Button onClick={() => navigate('/login')} variant='contained' style={{ width: 100 }}>Entrar</Button>
              }
            </div>
          }
        />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          height: '90vh',
          width: '100%',
          justifyContent: 'space-evenly',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #CBD5E0',
              borderRadius: 12,
              alignItems: 'center',
              padding: 16,
              margin: 16,
              maxHeight: '30vh',
              justifyContent: 'center',
              width: '100%'
            }}>
              <img
                src={imagePerfil}
                alt='imagem de perfil'
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  marginBottom: 16,
                  border: '1px solid #CBD5E0',
                  objectFit: 'cover',
                }}
              />

              <Typography variant='h7'>
                @{userInfo.username}
              </Typography>

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
                marginTop: 32
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: 4
                }}>
                  <Typography variant='h6' style={{
                    fontWeight: 'bold',
                    fontSize: 24,
                  }}>
                    70
                  </Typography>

                  <Typography variant='body1'>
                    seguidores
                  </Typography>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: 4
                }}>
                  <Typography variant='h6' style={{
                    fontWeight: 'bold',
                    fontSize: 24,
                  }}>
                    4
                  </Typography>

                  <Typography variant='body1'>
                    seguindo
                  </Typography>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #CBD5E0',
              borderRadius: 12,
              padding: 16,
              maxHeight: '30vh',
              justifyContent: 'center',
              width: '100%'
            }}>
              <Typography variant='h7'>
                Seguidores
              </Typography>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                alignItems: 'center',
                marginTop: 16,
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  marginTop: 16,
                  width: '100%',
                }}>
                  <img
                    src='https://ui-avatars.com/api/?name=Roberto+Doe&background=random'
                    alt="imagem de perfil"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />

                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography variant='body1'>
                      @roberto
                    </Typography>

                    <Button variant='contained'>
                      Seguindo
                    </Button>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  width: '100%',
                }}>
                  <img
                    src='https://ui-avatars.com/api/?name=Amanda+Jessica&background=random'
                    alt="imagem de perfil"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />

                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography variant='body1'>
                      @amanda
                    </Typography>

                    <Button variant='contained'>
                      Seguir de volta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 16,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              border: '1px solid #CBD5E0',
              padding: 16,
              borderRadius: 12,
              width: '100%',
            }}>
              <img
                src={imagePerfil}
                alt='imagem de perfil'
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />

              <div style={{
                width: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  width: '100%',
                }}>
                  <TextField
                    label='O que você está pensando?'
                    variant='standard'
                    multiline
                    minRows={4}
                    sx={{
                      width: 500,
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'transparent'
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'transparent'
                      },
                    }}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />

                  {base64Image && (
                    <img
                      src={base64Image}
                      alt="Pré-visualização da imagem"
                      style={{
                        width: 500,
                        marginTop: 10,
                        borderRadius: 8,
                        border: '1px solid #CBD5E0',
                      }}
                    />
                  )}

                  <Divider style={{ width: '100%', margin: '16px 0' }} />
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <ImageIcon />
                    <input
                      type="file"
                      accept="image/*"
                      ref={hiddenFileInput}
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <Button onClick={postar} variant='contained'>
                    Publicar
                  </Button>
                </div>
              </div>
            </div>

            <Divider style={{ width: '100%', margin: '16px 0' }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              alignItems: 'center',
              width: '100%'
            }}>
              {isLoading ? (
                Array.from(new Array(6)).map((_, index) => (
                  <Skeleton key={index} variant="rectangular" width={700} height={100} style={{ marginBottom: 16 }} />
                ))
              ) : (
                posts.map((post, index) => (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    width: '100%',
                  }} key={index}>
                    <Post
                      username={post.username}
                      content={post.conteudo}
                      avatar={post.imgPerfil}
                      imagemPost={post.midia}
                      likes={post.qtdCurtidas || 0}
                      liked={post.liked}
                      commits={post.qtdComentarios}
                      onLike={() => {
                        curtirPost(post.id)
                      }}
                      modalOpen={() => abrirModal(post.id)}
                      isOwner={post.username === userInfo.username}
                      onDelete={() => handleDeletePost(post.id)}
                    />

                    <Divider style={{ width: '100%', margin: '16px 0' }} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            margin: 16,
            width: 300,
          }}>
            <Typography variant='h7' style={{ fontWeight: 'bold' }}>
              Sugestões para você
            </Typography>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              marginTop: 16,
            }}>
              <img
                src='https://ui-avatars.com/api/?name=Roberto+Doe&background=random'
                alt="imagem de perfil"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                flexGrow: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Typography variant='body1'>
                  @roberto
                </Typography>

                <Button variant='contained'>
                  Seguir
                </Button>
              </div>
            </div>

            <Divider style={{ width: '100%', margin: '16px 0' }} />

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              marginTop: 16,
            }}>
              <img
                src='https://ui-avatars.com/api/?name=Joao+Silva&background=random'
                alt='imagem de perfil'
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                flexGrow: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Typography variant='body1'>
                  @joao.silva
                </Typography>

                <Button variant='contained'>
                  Seguir
                </Button>
              </div>
            </div>

            <Typography variant='h7' style={{ fontWeight: 'bold', marginTop: 24 }}>
              Principais assuntos do momento
            </Typography>

            <Typography variant='body1' style={{ marginTop: 16 }}>
              #plataformanova
            </Typography>

            <Typography variant='body1' style={{ marginTop: 16 }}>
              #produtos
            </Typography>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 16,
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 12,
            width: 500,
            height: 500,
            overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Typography variant='h5'>
                Comentários
              </Typography>

              <Button onClick={() => setModalOpen(false)} variant='text'>
                <CloseIcon />
              </Button>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              alignItems: 'center',
              width: '100%',
              overflowY: 'auto',
            }}>
              {comentarios.length === 0 ? (
                <Typography
                  variant='body1'
                  style={{
                    textAlign: 'center',
                    color: '#9e9e9e',
                    maxWidth: '80%',
                    whiteSpace: 'wrap'
                  }}
                >
                  Nenhum comentário ainda. Seja o primeiro a comentar!
                </Typography>
              ) : (
                comentarios.map((comentario, index) => (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    padding: 16,
                    border: '1px solid #CBD5E0',
                    borderRadius: 12,
                    width: '90%',
                  }} key={index}>
                    <img
                      src={comentario.imgPerfil}
                      alt='imagem de perfil'
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}>
                      <Typography variant='body1'>
                        @{comentario.username}
                      </Typography>

                      <Typography variant='caption'>
                        {comentario.conteudo}
                      </Typography>
                    </div>

                  </div>
                ))
              )}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
              width: '100%',
            }}>
              <Button onClick={handleClick} variant='text'>
                <AddPhotoAlternateIcon />
                <input
                  type="file"
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </Button>

              <TextField
                label='Comentar'
                variant='outlined'
                multiline
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                sx={{
                  width: '100%',
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'transparent'
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'transparent'
                  },
                }}
              />

              <div>
                <Button onClick={() => {
                  comentarPost(postagemId)
                }} variant='contained'>
                  <SendIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  )
}
