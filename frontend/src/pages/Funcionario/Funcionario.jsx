
import { useEffect, useState } from 'react'
import React from 'react'
import styles from './Funcionario.module.css'
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro'
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import { Button, TextField, Typography } from '@mui/material'
import CardPequenoFuncionario from '../../components/CardPequenoFuncionario/CardPequenoFuncionario'
import CardFuncionario from '../../components/CardFuncionario/CardFuncionario'
import { ModalPersonalizado } from '../../components/ModalPaiEditarFuncionario/ModalPersonalizado'
import api from '../../api'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'

export function Funcionarios() {
  const [modal, setModal] = useState(false)
  const [modalAdicionar, setModalAdicionar] = useState(false)
  const [listaFuncionarios, setListaFuncionarios] = useState([])
  const token = JSON.parse(sessionStorage.getItem('user'))
  const totalFuncionarios = listaFuncionarios.length

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get('/funcionarios', {
          headers: {
            Authorization: token
          }
        })

        setListaFuncionarios(response.data)
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
      }
    }

    fetchFuncionarios()
  }, [token, listaFuncionarios])

  const handleAdicionar = () => {
    setModalAdicionar(true)
  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      celular: ''
    },
    validationSchema: yup.object().shape({
      nome: yup
        .string()
        .required('Campo obrigatório'),
      email: yup
        .string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      senha: yup
        .string()
        .required('Campo obrigatório'),
      celular: yup
        .string()
        .required('Campo obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post('/funcionarios/criar', values, {
          headers: {
            Authorization: token
          }
        })

        if (response.status === 201) {
          setModalAdicionar(false)
        }
      } catch (error) {
        console.error('Erro ao adicionar funcionário:', error)
        console.log('Erro completo:', error)
      }

      console.log('Valores do formulário:', values)

      formik.resetForm()
    }
  })

  return (
    <div className="Header">

      <HeaderUsuario />

      <div className={styles.conteudo}>
        <div className={styles.container}>
          <div className={styles.conteudoFuncionarios}>
            <NavbarBarbeiro />

            <div style={{
              display: 'flex',
              marginTop: 32,
              gap: 32,
              width: '100%',
              justifyContent: 'space-between',
            }}>
              <div style={{
                display: 'flex',
                gap: 32
              }}>
                <TextField
                  label="Buscar por funcionário"
                  variant="outlined"
                />

                <TextField
                  label="Filtro por cargo"
                  variant="outlined"
                />
              </div>

              <Button
                variant='contained'
                onClick={() => setModalAdicionar(true)}
              >
                Extrair relatório
              </Button>
            </div>

            <div className={styles.quadroFuncionarios}>
              <div className={styles.totalAdicionarFuncionarios}>
                <CardPequenoFuncionario
                  title='Total de funcionários'
                  icon={totalFuncionarios}
                />

                <CardPequenoFuncionario
                  icon={
                    <svg width="30" height="35" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M43 40.5H28M35.5 33V48M3 48C3 38.335 10.835 30.5 20.5 30.5C22.2375 30.5 23.9157 30.7532 25.5 31.2247M30.5 13C30.5 18.5229 26.0228 23 20.5 23C14.9771 23 10.5 18.5229 10.5 13C10.5 7.47715 14.9771 3 20.5 3C26.0228 3 30.5 7.47715 30.5 13Z" stroke="#082031" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                  title="Adicionar funcionário"
                  cursor='pointer'
                  onClick={handleAdicionar}
                />
              </div>

              <div className={styles.listaFuncionarios}>
                {listaFuncionarios.length > 0 ? (
                  listaFuncionarios.map((funcionario) => (
                    <CardFuncionario
                      key={funcionario.id}
                      name={funcionario.nome}
                      onClick={() => setModal(true)}
                    />
                  ))
                ) : (
                  <div>Nenhum funcionário encontrado.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <ModalPersonalizado
          children={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              padding: 32,
              alignItems: 'center',
              width: 400,
            }}>
              <Typography variant='h5'>Nome do Funcionário</Typography>

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}>
                  <Typography variant='h7'>E-mail:</Typography>
                  <Typography variant='h7'>Telefone:</Typography>
                  <Typography variant='h7'>Cargo:</Typography>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}>
                  <Typography variant='h7'>Monique Farias</Typography>
                  <Typography variant='h7'>(11) 99999-9999</Typography>
                  <Typography variant='h7'>Cargo: Funcionário</Typography>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: 32,
              }}>
                <Button
                  variant='outlined'
                  onClick={() => {
                    setModal(false)
                  }}
                >
                  Fechar
                </Button>

                <Button
                  variant='contained'
                  onClick={() => {
                    setModal(false)
                  }}
                >
                  Editar funcionário
                </Button>
              </div>
            </div>
          }
          open={modal}
          setOpen={setModal}
          handleClose={() => setModal(false)}
        />
      )}

      {modalAdicionar && (
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
                initialValues={formik.initialValues}
                onSubmit={formik.handleSubmit}
                validationSchema={formik.validationSchema}
              >
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
                  />

                  <TextField
                    type="text"
                    name="celular"
                    value={formik.values.celular}
                    placeholder="Telefone"
                    label="Telefone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.celular && Boolean(formik.errors.celular)}
                    helperText={formik.touched.celular ? formik.errors.celular : ''}
                  />

                  <Button
                    variant='contained'
                    onClick={formik.handleSubmit}
                  >
                    Adicionar funcionário
                  </Button>
                </div>
              </Formik>
            </div>
          }
          open={modalAdicionar}
          setOpen={setModalAdicionar}
          handleClose={() => setModalAdicionar(false)}
        />
      )}
    </div>
  )
}
export default Funcionarios
