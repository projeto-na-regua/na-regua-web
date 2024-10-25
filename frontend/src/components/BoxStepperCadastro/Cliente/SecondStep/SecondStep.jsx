import { Box, Button, Divider, TextField, ThemeProvider, Typography } from '@mui/material'
import InputMask from 'react-input-mask'
import { Formik } from 'formik'
import * as yup from 'yup'
import editicon from '../../../../utils/assets/editicon.svg'
import { theme } from '../../../../theme'
import { useState } from 'react'

export function SecondStep({ onChange }) {
  const [profileImage, setProfileImage] = useState(null) // Estado inicial sem referência ao sessionStorage

  const validationSchema = yup.object().shape({
    nome: yup.string().required('Insira seu nome'),
    sobrenome: yup.string().required('Insira seu sobrenome'),
    email: yup.string().email('Insira um e-mail válido').required('Insira seu e-mail'),
    celular: yup.string().required('Insira seu telefone'),
    senha: yup.string().required('Insira sua senha'),
    confirmarSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas precisam ser iguais').required('Confirme sua senha'),
  })

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Image = reader.result
        setProfileImage(base64Image) // Exibe a imagem
        updateSessionStorage('profileImage', base64Image) // Adiciona a imagem no userInfo
      }
      reader.readAsDataURL(file)
    }
  }

  const updateSessionStorage = (name, value) => {
    const storedValues = JSON.parse(sessionStorage.getItem('userInfo')) || {}
    const updatedValues = { ...storedValues, [name]: value }
    sessionStorage.setItem('userInfo', JSON.stringify(updatedValues))
  }

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{
          nome: '',
          sobrenome: '',
          email: '',
          celular: '',
          senha: '',
          confirmarSenha: '',
        }}
        validationSchema={validationSchema}>
        {({ handleChange, handleBlur, values, touched, errors }) => (
          <form>
            <Box style={{ marginLeft: 32, marginRight: 32 }}>
              <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                    IMAGEM DE PERFIL
                  </Typography>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 16,
                    alignItems: 'center',
                    marginTop: 16,
                  }}>
                    <img
                      alt='imagem de perfil'
                      src={profileImage || 'https://via.placeholder.com/100'}
                      style={{
                        width: 100,
                        height: 100,
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                      }}
                    />
                    <Button
                      variant='contained'
                      startIcon={<img src={editicon} alt='editar' />}
                      component="label"
                      title='Editar'
                      style={{
                        borderColor: '#082031',
                        borderRadius: 12,
                        textTransform: 'none',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      Adicionar imagem
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </Button>
                  </div>
                </div>

                <Divider />

                <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                  INFORMAÇÕES PESSOAIS
                </Typography>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <TextField
                      type='text'
                      name='nome'
                      value={values.nome}
                      placeholder='Nome'
                      label='Nome'
                      onChange={(e) => {
                        handleChange(e)
                        updateSessionStorage('nome', e.target.value)
                      }}
                      onBlur={handleBlur}
                      error={touched.nome && Boolean(errors.nome)}
                      helperText={touched.nome ? errors.nome : ''}
                    />

                    <TextField
                      type='text'
                      name='sobrenome'
                      value={values.sobrenome}
                      placeholder='Sobrenome'
                      label='Sobrenome'
                      onChange={(e) => {
                        handleChange(e)
                        updateSessionStorage('sobrenome', e.target.value)
                      }}
                      onBlur={handleBlur}
                      error={touched.sobrenome && Boolean(errors.sobrenome)}
                      helperText={touched.sobrenome ? errors.sobrenome : ''}
                    />
                  </div>

                  <TextField
                    type='email'
                    name='email'
                    value={values.email}
                    placeholder='E-mail'
                    label='E-mail'
                    onChange={(e) => {
                      handleChange(e)
                      updateSessionStorage('email', e.target.value)
                    }}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email ? errors.email : ''}
                  />

                  <InputMask
                    mask='(99) 99999-9999'
                    maskChar='_'
                    onChange={(e) => {
                      handleChange(e)
                      updateSessionStorage('celular', e.target.value)
                    }}
                    onBlur={handleBlur}
                    value={values.celular}
                  >
                    {() => (
                      <TextField
                        type='text'
                        name='celular'
                        placeholder='Telefone'
                        label='Telefone'
                        error={touched.celular && Boolean(errors.celular)}
                        helperText={touched.celular ? errors.celular : ''}
                      />
                    )}
                  </InputMask>

                  <TextField
                    type='password'
                    name='senha'
                    value={values.senha}
                    placeholder='Senha'
                    label='Senha'
                    onChange={(e) => {
                      handleChange(e)
                      updateSessionStorage('senha', e.target.value)
                    }}
                    onBlur={handleBlur}
                    error={touched.senha && Boolean(errors.senha)}
                    helperText={touched.senha ? errors.senha : ''}
                  />

                  <TextField
                    type='password'
                    name='confirmarSenha'
                    value={values.confirmarSenha}
                    placeholder='Confirmar senha'
                    label='Confirmar senha'
                    onChange={(e) => {
                      handleChange(e)
                      updateSessionStorage('confirmarSenha', e.target.value)
                    }}
                    onBlur={handleBlur}
                    error={touched.confirmarSenha && Boolean(errors.confirmarSenha)}
                    helperText={touched.confirmarSenha ? errors.confirmarSenha : ''}
                  />
                </div>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </ThemeProvider>
  )
}
