import { Button, TextField, ThemeProvider, Typography } from '@mui/material'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { theme } from '../../../theme.js'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

function CadastroEndereco() {
  const navigate = useNavigate()
  const nomeUsuario = JSON.parse(sessionStorage.getItem('user')).name

  const formik = useFormik({
    initialValues: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: ''
    },
    onSubmit: async (values) => {
      try {
        sessionStorage.setItem('endereco', JSON.stringify(values))

        navigate('/confirmacao')
      } catch (error) {
        if (error.response) {
          toast.error("Erro ao cadastrar endereço!")
        }
      }
    },
    validationSchema: yup.object().shape({
      cep: yup
        .string()
        .required('Insira seu CEP'),
      logradouro: yup
        .string()
        .required('Insira seu logradouro'),
      numero: yup
        .string()
        .required('Insira seu número'),
      cidade: yup
        .string()
        .required('Insira sua cidade'),
      estado: yup
        .string()
        .required('Insira seu estado'),
      complemento: yup
        .string()
    }),
  })

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='contained' onClick={() => navigate('/')} style={{ position: 'absolute', top: 16, left: 16, height: 40, width: 100 }}>
          Voltar
        </Button>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 16,
          width: '50vw',
          height: '100vh',
          paddingLeft: 80,
          paddingRight: 80,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h1' style={{ color: '#082031', textAlign: 'center' }}>
              Olá, <span style={{ color: '#E3A74F' }}> {nomeUsuario}</span>! Vamos começar?
            </Typography>

            <Typography variant='body1' style={{ color: '#082031', textAlign: 'center', fontSize: 16, marginTop: 16 }}>
              Insira seu endereço para que possamos te encontrar!
            </Typography>
          </div>

          <Formik
            initialValues={formik.initialValues}
            onSubmit={formik.handleSubmit}
            validationSchema={formik.validationSchema}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextField
                type="text"
                name="cep"
                value={formik.values.cep}
                label="CEP"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cep && Boolean(formik.errors.cep)}
                helperText={formik.touched.cep ? formik.errors.cep : ''}
              />

              <TextField
                type="text"
                name="logradouro"
                value={formik.values.logradouro}
                label="Logradouro"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.logradouro && Boolean(formik.errors.logradouro)}
                helperText={formik.touched.logradouro ? formik.errors.logradouro : ''}
              />

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  type="text"
                  name="cidade"
                  value={formik.values.cidade}
                  label="Cidade"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cidade && Boolean(formik.errors.cidade)}
                  helperText={formik.touched.cidade ? formik.errors.cidade : ''}
                  style={{ width: '45%' }}
                />

                <TextField
                  type="text"
                  name="estado"
                  value={formik.values.estado}
                  label="Estado"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.estado && Boolean(formik.errors.estado)}
                  helperText={formik.touched.estado ? formik.errors.estado : ''}
                  style={{ width: '45%' }}
                />
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  type="text"
                  name="numero"
                  value={formik.values.numero}
                  label="Número"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.numero && Boolean(formik.errors.numero)}
                  helperText={formik.touched.numero ? formik.errors.numero : ''}
                  style={{ width: '45%' }}
                />

                <TextField
                  type="text"
                  name="complemento"
                  value={formik.values.complemento}
                  label="Complemento"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.complemento && Boolean(formik.errors.complemento)}
                  helperText={formik.touched.complemento ? formik.errors.complemento : ''}
                  style={{ width: '45%' }}
                />
              </div>

              <Button
                variant='contained'
                type="submit"
                onClick={formik.handleSubmit}
              >Cadastrar</Button>
            </div>
          </Formik>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default CadastroEndereco
