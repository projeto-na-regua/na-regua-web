import React, { useEffect, useState } from "react"
import styles from "./Personalizacao.module.css"
import imagemPerfilDefault from "../../utils/assets/imagem-perfil.svg"
import imagemCapaDefault from "../../utils/assets/capa-barbearia.svg"
import editIcon from "../../utils/assets/IconsHeaderUsuario/IconEditar.svg"
import {
  Button,
  TextField,
  ThemeProvider,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import { theme } from "../../theme"
import { toast } from "react-toastify"
import api from "../../api"
import { ModalEditar } from "../../components/ModalEditarBarbearia/ModalEditarBarbearia"
import { ModalDescartar } from "../../components/ModalDescartarInformacoes/ModalDescartarInformacoes"
import CardDataHora from "../../components/CardDataHora/CardDataHora"
import CardDataHoraClosed from "../../components/CardDataHora/CardDataHoraClosed"
import { Sidebar } from '../../components/Sidebar'
import { HeaderUsuario } from '../../components/Header'

export function Personalizacao() {
  const token = JSON.parse(sessionStorage.getItem("user"))
  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [horarios, setHorarios] = useState([])
  const [modalEditarOpen, setModalEditarOpen] = useState(false)
  const [modalDescartarOpen, setModalDescartarOpen] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [imgCapa, setImgCapa] = useState(null)
  const [imgPerfilBarbearia, setImgPerfilBarbearia] = useState(null)
  const [imgPerfil, setImgPerfil] = useState(null)
  const [loadingSave, setLoadingSave] = useState(false)
  const [loadingPerfilBarbearia, setLoadingPerfilBarbearia] = useState(true)
  const [loadingCapa, setLoadingCapa] = useState(true)
  const [loadingPerfil, setLoadingPerfil] = useState(true)

  const handleDiaChange = (e) => {
    setDiaSelecionado(parseInt(e.target.value))
  }

  const handleHorarioChange = (e, tipo) => {
    const { value } = e.target
    setHorarios((prevHorarios) =>
      prevHorarios.map((dia) =>
        dia.id === diaSelecionado ? { ...dia, [tipo]: value } : dia
      )
    )
  }

  const handleFecharDia = () => {
    setHorarios((prevHorarios) =>
      prevHorarios.map((dia) =>
        dia.id === diaSelecionado
          ? { ...dia, fechado: !dia.fechado, horaAbertura: dia.fechado ? "08:00:00" : dia.horaAbertura, horaFechamento: dia.fechado ? "17:00:00" : dia.horaFechamento }
          : dia
      ))
  }

  const formik = useFormik({
    initialValues: {
      nomeNegocio: "",
      descricao: "",
      celularNegocio: "",
      cep: "",
      estado: "",
      cidade: "",
      logradouro: "",
      numero: "",
      complemento: "",
      diaSemanas: [],
    },
    onSubmit: async (values) => {
      setLoadingSave(true)
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
          diaSemanas: horarios.map((dia) => ({
            ...dia,
            horaAbertura: dia.fechado ? null : dia.horaAbertura,
            horaFechamento: dia.fechado ? null : dia.horaFechamento,
          })),
        }

        await api.put("/barbearias/perfil", formData, {
          headers: {
            Authorization: token,
          },
        })

        sessionStorage.setItem('barbearia', JSON.stringify(values))

        toast.success("Informações atualizadas com sucesso!")
        setModalEditarOpen(false)

        await handleCapaChange()
        await handlePerfilBarbeariaChange()
        await handlePerfilChange()
      } catch (error) {
        setLoadingSave(false)
        console.error("Erro ao atualizar as informações principais:", error)
        toast.error("Erro ao atualizar as informações principais!")
      } finally {
        setLoadingSave(false);
      }
    },
  })

  useEffect(() => {
    const fetchBarbeariaData = async () => {
      try {
        //Obtendo dados da barbearia
        const responseBarbearia = await api.get("/barbearias/perfil", {
          headers: {
            Authorization: token,
          },
        })

        const barbeariaData = responseBarbearia.data

        //Obtendo dados do perfil do usuário
        const responsePerfil = await api.get("/usuarios/perfil", {
          headers: {
            Authorization: token,
          },
        })

        const perfilData = responsePerfil.data

        //Setando valores já existentes no formulário
        formik.setValues({
          nome: perfilData.nome || "",
          email: perfilData.email || "",
          senha: perfilData.senha || "",
          nomeNegocio: barbeariaData.nomeNegocio || "",
          descricao: barbeariaData.descricao || "",
          celularNegocio: barbeariaData.celularNegocio || "",
          cep: barbeariaData.cep || "",
          estado: barbeariaData.estado || "",
          cidade: barbeariaData.cidade || "",
          logradouro: barbeariaData.logradouro || "",
          numero: barbeariaData.numero || "",
          complemento: barbeariaData.complemento || "",
        })
        setHorarios(barbeariaData.diaSemanas)
        setDiaSelecionado(barbeariaData.diaSemanas[0]?.id || null)
        setIsInitialLoad(false)
        const imgPerfilBarbearia = responseBarbearia.data.imgPerfil
        const imagemBanner = responseBarbearia.data.imgBanner
        const imgPeril = responsePerfil.data.imgPerfil
        setImgCapa(imagemBanner)
        setImgPerfilBarbearia(imgPerfilBarbearia)
        setImgPerfil(imgPeril)
      } catch (error) {
        console.error("Erro ao obter dados da barbearia", error)
      }
    }

    if (isInitialLoad) {
      fetchBarbeariaData()
    }
  }, [token, formik, isInitialLoad])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoadingPerfilBarbearia(true)
        setLoadingCapa(true)
        const response = await api.get("/barbearias/perfil", {
          headers: {
            Authorization: token,
          }
        })
        const imagePerilUrl = response.data.imgPerfil
        const imageBannerUrl = response.data.imgBanner
        setImgPerfilBarbearia(imagePerilUrl)
        setImgCapa(imageBannerUrl)
      } catch (error) {
        console.log("Erro ao buscar a imagens da barbearia: " + error)
      } finally {
        setLoadingPerfilBarbearia(false)
        setLoadingCapa(false)
      }
    }

    fetchImage()
  }, [])

  useEffect(() => {
    const fetchImagePerfil = async () => {
      try {
        setLoadingPerfil(true)
        const response = await api.get("/usuarios/get-image", {
          headers: {
            Authorization: token,
          }
        })

        const imageUrl = response.data.imgPerfil
        setImgPerfil(imageUrl)
      } catch (error) {
        console.log("Erro ao buscar a imagem de capa: " + error)
      } finally {
        setLoadingPerfil(false)
      }
    }

    fetchImagePerfil()
  }, [])

  const diaAtual = horarios.find((dia) => dia.id === diaSelecionado) || {
    horaAbertura: "",
    horaFechamento: "",
  }

  const handleDescartarConfirm = () => {
    formik.resetForm()
    setModalDescartarOpen(false)
    toast.info("Alterações descartadas")
  }

  const handleEditarConfirm = async () => {
    try {
      await formik.handleSubmit()
      await handleCapaChange()
      await handlePerfilBarbeariaChange()
      await handlePerfilChange()
    } catch (error) {
      toast.error("Erro ao atualizar as informações!")
    }
  }

  const handleCapaChange = async () => {
    if (imgCapa && imgCapa !== imagemCapaDefault) {
      try {
        const blobCapa = await fetch(imgCapa).then((res) => res.blob())
        const formData = new FormData()
        formData.append("file", blobCapa, "imagem.png")

        const response = await api.put("/barbearias/image-banner", formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })

        console.log("Imagem de capa atualizada:", response.data)
      } catch (error) {
        console.error("Erro ao atualizar imagem de capa:", error)
      }
    }
  }

  const handlePerfilBarbeariaChange = async () => {
    if (imgPerfilBarbearia && imgPerfilBarbearia !== imagemPerfilDefault) {
      try {
        const blobPerfilBarbearia = await fetch(imgPerfilBarbearia).then((res) => res.blob())
        const formData = new FormData()
        formData.append("file", blobPerfilBarbearia, "imagem.png")

        const response = await api.put("/barbearias/image-perfil", formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })

        console.log("Imagem de perfil da barbearia atualizada:", response.data)
      } catch (error) {
        console.error("Erro ao atualizar imagem de perfil da barbearia:", error)
      }
    }
  }

  const handlePerfilChange = async () => {
    if (imgPerfil && imgPerfil !== imagemPerfilDefault) {
      try {
        const blobPerfil = await fetch(imgPerfil).then((res) => res.blob())
        const formData = new FormData()
        formData.append("file", blobPerfil, "imagem.png")

        const response = await api.put("/usuarios/editar-img-perfil", formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })

        console.log("Imagem de perfil atualizada:", response.data)
      } catch (error) {
        console.error("Erro ao atualizar imagem de perfil:", error)
      }
    }
  }

  const handleCapaClick = () => {
    document.getElementById("fileInputCapa").click()
  }

  const handlePerfilBarbeariaClick = () => {
    document.getElementById("fileInputPerfilBarbearia").click()
  }

  const handlePerfilClick = () => {
    document.getElementById("fileInputPerfil").click()
  }

  const handleDefinirHorario = () => {
    setHorarios((prevHorarios) =>
      prevHorarios.map((dia) =>
        dia.id === diaSelecionado
          ? {
            ...dia,
            horaAbertura: diaAtual.horaAbertura,
            horaFechamento: diaAtual.horaFechamento,
          }
          : dia
      )
    )
    toast.success("Horário atualizado com sucesso!")
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Sidebar />

        <div style={{
          marginLeft: '15vw',
        }}>
          <HeaderUsuario title='Personalização' />

          <div style={{
            marginLeft: 16
          }}>
            <Typography variant="h6" style={{ marginBottom: 8 }}>
              Perfil
            </Typography>

            <Typography variant="h7">
              Personalize seu perfil com informações sobre você
            </Typography>

            <div style={{
              display: 'flex',
              gap: 32,
              marginTop: 16
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}>
                <TextField
                  className={styles.input}
                  type="text"
                  name="Nome"
                  value={formik.values.nome || ""}
                  label="Nome"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant='outlined'
                />

                <TextField
                  className={styles.input}
                  type="text"
                  name="E-mail"
                  value={formik.values.email || ""}
                  label="E-mail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}>
                <TextField
                  className={styles.input}
                  type="text"
                  name="Senha"
                  value={""}
                  label="Senha"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <TextField
                  className={styles.input}
                  type="text"
                  name="Confirmar senha"
                  value={""}
                  label="Confirmar senha"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div style={{
                display: 'flex',
                gap: 32,
                marginTop: 32,
                alignItems: 'flex-end',
              }}>
                <div style={{
                  display: 'flex',
                  gap: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  <div
                    style={{
                      height: 50,
                      width: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: 'relative',
                    }}
                  >
                    {loadingPerfil && (
                      <CircularProgress
                        color="secondary"
                        size={30}
                        thickness={4}
                        style={{
                          position: 'absolute',
                          top: '20%',
                          left: '20%',
                        }}
                      />
                    )}
                    <img
                      alt='imagem-perfil'
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: '50%',
                        opacity: loadingPerfil ? 0.5 : 1,
                      }}
                      src={imgPerfil || imagemPerfilDefault}
                      onLoad={() => setLoadingPerfil(false)} // Remove o loading quando a imagem carregar
                    />
                  </div>

                  <Button
                    variant='contained'
                    onClick={handlePerfilClick}
                  >
                    Alterar foto de perfil
                  </Button>
                </div>
              </div>
            </div>

          <input
            type="file"
            id="fileInputPerfil"
            style={{ display: "none" }}
            onChange={(e) =>
              setImgPerfil(URL.createObjectURL(e.target.files[0]))
            }
          />

          <div className={styles.conteudoFotos}>
            <div
              className={styles.containerFotoCapa}
              onClick={handleCapaClick}
            >
              {loadingCapa ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <CircularProgress
                    color="secondary"
                    style={{
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  />
                </div>
              ) : (
                <img
                  src={imgCapa || imagemCapaDefault}
                  alt="imagem-de-capa-da-barbearia"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 24,
                  }}
                />
              )}
              <div className={styles.overlay}>
                <img
                  src={editIcon}
                  alt="Editar Capa"
                  className={styles.editIcon}
                />
              </div>
            </div>
            <div
              className={styles.containerFotoPerfil}
              onClick={handlePerfilBarbeariaClick}
            >
              {loadingPerfilBarbearia ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <CircularProgress
                    color="secondary"
                    style={{
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  />
                </div>
              ) : (
                <img
                  src={imgPerfilBarbearia || imagemPerfilDefault}
                  alt="imagem-de-perfil-da-barbearia"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 24,
                  }}
                />
              )}
              <div className={styles.overlay}>
                <img
                  src={editIcon}
                  alt="Editar Perfil"
                  className={styles.editIcon}
                />
              </div>
            </div>
          </div>

          <input
            type="file"
            id="fileInputCapa"
            style={{ display: "none" }}
            onChange={(e) =>
              setImgCapa(URL.createObjectURL(e.target.files[0]))
            }
          />
          <input
            type="file"
            id="fileInputPerfilBarbearia"
            style={{ display: "none" }}
            onChange={(e) =>
              setImgPerfilBarbearia(URL.createObjectURL(e.target.files[0]))
            }
          />

          <div className={styles.formularioEditarBarbearia}>
            <Typography variant="h6" style={{ marginLeft: 16, marginBottom: 16 }}>
              Informações principais
            </Typography>

            <div className={styles.formularioInformacoes}>
              <TextField
                className={styles.input}
                type="text"
                name="nomeNegocio"
                value={formik.values.nomeNegocio || ""}
                label="Nome do negócio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nomeNegocio &&
                  Boolean(formik.errors.nomeNegocio)
                }
                helperText={
                  formik.touched.nomeNegocio ? formik.errors.nomeNegocio : ""
                }
                fullWidth
              />

              <TextField
                className={styles.input}
                type="text"
                name="descricao"
                value={formik.values.descricao || ""}
                label="Descrição"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.descricao && Boolean(formik.errors.descricao)
                }
                helperText={
                  formik.touched.descricao ? formik.errors.descricao : ""
                }
                fullWidth
              />

              <TextField
                className={styles.input}
                type="tel"
                name="celularNegocio"
                value={formik.values.celularNegocio || ""}
                label="Celular"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.celularNegocio &&
                  Boolean(formik.errors.celularNegocio)
                }
                helperText={
                  formik.touched.celularNegocio
                    ? formik.errors.celularNegocio
                    : ""
                }
                fullWidth
              />

              <TextField
                className={styles.input}
                type="text"
                name="cep"
                value={formik.values.cep || ""}
                label="CEP"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cep && Boolean(formik.errors.cep)}
                helperText={formik.touched.cep ? formik.errors.cep : ""}
                fullWidth
              />

              <TextField
                className={styles.input}
                type="text"
                name="estado"
                value={formik.values.estado || ""}
                label="Estado"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.estado && Boolean(formik.errors.estado)}
                helperText={formik.touched.estado ? formik.errors.estado : ""}
                fullWidth
              />

              <TextField
                className={styles.input}
                type="text"
                name="cidade"
                value={formik.values.cidade || ""}
                label="Cidade"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cidade && Boolean(formik.errors.cidade)}
                helperText={formik.touched.cidade ? formik.errors.cidade : ""}
                fullWidth
              />

              <TextField
                className={styles.input}
                type="text"
                name="logradouro"
                value={formik.values.logradouro || ""}
                label="Logradouro"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.logradouro &&
                  Boolean(formik.errors.logradouro)
                }
                helperText={
                  formik.touched.logradouro ? formik.errors.logradouro : ""
                }
                fullWidth
              />

              <TextField
                className={styles.input}
                type="text"
                name="numero"
                value={formik.values.numero || ""}
                label="Número"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.numero && Boolean(formik.errors.numero)}
                helperText={formik.touched.numero ? formik.errors.numero : ""}
                fullWidth
              />

              <TextField
                className={styles.input}
                type="text"
                name="complemento"
                value={formik.values.complemento || ""}
                label="Complemento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.complemento &&
                  Boolean(formik.errors.complemento)
                }
                helperText={
                  formik.touched.complemento ? formik.errors.complemento : ""
                }
                fullWidth
              />
            </div>

            <Typography variant="h6" style={{ marginLeft: 16 }}>
              Informações adicionais
            </Typography>
            <label
              htmlFor="inputId"
              style={{ color: "#082031" }}
              className={styles.labelHorario}
            >
              Horário de funcionamento
            </label>
            <div className={styles.bordaInformacoesAdicionais}>
              <div className={styles.ContainerInformacoesAdicionais}>
                <div className={styles.ContainerDiasHorarios}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: "16px" }}
                  >
                    <InputLabel
                      id="diaSemana-label"
                      className={styles.labelDefinirDiaHorario}
                    >
                      Dia da Semana
                    </InputLabel>
                    <Select
                      labelId="diaSemana-label"
                      id="diaSemana"
                      value={diaSelecionado || ""}
                      onChange={handleDiaChange}
                      label="Dia da Semana"
                      className={styles.selectBox}
                      style={{
                        borderRadius: "10px",
                        fontWeigth: 500,
                        color: "#082031",
                      }}
                    >
                      {horarios.map((dia) => (
                        <MenuItem key={dia.id} value={dia.id || ""}>
                          {dia.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    id="horaAbertura"
                    label="Hora de Abertura"
                    type="time"
                    value={diaAtual.horaAbertura || ""}
                    onChange={(e) => handleHorarioChange(e, "horaAbertura")}
                    variant="outlined"
                    fullWidth
                    className={styles.inputHora}
                    inputProps={{
                      step: 1,
                    }}
                    style={{ marginBottom: "16px" }}
                  />

                  <TextField
                    id="horaFechamento"
                    label="Hora de Fechamento"
                    type="time"
                    value={diaAtual.horaFechamento || ""}
                    onChange={(e) => handleHorarioChange(e, "horaFechamento")}
                    variant="outlined"
                    fullWidth
                    className={styles.inputHora}
                    inputProps={{
                      step: 1,
                    }}
                    style={{ marginBottom: "16px" }}
                  />

                  <Button
                    className={styles.botaoFecharDia}
                    variant="outlinedBlue"
                    type="button"
                    onClick={handleFecharDia}
                    style={{ marginBottom: "16px" }}
                  >
                    {diaAtual.fechado || diaAtual.horaAbertura === null || diaAtual.horaFechamento === null ? "Abrir Este Dia" : "Fechar Este Dia"}
                  </Button>

                  <Button
                    className={styles.botaoDefinirHorario}
                    variant="contained"
                    type="button"
                    onClick={handleDefinirHorario}
                    style={{ marginBottom: "16px" }}
                  >
                    Definir Horário
                  </Button>
                </div>

                <Grid
                  container
                  className={styles.ContainerCardsDiasFuncionamento}
                  spacing={1}
                >
                  {horarios.map((horario) => (
                    <Grid
                      item
                      key={horario.id}
                      xs={8}
                      sm={6}
                      md={3}
                      style={{ padding: "-2px" }}
                    >
                      {horario.fechado || horario.horaAbertura === null || horario.horaFechamento === null ? (
                        <CardDataHoraClosed nome={horario.nome} />
                      ) : (
                        <>
                          <CardDataHora
                            nome={horario.nome}
                            horaInicio={horario.horaAbertura}
                            horaFim={horario.horaFechamento}
                          />
                        </>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>

            <input
              type="file"
              id="fileInputCapa"
              style={{ display: "none" }}
              onChange={(e) =>
                setImgCapa(URL.createObjectURL(e.target.files[0]))
              }
            />
            <input
              type="file"
              id="fileInputPerfilBarbearia"
              style={{ display: "none" }}
              onChange={(e) =>
                setImgPerfilBarbearia(URL.createObjectURL(e.target.files[0]))
              }
            />

            <div className={styles.botoesFormulario}>
              <Button
                variant='outlined'
                type='button'
                onClick={() => setModalDescartarOpen(true)}
                style={{
                  height: '100%'
                }}
              >
                Descartar informações
              </Button>

              <Button
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

      <ModalEditar
        open={modalEditarOpen}
        handleClose={() => setModalEditarOpen(false)}
        handleConfirm={handleEditarConfirm}
        isLoading={loadingSave}
      />

      <ModalDescartar
        open={modalDescartarOpen}
        handleClose={() => setModalDescartarOpen(false)}
        handleConfirm={handleDescartarConfirm}
      />
    </ThemeProvider>
  )
}

export default Personalizacao
