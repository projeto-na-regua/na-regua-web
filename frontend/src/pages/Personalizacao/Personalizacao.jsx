
import React, { useEffect } from 'react';
import styles from './Personalizacao.module.css'
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro'
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario'
import imagemPerfil from  '../../utils/assets/imagem-perfil.svg'
import imagemCapa from '../../utils/assets/capa-barbearia.svg'
import editIcon from '../../utils/assets/IconsHeaderUsuario/IconEditar.svg'
import { Button } from '@mui/material'
import { TextField, ThemeProvider } from '@mui/material'
import { useFormik } from 'formik'
import { theme } from '../../theme'
import { toast } from 'react-toastify'

export function Personalizacao(){

  const formik = useFormik({
    initialValues: {
      nomeDoNegocio: '',
      sobre: '',
      celular: '',
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
          sessionStorage.getItem('barbearia')

        } catch (error) {
          if (error.response) {
            toast.error("Erro ao obter dados da barbearia!")
          }
        }
      }
  });

  function handleEditClick() {
    document.getElementById('fileInput').click();
  }
  
  useEffect(() => {
    const fileInput = document.getElementById('fileInput');
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newProfileImage = e.target.result;
          document.querySelector(`.${styles.containerFotoPerfil} img`).src = newProfileImage;
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.addEventListener('change', handleFileChange);

    return () => {
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <HeaderUsuario />
        <div className={styles.conteudo}>
          <div className={styles.container}>
          <NavbarBarbeiro />
            <div className={styles.conteudoFotos}>
              <div className={styles.containerFotoCapa}>
                {
                  <img src={imagemCapa} style={{ height: '100%', width: '100%', }}/>
                }
                <div className={styles.overlay} onClick={handleEditClick}>
                  <img src={editIcon} alt="Editar Capa" className={styles.editIcon} />
                </div>
              </div>
              <div className={styles.containerFotoPerfil}>
                {
                  <img src={imagemPerfil} style={{ height: '100%', width: '100%', }}/>
                }
                <div className={styles.overlay} onClick={handleEditClick}>
                  <img src={editIcon} alt="Editar Perfil" className={styles.editIcon} />
                </div>
              </div>
            </div>

            <input type="file" id="fileInput" style={{ display: 'none' }} />
            <div className={styles.formularioEditarBarbearia}>
              <h2 style={{ fontSize: 26, fontWeight: 600, color: '#082031' }}>Informações</h2>
              <div className={styles.formularioInformacoes}>
                <TextField 
                  className={styles.input}
                  type="text"
                  name="nomeDoNegocio"
                  value={formik.values.nomeDoNegocio}
                  label="Nome da barbearia"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nomeDoNegocio && Boolean(formik.errors.nomeDoNegocio)}
                  helperText={formik.touched.nomeDoNegocio ? formik.errors.nomeDoNegocio : ''}
                  fullWidth
                />

                <TextField
                  className={styles.input}
                  type="text"
                  name="celular"
                  value={formik.values.celular}
                  label="Celular"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.celular && Boolean(formik.errors.celular)}
                  helperText={formik.touched.celular ? formik.errors.celular : ''}
                  fullWidth
                />

                <TextField
                  className={styles.input}
                  type="text"
                  name="sobre"
                  value={formik.values.sobre}
                  label="Sobre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sobre && Boolean(formik.errors.sobre)}
                  helperText={formik.touched.sobre ? formik.errors.sobre : ''}
                  fullWidth
                />
              </div>

              <h2 style={{ fontSize: 26, fontWeight: 600, color: '#082031' }}>Endereço</h2>
              <div className={styles.formularioEndereco}>
                <TextField
                  className={styles.input}
                  type="text"
                  name="cep"
                  value={formik.values.cep}
                  label="CEP"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cep && Boolean(formik.errors.cep)}
                  helperText={formik.touched.cep ? formik.errors.cep : ''}
                  fullWidth
                />
                
                <TextField
                  className={styles.input}
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
                  className={styles.input}
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
              
                <TextField
                  className={styles.input}
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
                  className={styles.input}
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
              
                <TextField
                  className={styles.input}  
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
                  className={styles.input}
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

              <h2 style={{ fontSize: 26, fontWeight: 600, color: '#082031' }}>Informações adicionais</h2>
              <div className={styles.formularioInformacoesAdicionais}>
                <TextField
                  className={styles.input}
                  type="date"
                  name="inicio"
                  value={formik.values.inicio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.inicio && Boolean(formik.errors.inicio)}
                  helperText={formik.touched.inicio ? formik.errors.inicio : ''}
                  fullWidth
                />

                <TextField
                  className={styles.input}
                  type="date"
                  name="fim"
                  value={formik.values.fim}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fim && Boolean(formik.errors.fim)}
                  helperText={formik.touched.fim ? formik.errors.fim : ''}
                  fullWidth
                />
              </div>
            </div>
          <div className={styles.botoesFormulario}>
              <Button
                className={styles.botaoDescartar}
                variant='outlined'
                type='button'
                onClick={formik.handleSubmit}>
                Descartar informações
              </Button>

              <Button
                className={styles.botaoEditar}
                variant='contained'
                type='button'
                onClick={formik.handleSubmit}>
                Editar informações
              </Button>
          </div>
        </div>
      </div>     
    </div>
    </ThemeProvider>  
  )

}

export default Personalizacao
