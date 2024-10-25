import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import InputMask from 'react-input-mask'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import editicon from '../../../../utils/assets/editicon.svg'

export function FourthStep() {
  const formik = useFormik({
    initialValues: {
      cep: '',
      rua: '',
      numero: '',
      cidade: '',
      estado: '',
      complemento: '',
      cpf: '',
      nomeBarbearia: '',
      descricao: '',
      imagemLogo: '',
      imagemCapa: ''
    },
    validationSchema: yup.object().shape({
      cep: yup.string().required('Insira seu CEP'),
      rua: yup.string().required('Insira sua rua'),
      numero: yup.string().required('Insira seu número'),
      cidade: yup.string().required('Insira sua cidade'),
      estado: yup.string().required('Insira seu estado'),
      complemento: yup.string()
    }),
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  const fetchCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const data = response.data

      if (!data.erro) {
        formik.setValues({
          ...formik.values,
          logradouro: data.logradouro,
          cidade: data.localidade,
          estado: data.uf,
          complemento: data.complemento,
          bairro: data.bairro
        })
      } else {
        toast.error('CEP não encontrado!')
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      toast.error('Erro ao buscar CEP!')
    }
  }

  const handleCepBlur = (event) => {
    const cep = event.target.value.replace(/\D/g, '')
    if (cep.length === 8) {
      fetchCep(cep)
    }
  }

  return (
    <Box style={{
      marginLeft: 32,
      marginRight: 32
    }}>
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        <div>
            <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
              LOGO DA BARBEARIA
            </Typography>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
              marginTop: 16
            }}>
              <img
                alt='logo da barbearia'
                src='https://via.placeholder.com/100'
                style={{
                  width: 100,
                  height: 100,
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                }} />

              <Button
                variant='contained'
                startIcon={<img src={editicon} alt='editar' />}
                title='Editar'
                style={{
                  borderColor: '#082031',
                  borderRadius: 12,
                  textTransform: 'none',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              >
                Adicionar imagem
              </Button>
            </div>
          </div>

          <div>
            <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
              CAPA DA BARBEARIA
            </Typography>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
              marginTop: 16
            }}>
              <img
                alt='capa da barbearia'
                src='https://via.placeholder.com/300x150'
                style={{
                  width: 300,
                  height: 150,
                  border: '1px solid #ccc',
                  borderRadius: 12,
                }} />

              <Button
                variant='contained'
                startIcon={<img src={editicon} alt='editar' />}
                title='Editar'
                style={{
                  borderColor: '#082031',
                  borderRadius: 12,
                  textTransform: 'none',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              >
                Adicionar imagem
              </Button>
            </div>
          </div>

          <Divider />

        <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
          INFORMAÇÕES DO NEGÓCIO
        </Typography>

        <Formik>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <InputMask
              mask='99999-999'
              maskChar={'_'}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                handleCepBlur(e);
              }}
              value={formik.values.cep}
            >
              {() => (
                <TextField
                  type='text'
                  name='cep'
                  placeholder='CEP'
                  label='CEP'
                  error={formik.touched.cep && Boolean(formik.errors.cep)}
                  helperText={formik.touched.cep ? formik.errors.cep : ''}
                />
              )}
            </InputMask>

            <div style={{
              display: 'flex',
              gap: 16
            }}>
              <TextField
                type='text'
                name='rua'
                value={formik.values.rua}
                placeholder='Rua'
                label='Rua'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rua && Boolean(formik.errors.rua)}
                helperText={formik.touched.rua ? formik.errors.rua : ''}
                fullWidth
              />

              <TextField
                type='text'
                name='numero'
                value={formik.values.numero}
                placeholder='Nº'
                label='Nº'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.numero && Boolean(formik.errors.numero)}
                helperText={formik.touched.numero ? formik.errors.numero : ''}
                style={{
                  width: 220
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: 16
            }}>
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
            </div>

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
          </div>
        </Formik>
      </Box>
    </Box>
  )
}
