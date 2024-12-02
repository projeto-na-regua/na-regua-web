import React, { useEffect, useState } from "react"
import CardDataHora from "../../components/CardDataHora/CardDataHora"
import CardDataHoraClosed from "../../components/CardDataHora/CardDataHoraClosed"
import styles from "./DataHora.module.css"
import {
  Button,
  TextField,
  ThemeProvider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material"
import { useFormik } from "formik"
import { theme } from "../../theme"
import { toast } from "react-toastify"
import api from "../../api"
import { ModalEditar } from "../../components/ModalEditarBarbearia/ModalEditarBarbearia"

export function DataHora() {
  const token = JSON.parse(sessionStorage.getItem("user"))
  const [diaSelecionado, setDiaSelecionado] = useState('')
  const [horarios, setHorarios] = useState([] || '')
  const [modalEditarOpen, setModalEditarOpen] = useState(false)
  

  const handleDiaChange = (e) => {
    const selectedDay = parseInt(e.target.value || '');
    setDiaSelecionado(selectedDay);
  };

  const handleHorarioChange = (e, tipo) => {
    const { value } = e.target || ''
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
          ? {
            ...dia,
            fechado: !dia.fechado,
            horaAbertura: dia.fechado ? "08:00" : dia.horaAbertura,
            horaFechamento: dia.fechado ? "17:00" : dia.horaFechamento,
          }
          : dia
      )
    )
  }

  const diaAtual =
    horarios.find((dia) => dia.id === diaSelecionado) || {
      horaAbertura: '',
      horaFechamento: '',
    }

  const formik = useFormik({
    initialValues: {
      diaSemanas: [
        {
          id: 0,
          nome: "SEG", // Substitua com os dias reais se necessário
          horaAbertura: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          horaFechamento: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          }
        },
        {
          id: 1,
          nome: "TER",
          horaAbertura: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          horaFechamento: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          }
        },
        {
          id: 2,
          nome: "QUA",
          horaAbertura: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          horaFechamento: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          }
        },
        {
          id: 3,
          nome: "QUI",
          horaAbertura: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          horaFechamento: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          }
        },
        {
          id: 4,
          nome: "SEX",
          horaAbertura: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          horaFechamento: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          }
        },
        {
          id: 5,
          nome: "SAB",
          horaAbertura: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          horaFechamento: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          }
        },
        {
          id: 6,
          nome: "DOM",
          horaAbertura: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          },
          horaFechamento: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0
          }
        },
      ],
    },
    onSubmit: async (values) => {
      try {
        const barbearia = JSON.parse(sessionStorage.getItem("barbearia")) || {};

        const formData = {
          ...barbearia,
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

        toast.success("Informações atualizadas com sucesso!")
      } catch (error) {
        console.error("Erro ao atualizar as informações principais:", error)
        toast.error("Erro ao atualizar as informações principais!")
      }
    },
  })

  useEffect(() => {
    const fetchBarbeariaData = async () => {
      try {
        const response = await api.get("/barbearias/perfil", {
          headers: {
            Authorization: token,
          },
        });
        const barbeariaData = response.data;
        setHorarios(barbeariaData.diaSemanas);
        setDiaSelecionado(barbeariaData.diaSemanas[0]?.id || '');
      } catch (error) {
        console.error("Erro ao obter dados da barbearia", error);
      }
    };
  
    if (horarios.length === 0) {
      fetchBarbeariaData();
    }
  }, [token, horarios]);

  const handleEditarConfirm = async () => {
    try {
      await formik.handleSubmit()
    } catch (error) {
      console.error("Erro ao atualizar as informações:", error)
      toast.error("Erro ao atualizar as informações!")
    }
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "32px",
  }

  return (
    <ThemeProvider theme={theme}>
      <main>
        <div className={styles.container}>
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
                    value={diaSelecionado || ''}
                    onChange={handleDiaChange}
                    label="Dia da Semana"
                    className={styles.selectBox}
                    style={{
                      borderRadius: "10px",
                      fontWeight: 500,
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
                  value={diaAtual.horaAbertura || ''}
                  onChange={(e) => handleHorarioChange(e, "horaAbertura")}
                  variant="outlined"
                  fullWidth
                  className={styles.inputHora}
                  inputProps={{
                    step: 60,
                  }}
                  InputLabelProps={{ shrink: true }}
                  style={{ marginBottom: "16px" }}
                />

                <TextField
                  id="horaFechamento"
                  label="Hora de Fechamento"
                  type="time"
                  value={diaAtual.horaFechamento || ''}
                  onChange={(e) => handleHorarioChange(e, "horaFechamento")}
                  variant="outlined"
                  fullWidth
                  className={styles.inputHora}
                  inputProps={{
                    step: 60,
                  }}
                  InputLabelProps={{ shrink: true }}
                  style={{ marginBottom: "16px" }}
                />

                <Button
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
                  variant="contained"
                  type="button"
                  onClick={() => setModalEditarOpen(true)}
                >
                  Definir Horário
                </Button>
              </div>

              <div style={gridStyle}>
                {horarios.length === 0 ? (
                  Array(7)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rectangular"
                        width={150}
                        height={125}
                      />
                    ))
                ) : (
                  horarios.map((horario) => (
                    <div key={horario.id} style={{ margin: 0, padding: 0 }}>
                      {horario.fechado || horario.horaAbertura === null || horario.horaFechamento === null ? (
                        <CardDataHoraClosed nome={horario.nome} />
                      ) : (
                        <CardDataHora
                          nome={horario.nome}
                          horaInicio={horario.horaAbertura}
                          horaFim={horario.horaFechamento}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
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
  )
}

export default DataHora
