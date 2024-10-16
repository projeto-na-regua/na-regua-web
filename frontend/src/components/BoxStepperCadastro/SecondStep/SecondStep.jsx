import { Box, TextField, Typography } from '@mui/material'
import InputMask from 'react-input-mask'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'

export function SecondStep() {
  const formik = useFormik({
    initialValues: {
      nome: '',
      sobrenome: '',
      email: '',
      celular: '',
      senha: '',
      confirmarSenha: ''
    },
    validationSchema: yup.object().shape({
      nome: yup.string().required('Insira seu nome'),
      sobrenome: yup.string().required('Insira seu sobrenome'),
      email: yup.string().email('Insira um e-mail válido').required('Insira seu e-mail'),
      celular: yup.string().required('Insira seu telefone'),
      senha: yup.string().required('Insira sua senha'),
      confirmarSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas precisam ser iguais').required('Confirme sua senha')
    }),
    onSubmit: async (values) => {
      try {
        const userDataString = JSON.stringify(values)

        sessionStorage.setItem('userInfo', userDataString)
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
      }
    }
  })

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
        <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
          INFORMAÇÕES PESSOAIS
        </Typography>

        <Formik
          initialValues={formik.initialValues}
          onSubmit={formik.handleSubmit}
          validationSchema={formik.validationSchema}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <div style={{
              display: 'flex',
              gap: 16
            }}>
              <TextField
                type='text'
                name='nome'
                value={formik.values.nome}
                placeholder='Nome'
                label='Nome'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome ? formik.errors.nome : ''}
              />

              <TextField
                type='text'
                name='sobrenome'
                value={formik.values.sobrenome}
                placeholder='Sobrenome'
                label='Sobrenome'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sobrenome && Boolean(formik.errors.sobrenome)}
                helperText={formik.touched.sobrenome ? formik.errors.sobrenome : ''}
              />
            </div>

            <TextField
              type='email'
              name='email'
              value={formik.values.email}
              placeholder='E-mail'
              label='E-mail'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email ? formik.errors.email : ''}
            />

            <InputMask
              mask='(99) 99999-9999'
              maskChar='_'
            >
              {() => (
                <TextField
                  type='text'
                  name='celular'
                  placeholder='Telefone'
                  label='Telefone'
                  error={formik.touched.celular && Boolean(formik.errors.celular)}
                  helperText={formik.touched.celular ? formik.errors.celular : ''}
                />
              )}
            </InputMask>

            <TextField
              type='password'
              name='senha'
              value={formik.values.senha}
              placeholder='Senha'
              label='Senha'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.senha && Boolean(formik.errors.senha)}
              helperText={formik.touched.senha ? formik.errors.senha : ''}
            />

            <TextField
              type='password'
              name='confirmarSenha'
              value={formik.values.confirmarSenha}
              placeholder='Confirmar senha'
              label='Confirmar senha'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
              helperText={formik.touched.confirmarSenha ? formik.errors.confirmarSenha : ''}
            />
          </div>
        </Formik>
      </Box>
    </Box>
  )
}
