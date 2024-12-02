import { Button, Divider, ThemeProvider, Typography } from "@mui/material"
import { theme } from "../theme.js"
import { OptionsSidebar } from "./OptionsSidebar/OptionsSidebar.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import calendario from "../utils/assets/calendario.svg"
import galeria from "../utils/assets/galeria.svg"
import dashboard from "../utils/assets/dashboard.svg"
import servicos from "../utils/assets/servicos.svg"
import funcionarios from "../utils/assets/funcionarios.svg"
import chart from "../utils/assets/chart.svg"
import config from "../utils/assets/config.svg"
import api from "../../src/api.js"
import iconVoltar from '../utils/assets/home.svg'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'

export function Sidebar() {
  const [isAdm, setIsAdm] = useState(false)
  const barbeariaInfo = JSON.parse(sessionStorage.getItem("barbearia"))
  const token = JSON.parse(sessionStorage.getItem("user"))
  const navigate = useNavigate()

  useEffect(() => {
    const cachedUserInfo = sessionStorage.getItem("tipo")

    if (cachedUserInfo) {
      const userInfo = JSON.parse(cachedUserInfo)
      setIsAdm(userInfo.adm || false)
    } else {
      const fetchUserInfo = async () => {
        try {
          const response = await api.get("/usuarios/user", {
            headers: {
              Authorization: token,
            },
          })

          if (response.status === 200) {
            const userInfo = response.data
            sessionStorage.setItem("tipo", JSON.stringify(userInfo))
            setIsAdm(userInfo.adm || false)
          }
        } catch (error) {
          console.error("Erro ao buscar informações do usuário", error)
        }
      }

      fetchUserInfo()
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: "#082031",
          width: "15vw",
          height: "100vh",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            gap: 8,
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            marginLeft: 16,
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {!barbeariaInfo && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 8
            }}>
              <Typography variant="h7" style={{ color: "white" }}>
                Perfil
              </Typography>

              {/* Itens de Perfil comuns a todos os usuários */}
              <OptionsSidebar text="Agendamentos" icon={calendario} />
              <OptionsSidebar text="Galeria" icon={galeria} />
            </div>
          )}

          {!isAdm && barbeariaInfo && (
            <div
              style={{
                color: "white",
                marginTop: 32,
                marginBottom: 16,
              }}
            >
              <Typography variant="body1" style={{ color: "#E3A74F", fontWeight: 'bold' }}>
                {barbeariaInfo.nomeNegocio}
              </Typography>
              <OptionsSidebar text="Agenda" />
            </div>
          )}

          {isAdm && barbeariaInfo && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8
              }}
            >
              <OptionsSidebar text="Agenda" />
              <OptionsSidebar text="Dashboard" />
              <OptionsSidebar text="Serviços" />
              <OptionsSidebar text="Financeiro" />
              <OptionsSidebar text="Funcionários" />
              <OptionsSidebar text="Gerenciamento" />
              <OptionsSidebar text="Comunidade" />
            </div>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginLeft: 16,
              marginBottom: 32,
            }}
          >
            {!barbeariaInfo && (
              <Button
                variant="contained"
                onClick={() => navigate("/cadastro-barbearia")}
                style={{ width: 180, backgroundColor: "#E3A74F", color: "#082031" }}
              >
                Possui barbearia?
              </Button>
            )}
            <OptionsSidebar text="Configurações" icon={config} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
