import { Button, TextField, ThemeProvider } from '@mui/material'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { theme } from '../../../theme.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function CadastroBarbearia() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nomeDoNegocio: '',
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      number: '',
      complement: ''
    },
    onSubmit: async (values) => {
      try {
        sessionStorage.setItem('barbearia', JSON.stringify(values))

        navigate('/confirmacao-barbearia')
      } catch (error) {
        if (error.response) {
          toast.error("Erro ao cadastrar endereço!")
        }
      }
    },
    validationSchema: yup.object().shape({
      nomeDoNegocio: yup
        .string()
        .required('Insira o nome da barbearia'),
      cep: yup
        .string()
        .required('Insira seu CEP'),
      estado: yup
        .string()
        .required('Insira seu estado'),
      cidade: yup
        .string()
        .required('Insira sua cidade'),
      bairro: yup
        .string()
        .required('Insira seu bairro'),
      logradouro: yup
        .string()
        .required('Insira seu logradouro'),
      number: yup
        .string()
        .required('Insira seu número'),
      complement: yup
        .string()
    }),
  })

  const usuário = localStorage.getItem('usuário')

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
          alignItems: 'center',
          gap: 16,
          width: '50vw',
          height: '100vh',
          paddingLeft: 80,
          paddingRight: 80,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: 24, color: '#082031', margin: 0 }}>Olá <span style={{ color: '#E3A74F' }}> {usuário} </span> !</h1>
            <h2 style={{ fontSize: 16, fontWeight: 500, color: '#E3A74F' }}>Informe seus dados para realizar seu cadastro</h2>
          </div>

          <Formik
            initialValues={formik.initialValues}
            onSubmit={formik.handleSubmit}
            validationSchema={formik.validationSchema}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 600 }}>
              <TextField
                type="text"
                name="nomeDoNegocio"
                value={formik.values.nomeDoNegocio}
                label="Nome da barbearia"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nomeDoNegocio && Boolean(formik.errors.nomeDoNegocio)}
                helperText={formik.touched.nomeDoNegocio ? formik.errors.nomeDoNegocio : ''}
              />
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

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 32 }}>
                <TextField
                  type="text"
                  name="estado"
                  value={formik.values.estado}
                  label="Estado"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.estado && Boolean(formik.errors.estado)}
                  helperText={formik.touched.estado ? formik.errors.estado : ''}
                  fullWidth
                />

                <TextField
                  type="text"
                  name="cidade"
                  value={formik.values.cidade}
                  label="Cidade"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cidade && Boolean(formik.errors.cidade)}
                  helperText={formik.touched.cidade ? formik.errors.cidade : ''}
                  fullWidth
                />
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 32 }}>
                <TextField
                  type="text"
                  name="bairro"
                  value={formik.values.bairro}
                  label="Bairro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bairro && Boolean(formik.errors.bairro)}
                  helperText={formik.touched.bairro ? formik.errors.bairro : ''}
                  fullWidth
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
                  fullWidth
                />
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 32 }}>
                <TextField
                  type="number"
                  name="number"
                  value={formik.values.number}
                  label="Número"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  helperText={formik.touched.number ? formik.errors.number : ''}
                  fullWidth
                />

                <TextField
                  type="text"
                  name="complement"
                  value={formik.values.complement}
                  label="Complemento"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.complement && Boolean(formik.errors.complement)}
                  helperText={formik.touched.complement ? formik.errors.complement : ''}
                  fullWidth
                />
              </div>

              <Button
                variant='contained'
                type='submit'
                onClick={formik.handleSubmit}>
                Próximo
              </Button>
            </div>
          </Formik>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default CadastroBarbearia
