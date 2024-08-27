import { Button, TextField, ThemeProvider } from '@mui/material';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { theme } from '../../../theme.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';  // Importa o axios para fazer requisições HTTP

function CadastroBarbearia() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nomeDoNegocio: '',
      cpf: '',
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: ''
    },
    onSubmit: async (values) => {
      try {
        sessionStorage.setItem('barbearia', JSON.stringify(values));
        navigate('/confirmacao-barbearia');
      } catch (error) {
        if (error.response) {
          toast.error("Erro ao cadastrar barbearia!");
        }
      }
    },
    validationSchema: yup.object().shape({
      nomeDoNegocio: yup
        .string()
        .required('Nome do negócio é obrigatório'),
      cep: yup
        .string()
        .required('CEP é obrigatório'),
      estado: yup
        .string()
        .required('Estado é obrigatório'),
      cidade: yup
        .string()
        .required('Cidade é obrigatória'),
      bairro: yup
        .string()
        .required('Bairro é obrigatório'),
      logradouro: yup
        .string()
        .required('Logradouro é obrigatório'),
      numero: yup
        .string()
        .required('Número é obrigatório'),
      complemento: yup
        .string(),
      cpf: yup
        .string()
        .required('CPF é obrigatório')
    }),
  });

  const fetchEnderecoPorCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        formik.setValues(prevValues => ({
          ...prevValues,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      } else {
        toast.error("CEP não encontrado!");
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      toast.error("Erro ao buscar CEP!");
    }
  };

  const handleCepBlur = (event) => {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetchEnderecoPorCep(cep);
    }
  };

  const usuário = localStorage.getItem('usuário');

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
            <h1 style={{ fontSize: 24, color: '#082031', margin: 0 }}>Olá <span style={{ color: '#E3A74F' }}> {usuário} </span>!</h1>
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
                name="cpf"
                value={formik.values.cpf}
                label="CPF"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                helperText={formik.touched.cpf ? formik.errors.cpf : ''}
              />

              <TextField
                type="text"
                name="cep"
                value={formik.values.cep}
                label="CEP"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  handleCepBlur(e);
                }}
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
                  type="text"
                  name="numero"
                  value={formik.values.numero}
                  label="Número"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.numero && Boolean(formik.errors.numero)}
                  helperText={formik.touched.numero ? formik.errors.numero : ''}
                  fullWidth
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
  );
}
export default CadastroBarbearia;
