import { Box, TextField, Typography, ThemeProvider } from '@mui/material'
import InputMask from 'react-input-mask'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { theme } from '../../../../theme'

export function ThirdStep({ onChange }) {
  const validationSchema = yup.object().shape({
    cep: yup.string().required('Insira seu CEP'),
    rua: yup.string().required('Insira sua rua'),
    numero: yup.string().required('Insira seu número'),
    cidade: yup.string().required('Insira sua cidade'),
    estado: yup.string().required('Insira seu estado'),
    complemento: yup.string()
  })

  const fetchCep = async (cep, setFieldValue) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const data = response.data

      if (!data.erro) {
        setFieldValue('rua', data.logradouro)
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

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={JSON.parse(sessionStorage.getItem('enderecoInfo')) || {
          cep: '',
          rua: '',
          numero: '',
          cidade: '',
          estado: '',
          complemento: ''
        }}
        validationSchema={validationSchema}
        onChange={(values) => {
          sessionStorage.setItem('enderecoInfo', JSON.stringify(values))
        }}
      >
        {({ handleChange, handleBlur, setFieldValue, values, touched, errors }) => {
          const updateSessionStorage = (name, value) => {
            const updatedValues = { ...values, [name]: value }
            sessionStorage.setItem('enderecoInfo', JSON.stringify(updatedValues))
          }

          const handleCepBlur = (event) => {
            const cep = event.target.value.replace(/\D/g, '')
            if (cep.length === 8) {
              fetchCep(cep, setFieldValue)
            }
          }

          return (
            <form>
              <Box style={{ marginLeft: 32, marginRight: 32 }}>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
                    INFORMAÇÕES DE ENDEREÇO
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
                    <InputMask
                      mask='99999-999'
                      maskChar={'_'}
                      value={values.cep}
                      onChange={(e) => {
                        handleChange(e)
                        updateSessionStorage('cep', e.target.value)
                      }}
                      onBlur={(e) => {
                        handleBlur(e)
                        handleCepBlur(e)
                      }}
                    >
                      {() => (
                        <TextField
                          type='text'
                          name='cep'
                          placeholder='CEP'
                          label='CEP'
                          error={touched.cep && Boolean(errors.cep)}
                          helperText={touched.cep ? errors.cep : ''}
                        />
                      )}
                    </InputMask>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <TextField
                        type='text'
                        name='rua'
                        value={values.rua}
                        placeholder='Rua'
                        label='Rua'
                        onChange={(e) => {
                          handleChange(e)
                          updateSessionStorage('rua', e.target.value)
                        }}
                        onBlur={handleBlur}
                        error={touched.rua && Boolean(errors.rua)}
                        helperText={touched.rua ? errors.rua : ''}
                        fullWidth
                      />

                      <TextField
                        type='text'
                        name='numero'
                        value={values.numero}
                        placeholder='Nº'
                        label='Nº'
                        onChange={(e) => {
                          handleChange(e)
                          updateSessionStorage('numero', e.target.value)
                        }}
                        onBlur={handleBlur}
                        error={touched.numero && Boolean(errors.numero)}
                        helperText={touched.numero ? errors.numero : ''}
                        style={{ width: 220 }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                      <TextField
                        type='text'
                        name='cidade'
                        value={values.cidade}
                        placeholder='Cidade'
                        label='Cidade'
                        onChange={(e) => {
                          handleChange(e)
                          updateSessionStorage('cidade', e.target.value)
                        }}
                        onBlur={handleBlur}
                        error={touched.cidade && Boolean(errors.cidade)}
                        helperText={touched.cidade ? errors.cidade : ''}
                      />

                      <TextField
                        type='text'
                        name='estado'
                        value={values.estado}
                        placeholder='Estado'
                        label='Estado'
                        onChange={(e) => {
                          handleChange(e)
                          updateSessionStorage('estado', e.target.value)
                        }}
                        onBlur={handleBlur}
                        error={touched.estado && Boolean(errors.estado)}
                        helperText={touched.estado ? errors.estado : ''}
                      />
                    </div>

                    <TextField
                      type='text'
                      name='complemento'
                      value={values.complemento}
                      placeholder='Complemento'
                      label='Complemento'
                      onChange={(e) => {
                        handleChange(e)
                        updateSessionStorage('complemento', e.target.value)
                      }}
                      onBlur={handleBlur}
                      error={touched.complemento && Boolean(errors.complemento)}
                      helperText={touched.complemento ? errors.complemento : ''}
                    />
                  </div>
                </Box>
              </Box>
            </form>
          )
        }}
      </Formik>
    </ThemeProvider>
  )
}
