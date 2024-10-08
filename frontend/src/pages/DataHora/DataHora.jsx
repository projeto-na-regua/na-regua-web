import React, { useEffect, useState } from "react";
import CardDataHora from "../../components/CardDataHora/CardDataHora";
import CardDataHoraClosed from "../../components/CardDataHora/CardDataHoraClosed";
import styles from "./DataHora.module.css";
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
} from "@mui/material";
import { useFormik } from "formik";
import { theme } from "../../theme";
import { toast } from "react-toastify";
import api from "../../api";
import { ModalEditar } from "../../components/ModalEditarBarbearia/ModalEditarBarbearia";


export function DataHora() {
  const token = JSON.parse(sessionStorage.getItem("user"));
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  const handleDiaChange = (e) => {
    setDiaSelecionado(parseInt(e.target.value));
  };

  const handleHorarioChange = (e, tipo) => {
    const { value } = e.target;
    setHorarios((prevHorarios) =>
      prevHorarios.map((dia) =>
        dia.id === diaSelecionado ? { ...dia, [tipo]: value } : dia
      )
    );
  };

  const handleFecharDia = () => {
    setHorarios((prevHorarios) =>
      prevHorarios.map((dia) =>
        dia.id === diaSelecionado
          ? {
              ...dia,
              fechado: !dia.fechado,
              horaAbertura: dia.fechado ? "08:00:00" : dia.horaAbertura,
              horaFechamento: dia.fechado ? "17:00:00" : dia.horaFechamento,
            }
          : dia
      )
    );
  };

  const diaAtual = horarios.find((dia) => dia.id === diaSelecionado) || {
    horaAbertura: "",
    horaFechamento: "",
  };

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
    );
    toast.success("Horário atualizado com sucesso!");
  };

  const formik = useFormik({
    diaSemanas: [],
    onSubmit: async (values) => {
      try {
        const formData = {
          diaSemanas: horarios.map((dia) => ({
            ...dia,
            horaAbertura: dia.fechado ? null : dia.horaAbertura,
            horaFechamento: dia.fechado ? null : dia.horaFechamento,
          })),
        };

        await api.put("/barbearias/perfil", formData, {
          headers: {
            Authorization: token,
          },
        });

        toast.success("Informações atualizadas com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar as informações principais:", error);
        toast.error("Erro ao atualizar as informações principais!");
      }
    },
  });

  useEffect(() => {
    const fetchBarbeariaData = async () => {
      try {
        const response = await api.get("/barbearias/perfil", {
          headers: {
            Authorization: token,
          },
        });
        const barbeariaData = response.data;

        console.log(barbeariaData);

        setHorarios(barbeariaData.diaSemanas);
        setDiaSelecionado(barbeariaData.diaSemanas[0]?.id || null);
        setIsInitialLoad(false);
      } catch (error) {
        console.error("Erro ao obter dados da barbearia", error);
      }
    };

    if (isInitialLoad) {
      fetchBarbeariaData();
    }
  }, [token, formik, isInitialLoad]);

  const handleEditarConfirm = async () => {
    try {
      await formik.handleSubmit();
    } catch (error) {
      toast.error("Erro ao atualizar as informações!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main>
        <div className={styles.container}>
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
                      <MenuItem key={dia.id} value={dia.id}>
                        {dia.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  id="horaAbertura"
                  label="Hora de Abertura"
                  type="time"
                  value={diaAtual.horaAbertura}
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
                  value={diaAtual.horaFechamento}
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
                  {diaAtual.fechado ||
                  diaAtual.horaAbertura === null ||
                  diaAtual.horaFechamento === null
                    ? "Abrir Este Dia"
                    : "Fechar Este Dia"}
                </Button>

                <Button
                  className={styles.botaoDefinirHorario}
                  variant="contained"
                  type="button"
                  onClick={() => setModalEditarOpen(true)}
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
                    {horario.fechado ||
                    horario.horaAbertura === null ||
                    horario.horaFechamento === null ? (
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
        </div>
      </main>

      <ModalEditar
        open={modalEditarOpen}
        handleClose={() => setModalEditarOpen(false)}
        handleConfirm={handleEditarConfirm}
      />
      
    </ThemeProvider>
  );
}

export default DataHora;
