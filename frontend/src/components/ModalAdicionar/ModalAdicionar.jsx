import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import api from '../../api'
import { toast } from "react-toastify"
import InputMask from 'react-input-mask'
import { ModalPersonalizado } from '../ModalPersonalizado/ModalPersonalizado'
import LoadingButton from '@mui/lab/LoadingButton'

function ModalAdicionar(props) {
  const [carregando, setCarregando] = useState(false)
  const token = JSON.parse(sessionStorage.getItem('user'))

  return (
    <ModalPersonalizado
      children={
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: 32,
          alignItems: 'center',
          width: 400,
        }}>
          <Typography variant='h5'>Adicionar funcionário</Typography>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              phone: ''
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required('Campo obrigatório'),
              email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
              password: yup.string().required('Campo obrigatório').min(8, 'Senha deve ter no mínimo 8 caracteres'),
              phone: yup.string().matches(/^\d{10,11}$/, 'Telefone inválido').required('Campo obrigatório')
            })}
            onSubmit={async (values) => {
              try {
                setCarregando(true)

                const response = await api.post('/funcionarios/criar', {
                  nome: values.name,
                  email: values.email,
                  senha: values.password,
                  celular: values.phone
                }, {
                  headers: {
                    Authorization: token
                  }
                })

                if (response.status === 201) {
                  toast.success("Funcionário cadastrado com sucesso!", {
                    autoClose: 2000
                  })

                  setCarregando(false)
                  props.setOpen(false)
                  props.setListaFuncionarios([...props.listaFuncionarios, response.data])
                }
              } catch (error) {
                console.error('Erro ao adicionar funcionário:', error)

                if (error.response) {
                  toast.error("Erro ao adicionar funcionário!", {
                    autoClose: 2000
                  })
                }
              }
            }}
          >
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                width: '100%',
              }}>
                <TextField
                  type="text"
                  name="name"
                  placeholder="Nome do funcionário"
                  label="Nome do funcionário"
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.name && Boolean(formikProps.errors.name)}
                  helperText={formikProps.touched.name ? formikProps.errors.name : ''}
                />

                <TextField
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  label="E-mail"
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.email && Boolean(formikProps.errors.email)}
                  helperText={formikProps.touched.email ? formikProps.errors.email : ''}
                />

                <TextField
                  type="password"
                  name="password"
                  placeholder="Senha"
                  label="Senha"
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  error={formikProps.touched.password && Boolean(formikProps.errors.password)}
                  helperText={formikProps.touched.password ? formikProps.errors.password : ''}
                />

                <InputMask
                  mask="(99) 99999-9999"
                  maskChar="_"
                  value={formikProps.values.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
                    formikProps.handleChange({ target: { name: 'phone', value } })
                  }}
                  onBlur={formikProps.handleBlur}
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      type="text"
                      name="phone"
                      placeholder="Telefone"
                      label="Telefone"
                      error={formikProps.touched.phone && Boolean(formikProps.errors.phone)}
                      helperText={formikProps.touched.phone ? formikProps.errors.phone : ''}
                    />
                  )}
                </InputMask>

                {carregando
                  ? <LoadingButton loading variant="outlined">
                    Adicionar funcionário
                  </LoadingButton>
                  : <Button variant='contained' type="submit">
                    Adicionar funcionário
                  </Button>
                }
              </form>
            )}
          </Formik>
        </div>
      }
      open={props.open}
      setOpen={props.setOpen}
      handleClose={() => props.setOpen(false)}
    />
  )
}

export default ModalAdicionar
