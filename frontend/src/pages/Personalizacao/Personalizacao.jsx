import React, { useEffect, useState } from 'react';
import styles from './Personalizacao.module.css';
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';
import imagemPerfilDefault from '../../utils/assets/imagem-perfil.svg';
import imagemCapaDefault from '../../utils/assets/capa-barbearia.svg';
import editIcon from '../../utils/assets/IconsHeaderUsuario/IconEditar.svg';
import { Button, TextField, ThemeProvider } from '@mui/material';
import { useFormik } from 'formik';
import { theme } from '../../theme';
import { toast } from 'react-toastify';
import api from '../../api';
import { ModalEditar } from '../../components/ModalEditarBarbearia/ModalEditarBarbearia';
import { ModalDescartar } from '../../components/ModalDescartarInformacoes/ModalDescartarInformacoes';

export function Personalizacao() {
  const token = JSON.parse(sessionStorage.getItem('user'));
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalDescartarOpen, setModalDescartarOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [imgCapa, setImgCapa] = useState(null);
  const [imgPerfil, setImgPerfil] = useState(null);

  const handleDiaChange = (e) => {
    setDiaSelecionado(parseInt(e.target.value));
  };

  const handleHorarioChange = (e, tipo) => {
    const { value } = e.target;
    setHorarios((prevHorarios) =>
      prevHorarios.map((dia) =>
        dia.id === diaSelecionado
          ? { ...dia, [tipo]: value }
          : dia
      )
    );
  };

  const formik = useFormik({
    initialValues: {
      nomeNegocio: '',
      descricao: '',
      celularNegocio: '',
      cep: '',
      estado: '',
      cidade: '',
      logradouro: '',
      numero: '',
      complemento: ''
    },
    onSubmit: async (values) => {
      try {
        const formData = {
          nomeNegocio: values.nomeNegocio,
          descricao: values.descricao,
          celularNegocio: values.celularNegocio,
          cep: values.cep,
          estado: values.estado,
          cidade: values.cidade,
          logradouro: values.logradouro,
          numero: values.numero,
          complemento: values.complemento,
          diaSemanas: horarios
        };

        await api.put('/barbearias/perfil', formData, {
          headers: {
            Authorization: token
          }
        });

        toast.success("Informações principais atualizadas com sucesso!");
        setModalEditarOpen(false);
        
        await handleCapaChange();
        await handlePerfilChange();
      } catch (error) {
        console.error("Erro ao atualizar as informações principais:", error);
        toast.error("Erro ao atualizar as informações principais!");
      }
    }
  });

  useEffect(() => {
    const fetchBarbeariaData = async () => {
      try {
        const response = await api.get('/barbearias/perfil', {
          headers: {
            Authorization: token
          }
        });
        const barbeariaData = response.data;

        console.log(barbeariaData)
    
        formik.setValues({
          nomeNegocio: barbeariaData.nomeNegocio || '',
          descricao: barbeariaData.descricao || '',
          celularNegocio: barbeariaData.celularNegocio || '',
          cep: barbeariaData.cep || '',
          estado: barbeariaData.estado || '',
          cidade: barbeariaData.cidade || '',
          logradouro: barbeariaData.logradouro || '',
          numero: barbeariaData.numero || '',
          complemento: barbeariaData.complemento || ''
        });
        setHorarios(barbeariaData.diaSemanas);
        setDiaSelecionado(barbeariaData.diaSemanas[0]?.id || null);
        setIsInitialLoad(false);
    
      } catch (error) {
        console.error('Erro ao obter dados da barbearia', error);
      }
    };

    if (isInitialLoad) {
      fetchBarbeariaData();
    }
  }, [token, formik, isInitialLoad]);

  const diaAtual = horarios.find((dia) => dia.id === diaSelecionado) || { horaAbertura: '', horaFechamento: '' };

  const handleDescartarConfirm = () => {
    formik.resetForm();
    setModalDescartarOpen(false);
    toast.info("Alterações descartadas");
  };

  const handleEditarConfirm = async () => {
    try {
      await formik.handleSubmit();
      await handleCapaChange();
      await handlePerfilChange();
    } catch (error) {
      toast.error("Erro ao atualizar as informações!");
    }
  };

  const handleCapaChange = async () => {
    if (imgCapa && imgCapa !== imagemCapaDefault) {
      try {
        const blobCapa = await fetch(imgCapa).then(res => res.blob());
        const formData = new FormData();
        formData.append('file', blobCapa, 'image.png');
  
        const response = await api.put('/barbearias/image-banner', formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log("Imagem de capa atualizada:", response.data);
      } catch (error) {
        console.error("Erro ao atualizar imagem de capa:", error);
      }
    }
  };
  
  const handlePerfilChange = async () => {
    if (imgPerfil && imgPerfil !== imagemPerfilDefault) {
      try {
        const blobPerfil = await fetch(imgPerfil).then(res => res.blob());
        const formData = new FormData();
        formData.append('file', blobPerfil, 'image.png');
  
        const response = await api.put('/barbearias/image-perfil', formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log("Imagem de perfil atualizada:", response.data);
      } catch (error) {
        console.error("Erro ao atualizar imagem de perfil:", error);
      }
    }
  };

  const handleCapaClick = () => {
    document.getElementById('fileInputCapa').click();
  };

  const handlePerfilClick = () => {
    document.getElementById('fileInputPerfil').click();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Header">
        <HeaderUsuario />
        <div className={styles.conteudo}>
          <div className={styles.container}>
            <NavbarBarbeiro />
            <div className={styles.conteudoFotos}>
              <div className={styles.containerFotoCapa} onClick={handleCapaClick}>
                <img src={imgCapa || imagemCapaDefault} style={{ height: '100%', width: '100%' }} />
                <div className={styles.overlay}>
                  <img src={editIcon} alt="Editar Capa" className={styles.editIcon} />
                </div>
              </div>
              <div className={styles.containerFotoPerfil} onClick={handlePerfilClick}>
                <img src={imgPerfil || imagemPerfilDefault} style={{ height: '100%', width: '100%' }} />
                <div className={styles.overlay}>
                  <img src={editIcon} alt="Editar Perfil" className={styles.editIcon} />
                </div>
              </div>
            </div>

            <input
              type="file"
              id="fileInputCapa"
              style={{ display: 'none' }}
              onChange={(e) => setImgCapa(e.target.files[0])}
            />
            <input
              type="file"
              id="fileInputPerfil"
              style={{ display: 'none' }}
              onChange={(e) => setImgPerfil(e.target.files[0])}
            />

            <div className={styles.formularioEditarBarbearia}>
              <h2 style={{ fontSize: 26, fontWeight: 600, color: '#082031' }}>Informações</h2>
              <div className={styles.formularioInformacoes}>
                <TextField
                  className={styles.input}
                  type="text"
                  name="nomeNegocio"
                  value={formik.values.nomeNegocio || ''}
                  label="Nome do negócio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nomeNegocio && Boolean(formik.errors.nomeNegocio)}
                  helperText={formik.touched.nomeNegocio ? formik.errors.nomeNegocio : ''}
                  fullWidth
                />

                <TextField
                  className={styles.input}
                  type="text"
                  name="descricao"
                  value={formik.values.descricao || ''}
                  label="Descrição"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.descricao && Boolean(formik.errors.descricao)}
                  helperText={formik.touched.descricao ? formik.errors.descricao : ''}
                  fullWidth
                />

                <TextField
                  className={styles.input}
                  type="tel"
                  name="celularNegocio"
                  value={formik.values.celularNegocio || ''}
                  label="Celular"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.celularNegocio && Boolean(formik.errors.celularNegocio)}
                  helperText={formik.touched.celularNegocio ? formik.errors.celularNegocio : ''}
                  fullWidth
                />

                <TextField
                  className={styles.input}
                  type="text"
                  name="cep"
                  value={formik.values.cep || ''}
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
                  value={formik.values.estado || ''}
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
                  value={formik.values.cidade || ''}
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
                  name="logradouro"
                  value={formik.values.logradouro || ''}
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
                  value={formik.values.numero || ''}
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
                  value={formik.values.complemento || ''}
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
                <div>
                  <select onChange={handleDiaChange} value={diaSelecionado || ''}>
                    {horarios.map((dia) => (
                      <option key={dia.id} value={dia.id}>
                        {dia.nome}
                      </option>
                    ))}
                  </select>

                  <div>
                    <label>
                      Hora de Abertura:
                      <input
                        type="time"
                        value={diaAtual.horaAbertura}
                        onChange={(e) => handleHorarioChange(e, 'horaAbertura')}
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      Hora de Fechamento:
                      <input
                        type="time"
                        value={diaAtual.horaFechamento}
                        onChange={(e) => handleHorarioChange(e, 'horaFechamento')}
                      />
                    </label>
                  </div>

                  <pre>{JSON.stringify(horarios, null, 2)}</pre>
                </div>
              </div>
              <div className={styles.botoesFormulario}>
                <Button
                  className={styles.botaoDescartar}
                  variant='outlined'
                  type='button'
                  onClick={() => setModalDescartarOpen(true)}
                >
                  Descartar informações
                </Button>

                <Button
                  className={styles.botaoEditar}
                  variant='contained'
                  type='button'
                  onClick={() => setModalEditarOpen(true)}
                >
                  Editar informações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalEditar 
        open={modalEditarOpen} 
        handleClose={() => setModalEditarOpen(false)} 
        handleConfirm={handleEditarConfirm} 
      />

      <ModalDescartar 
        open={modalDescartarOpen} 
        handleClose={() => setModalDescartarOpen(false)} 
        handleConfirm={handleDescartarConfirm} 
      />
    </ThemeProvider>
  );
}

export default Personalizacao;