import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import editicon from '../../../../utils/assets/editicon.svg'
import { useState } from 'react'
import api from '../../../../api'

export function FourthStep() {
  const [profileImage, setProfileImage] = useState(null)
  const [bannerImage, setBannerImage] = useState(null)

  const initialValues = {
    cep: '',
    cpf: '',
    logradouro: '',
    numero: '',
    cidade: '',
    estado: '',
    complemento: '',
    nomeDoNegocio: ''
  }

  const validationSchema = yup.object().shape({
    cep: yup.string().required('Insira seu CEP'),
    cpf: yup.string().required('Insira seu CPF'),
    logradouro: yup.string().required('Insira sua rua'),
    numero: yup.string().required('Insira seu número'),
    cidade: yup.string().required('Insira sua cidade'),
    estado: yup.string().required('Insira seu estado'),
    complemento: yup.string()
  })

  const onSubmit = async (values) => {
    const { cep, cpf, logradouro, numero, cidade, estado, complemento, nomeDoNegocio } = values
    const token = JSON.parse(sessionStorage.getItem('user'))

    const formData = new FormData()

    const barbeariaData = {
      cep,
      cpf,
      logradouro,
      numero,
      cidade,
      estado,
      complemento,
      nomeDoNegocio
    }

    formData.append('barbearia', barbeariaData)

    if (profileImage) {
      formData.append('perfil', profileImage)
    } else {
      console.warn('Imagem de perfil não selecionada.')
    }

    if (bannerImage) {
      formData.append('banner', bannerImage)
    } else {
      console.warn('Imagem de banner não selecionada.')
    }

    console.log('Formulário de cadastro de barbearia:', formData)

    try {
      const response = await api.post('/usuarios/cadastro-barbearia', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      })

      const barbearia = response.data
      console.log('Barbearia cadastrada:', barbearia)
    } catch (error) {
      console.error('Erro ao cadastrar barbearia:', error)
      toast.error('Erro ao cadastrar barbearia!')
    }
  }


  const fetchCep = async (cep, setFieldValue) => {
    console.log('Buscando CEP:', cep) // Log do CEP

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      console.log('Resposta do ViaCEP:', response.data) // Log da resposta

      const data = response.data

      if (!data.erro) {
        setFieldValue('logradouro', data.logradouro)
        setFieldValue('cidade', data.localidade)
        setFieldValue('estado', data.uf)
        setFieldValue('complemento', data.complemento)
      } else {
        toast.error('CEP não encontrado!')
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      toast.error('Erro ao buscar CEP!')
    }
  }

  const handleCepBlur = (event, formik) => {
    const cep = event.target.value.replace(/\D/g, '')
    console.log('CEP no blur:', cep)
    if (cep.length === 8) {
      fetchCep(cep, formik.setFieldValue)
    } else {
      toast.error('CEP deve ter 8 dígitos!')
    }
  }

  const handleImageProfileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setProfileImage(file)
      console.log('Arquivo de imagem de perfil:', file)
    } else {
      console.warn('Nenhum arquivo de imagem de perfil selecionado!')
    }
  }

  const handleImageBannerUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setBannerImage(file)
      console.log('Arquivo de imagem de banner:', file)
    } else {
      console.warn('Nenhum arquivo de imagem de banner selecionado!')
    }
  }

  return (
    <Box style={{ marginLeft: 32, marginRight: 32 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                INFORMAÇÕES ESSENCIAIS
              </Typography>

              <TextField
                type='text'
                name='cpf'
                value={formik.values.cpf}
                placeholder='CPF'
                label='CPF'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                helperText={formik.touched.cpf ? formik.errors.cpf : ''}
              />

              <Divider />

              <div>
                <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                  LOGO DA BARBEARIA
                </Typography>

                <div style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center', marginTop: 16 }}>
                  <img
                    alt='logo da barbearia'
                    src={profileImage ? URL.createObjectURL(profileImage) : 'https://via.placeholder.com/100'}
                    style={{ width: 100, height: 100, border: '1px solid #ccc', borderRadius: '50%' }}
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
                      onChange={handleImageProfileUpload}
                      style={{ display: 'none' }}
                    />
                  </Button>
                </div>
              </div>

              <div>
                <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                  CAPA DA BARBEARIA
                </Typography>

                <div style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center', marginTop: 16 }}>
                  <img
                    alt='capa da barbearia'
                    src={bannerImage ? URL.createObjectURL(bannerImage) : 'https://via.placeholder.com/300'}
                    style={{ width: 300, height: 150, border: '1px solid #ccc', borderRadius: 12 }}
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
                      onChange={handleImageBannerUpload}
                      style={{ display: 'none' }}
                    />
                  </Button>
                </div>
              </div>

              <Divider />

              <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                INFORMAÇÕES DO NEGÓCIO
              </Typography>

              <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                <TextField
                  type='text'
                  name='nomeDoNegocio'
                  value={formik.values.nomeDoNegocio}
                  placeholder='Nome da Barbearia'
                  label='Nome da Barbearia'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nomeDoNegocio && Boolean(formik.errors.nomeDoNegocio)}
                  helperText={formik.touched.nomeDoNegocio ? formik.errors.nomeDoNegocio : ''}
                />
              </div>

              <Divider />

              <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                ENDEREÇO
              </Typography>

              <TextField
                type='text'
                name='cep'
                value={formik.values.cep}
                placeholder='CEP'
                label='CEP'
                onChange={formik.handleChange}
                onBlur={event => {
                  formik.handleBlur(event)
                  handleCepBlur(event, formik)
                }}
                error={formik.touched.cep && Boolean(formik.errors.cep)}
                helperText={formik.touched.cep ? formik.errors.cep : ''}
              />

              <TextField
                type='text'
                name='logradouro'
                value={formik.values.logradouro}
                placeholder='Rua'
                label='Rua'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.logradouro && Boolean(formik.errors.logradouro)}
                helperText={formik.touched.logradouro ? formik.errors.logradouro : ''}
              />

              <TextField
                type='text'
                name='numero'
                value={formik.values.numero}
                placeholder='Número'
                label='Número'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.numero && Boolean(formik.errors.numero)}
                helperText={formik.touched.numero ? formik.errors.numero : ''}
              />

              <TextField
                type='text'
                name='cidade'
                value={formik.values.cidade}
                placeholder='Cidade'
                label='Cidade'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cidade && Boolean(formik.errors.cidade)}
                helperText={formik.touched.cidade ? formik.errors.cidade : ''}
              />

              <TextField
                type='text'
                name='estado'
                value={formik.values.estado}
                placeholder='Estado'
                label='Estado'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.estado && Boolean(formik.errors.estado)}
                helperText={formik.touched.estado ? formik.errors.estado : ''}
              />

              <TextField
                type='text'
                name='complemento'
                value={formik.values.complemento}
                placeholder='Complemento'
                label='Complemento'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.complemento && Boolean(formik.errors.complemento)}
                helperText={formik.touched.complemento ? formik.errors.complemento : ''}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
              >
                Finalizar Cadastro
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
