import { Button, TextField, ThemeProvider } from '@mui/material'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { theme } from '../../../theme.js'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

function CadastroUsuario() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      cep: '',
      bairro: '',
      logradouro: '',
      number: '',
      complement: ''
    },
    validationSchema: yup.object().shape({
      cep: yup
        .string()
        .required('Insira seu CEP'),
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
    onSubmit: async (values) => {
      console.log('oi')
      try {
        const addressDataString = JSON.stringify(values)

        sessionStorage.setItem('address', addressDataString)

        const userDataString = sessionStorage.getItem('user')
        if (userDataString) {
          const userData = JSON.parse(userDataString)
          const mergedData = { ...userData, ...values }

          sessionStorage.setItem('user', JSON.stringify(mergedData))
        } else {
          sessionStorage.setItem('user', JSON.stringify(values))
        }

        navigate('/confirmacao')
      } catch (error) {
        console.error('Erro ao cadastrar endereço:', error)
        toast.error('Erro ao cadastrar endereço', { autoClose: 2000 })
      }
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => navigate('/')} style={{ position: 'absolute', top: 16, left: 16 }}>Voltar</Button>

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
            <h1 style={{ fontSize: 24, color: '#082031', margin: 0 }}>Olá!</h1>
            <h2 style={{ fontSize: 16, fontWeight: 500, color: '#E3A74F' }}>Informe seus dados para realizar seu cadastro</h2>
          </div>

          <Formik
            initialValues={formik.initialValues}
            onSubmit={formik.handleSubmit}
            validationSchema={formik.validationSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}> {/* Adicionei o onSubmit no form */}
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

                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      type="text"
                      name="bairro"
                      value={formik.values.bairro}
                      label="Bairro"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.bairro && Boolean(formik.errors.bairro)}
                      helperText={formik.touched.bairro ? formik.errors.bairro : ''}
                      style={{ width: '45%' }}
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
                      style={{ width: '45%' }}
                    />
                  </div>

                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      type="number"
                      name="number"
                      value={formik.values.number}
                      label="Número"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.number && Boolean(formik.errors.number)}
                      helperText={formik.touched.number ? formik.errors.number : ''}
                      style={{ width: '45%' }}
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
                      style={{ width: '45%' }}
                    />
                  </div>

                  <Button type='submit'>Próximo</Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default CadastroUsuario
