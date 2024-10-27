import { Box, Button, Divider, TextField, ThemeProvider, Typography } from '@mui/material'
import { theme } from '../../theme'
import Header from '../../components/Header/Header'
import { useEffect, useRef, useState } from 'react'
import logo from '../../utils/assets/logo-scale0.svg'
import AccountMenu from '../../components/AccountMenu/AccountMenu'
import { useNavigate } from 'react-router-dom'
import ImageIcon from '@mui/icons-material/Image'
import { Post } from '../../components/Post/Post'
import api from '../../api'

export function Comunidade() {
  const [isAuth, setIsAuth] = useState(false)
  const [posts, setPosts] = useState([])
  const [imagePost, setImagePost] = useState(null)
  const [postText, setPostText] = useState('') // Estado separado para o texto do post
  const hiddenFileInput = useRef(null)
  const token = JSON.parse(sessionStorage.getItem('user'))
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [token])

  const handleClick = () => {
    hiddenFileInput.current.click() // Dispara o clique no input de arquivo
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Image = reader.result
        setImagePost(base64Image) // Salva a imagem no estado
        sessionStorage.setItem('imgPerfil', base64Image) // Armazena no sessionStorage
      }
      reader.readAsDataURL(file)
    }
  }

  const postar = async () => {
    const formData = new FormData()
    formData.append("descricao", postText)

    if (imagePost) {
      formData.append("midia", imagePost) // Agora isso é um arquivo
    }

    console.log(formData.values)

    try {
      const response = await api.post('/postagens', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Não defina o Content-Type para multipart/form-data aqui, pois o navegador fará isso automaticamente
        }
      })

      if (response.status === 201) {
        setPosts([...posts, response.data])
        setPostText('')
        setImagePost(null)
      }
    } catch (error) {
      console.error(error)
    }

    console.log(token)
  }

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
            border: '1px solid #CBD5E0',
            borderRadius: 12,
            alignItems: 'center',
            padding: 16,
            margin: 16,
            maxHeight: '30vh',
            justifyContent: 'center',
          }}>
            <img
              src={userInfo.imgPerfil}
              alt='imagem de perfil'
              style={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                marginBottom: 16,
                border: '1px solid #CBD5E0',
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
            alignItems: 'center',
            margin: 16
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
            }}>
              <img
                src='https://avatars.githubusercontent.com/u/61742502?v=4'
                alt='imagem de perfil'
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  marginTop: 16,
                }}
              />

              <div>
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
                    value={postText} // Usa o estado postText para o conteúdo do post
                    onChange={(e) => setPostText(e.target.value)}
                  />

                  {/* Exibir a imagem carregada */}
                  {imagePost && (
                    <img
                      src={imagePost}
                      alt="Pré-visualização da imagem"
                      style={{
                        width: 500,
                        marginTop: 10,
                        borderRadius: 8,
                        border: '1px solid #CBD5E0',
                      }}
                    />
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  marginTop: 16,
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
              {posts.map((post, index) => (
                <>
                  <Post
                    key={index}
                    username={post.username}
                    content={post.content}
                    avatar={post.avatar}
                    imagemPost={post.imagemPost}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    liked={post.liked}
                    disliked={post.disliked}
                    commits={post.commits}
                  />

                  <Divider style={{ width: '100%', margin: '16px 0' }} />
                </>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            margin: 16,
            width: 300,
          }}>
            <Typography variant='body1' style={{ fontWeight: 'bold' }}>
              Atualizações
            </Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
