import api from '../../../api'
import { Button, Link, TextField, ThemeProvider } from '@mui/material'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { theme } from '../../../theme.js'
import image from '../../../utils/assets/amico.svg'
import { useNavigate } from 'react-router-dom'

function CadastroUsuario() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      phone: ''
    },
    onSubmit: async (values) => {
      const response = await api.post('/usuarios', values)

      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso!')
      } else {
        alert('Erro ao cadastrar usuário')
      }
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required('Insira seu nome'),
      email: yup
        .string()
        .email('Insira um e-mail válido')
        .required('Insira seu e-mail'),
      password: yup
        .string()
        .required('Insira sua senha'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais')
        .required('Confirme sua senha'),
      birthDate: yup
        .string()
        .required('Insira sua data de nascimento'),
      phone: yup
        .string()
        .required('Insira seu telefone')
    })
  })

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => navigate('/')} style={{ position: 'absolute', top: 16, left: 16 }}>Voltar</Button>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 16,
          padding: 80,
          width: '100%'
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <TextField
                type="text"
                name="name"
                value={formik.values.name}
                placeholder="Nome"
                label="Nome"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name ? formik.errors.name : ''}
              />

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

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
                  style={{ width: '45%' }}
                />

                <TextField
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  placeholder="Confirme sua senha"
                  label="Confirme sua senha"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
                  style={{ width: '45%' }}
                />
              </div>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  type="date"
                  name="birthDate"
                  value={formik.values.birthDate}
                  placeholder="Data de Nascimento"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                  helperText={formik.touched.birthDate ? formik.errors.birthDate : ''}
                  style={{ width: '45%' }}
                />

                <TextField
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  placeholder="Telefone"
                  label="Telefone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone ? formik.errors.phone : ''}
                  style={{ width: '45%' }}
                />
              </div>

              <Button type='submit'>Cadastrar</Button>

              <div style={{ display: 'flex', gap: 8, alignSelf: 'center' }}>
                <span>Já tem uma conta?</span>

                <Link href='/cadastro' style={{ cursor: 'pointer' }}>Entre</Link>
              </div>
            </div>
          </Formik>
        </div>

        <div style={{ width: '50vw', display: 'flex', justifyContent: 'center', backgroundColor: '#082031', height: '100vh' }}>
          <img src={image} alt='barber' style={{ padding: 64 }} />
        </div>
      </div>
    </ThemeProvider>
  )
}
export default CadastroUsuario
