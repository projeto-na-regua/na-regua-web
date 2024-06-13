import React from 'react'
import { Button, Link, TextField, ThemeProvider } from '@mui/material'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { theme } from '../../../theme.js'
import image from '../../../utils/assets/Imagem Login.png'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import InputMask from 'react-input-mask'

function CadastroUsuario() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      celular: ''
    },
    validationSchema: yup.object().shape({
      nome: yup.string().required('Insira seu nome'),
      email: yup.string().email('Insira um e-mail válido').required('Insira seu e-mail'),
      senha: yup.string().required('Insira sua senha'),
      confirmarSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas precisam ser iguais').required('Confirme sua senha'),
      celular: yup.string().required('Insira seu telefone')
    }),
    onSubmit: async (values) => {
      try {
        const userDataString = JSON.stringify(values)

        sessionStorage.setItem('userInfo', userDataString)

        navigate('/cadastro-endereco')
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        toast.error('Erro ao cadastrar usuário', { autoClose: 2000 })
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' onClick={() => navigate('/')} style={{ position: 'absolute', top: 16, left: 16, height: 40, width: 100 }}>
          Voltar
        </Button>

        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#F4F3EE', height: '100vh' }}>
          <img src={image} alt='barber' />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, padding: 80, width: '100%' }}>
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
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <TextField
                    type="text"
                    name="nome"
                    value={formik.values.nome}
                    placeholder="Nome"
                    label="Nome"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                    helperText={formik.touched.nome ? formik.errors.nome : ''}
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

                  <InputMask
                    mask="(99) 99999-9999"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maskChar="_"
                  >
                    {() => (
                      <TextField
                        type="text"
                        name="celular"
                        placeholder="Telefone"
                        label="Telefone"
                        error={formik.touched.celular && Boolean(formik.errors.celular)}
                        helperText={formik.touched.celular ? formik.errors.celular : ''}

                      />
                    )}
                  </InputMask>

                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      type="password"
                      name="senha"
                      value={formik.values.senha}
                      placeholder="Senha"
                      label="Senha"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.senha && Boolean(formik.errors.senha)}
                      helperText={formik.touched.senha ? formik.errors.senha : ''}
                      style={{ width: '45%' }}
                    />

                    <TextField
                      type="password"
                      name="confirmarSenha"
                      value={formik.values.confirmarSenha}
                      placeholder="Confirme sua senha"
                      label="Confirme sua senha"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
                      helperText={formik.touched.confirmarSenha ? formik.errors.confirmarSenha : ''}
                      style={{ width: '45%' }}
                    />
                  </div>

                  <Button variant='contained' type="submit" onClick={() => formik.handleSubmit}>Cadastrar</Button>

                  <div style={{ display: 'flex', gap: 8, alignSelf: 'center' }}>
                    <span>Já tem uma conta?</span>

                    <Link href='/cadastro' style={{ cursor: 'pointer' }}>Entre</Link>
                  </div>
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
