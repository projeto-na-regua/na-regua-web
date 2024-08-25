import { useNavigate } from 'react-router-dom'
import api from '../../api.js'
import TextField from '@mui/material/TextField'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../../theme.js'
import { Button, Link } from '@mui/material'
import image from '../../utils/assets/Imagem Login.png'
import logo from '../../utils/assets/logo-scale1.svg'
import { toast } from "react-toastify"
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'

function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const response = await api.post('/usuarios', {
          email: values.email,
          senha: values.password
        })

        const data = response.data

        setIsLoading(false)

        sessionStorage.setItem('user', JSON.stringify(data))
        toast.success("Login realizado com sucesso!", {
          autoClose: 2000
        })

        const user = JSON.parse(sessionStorage.getItem('user'))

        const fetchUser = async () => {
          try {
            const response = await api.get('/usuarios/perfil', {
              headers: {
                Authorization: user
              }
            })

            const data = response.data
            sessionStorage.setItem('userInfo', JSON.stringify(data))

          } catch (error) {
            console.error(error)
          }
        }

        const fetchBarbearia = async () => {
          try {
            const response = await api.get('/barbearias/perfil', {
              headers: {
                Authorization: user
              }
            })

            const data = response.data
            sessionStorage.setItem('barbearia', JSON.stringify(data))

          } catch (error) {
            console.error(error)
          }
        }

        fetchUser()
        fetchBarbearia()

        setTimeout(() => {
          if (user) {
            navigate('/perfil/agendamentos')
          }
        }, 4000)
      } catch (error) {
        if (error.response) {
          toast.error("Email ou senha inválidos!")
        }
      }
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email Inválido!")
        .required('Insira seu e-mail'),
      password: yup
        .string()
        .required('Insira sua senha')
    })
  })

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' onClick={() => navigate('/')} style={{ position: 'absolute', top: 16, left: 16, height: 40, width: 100 }}>Voltar</Button>

        <div style={{
          width: '60vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F4F3EE'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 16,
            padding: 32,
            width: '35vw'
          }}>
            <img src={logo} alt='logo-na-regua' style={{ width: 200, alignSelf: 'center' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontSize: 24, color: '#082031', margin: 0 }}>Olá, bem-vindo de volta!</h1>
              <h2 style={{ fontSize: 16, fontWeight: 500, color: '#082031' }}>Faça login para acessar sua conta!</h2>
            </div>

            <Formik
              initialValues={formik.initialValues}
              onSubmit={formik.handleSubmit}
              validationSchema={formik.validationSchema}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField
                  type="email"
                  name="email"
                  value={formik.values.email}
                  placeholder="E-mail"
                  label="E-mail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email ? formik.errors.email : ''}
                />


                <TextField
                  type="password"
                  name="password"
                  value={formik.values.password}
                  placeholder="Senha"
                  label="Senha"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password ? formik.errors.password : ''}
                />

                <Link to="/cadastro" alignSelf='flex-end' style={{ cursor: 'pointer' }}>Esqueceu sua senha?</Link>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isLoading}
                  style={{ width: '100%', height: 48, alignSelf: 'center' }}
                  onClick={formik.handleSubmit}
                >
                  Entrar
                </LoadingButton>

                <div style={{ display: 'flex', gap: 8, alignSelf: 'center' }}>
                  <span>Não tem uma conta?</span>

                  <Link href='/cadastro' style={{ cursor: 'pointer' }}>Cadastre-se</Link>
                </div>
              </div>
            </Formik>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#F4F3EE', height: '100vh' }}>
          <img src={image} alt='barber' />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login
