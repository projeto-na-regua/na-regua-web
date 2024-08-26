import { Button, ThemeProvider, Typography } from "@mui/material";
import { theme } from "../theme.js";
import { OptionsSidebar } from "./OptionsSidebar/OptionsSidebar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calendario from "../utils/assets/calendario.svg";
import galeria from "../utils/assets/galeria.svg";
import dashboard from "../utils/assets/dashboard.svg";
import servicos from "../utils/assets/servicos.svg";
import funcionarios from "../utils/assets/funcionarios.svg";
import chart from "../utils/assets/chart.svg";
import config from "../utils/assets/config.svg";
import api from "../../src/api.js";
import iconVoltar from '../utils/assets/icon voltar branco.svg'

export function Sidebar() {
  const [isAdm, setIsAdm] = useState(false);
  const barbeariaInfo = useState(
    JSON.parse(sessionStorage.getItem("barbearia"))
  );
  const token = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/usuarios/user", {
          headers: {
            Authorization: token,
          },
        });

        if (response.status === 200) {
          const userInfo = response.data;
          sessionStorage.setItem("tipo", JSON.stringify(userInfo));
          setIsAdm(userInfo.adm || false);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do usuário", error);
      }
    };

    fetchUserInfo();
  }, []);

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
          }}
        >
          <Typography variant="h7" style={{ color: "white" }}>
            Perfil
          </Typography>

          {/* Opções visíveis para todos */}
          <OptionsSidebar text="Agendamentos" icon={calendario} />
          <OptionsSidebar text="Galeria" icon={galeria} />

          {/* Opções para barbeiros comuns */}
          {!isAdm && barbeariaInfo && (
            <div
              style={{
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Typography variant="h7" style={{ color: "white" }}>
                {barbeariaInfo.nomeNegocio}
              </Typography>
              <OptionsSidebar text="Agenda" icon={calendario} />
              <OptionsSidebar text="Serviços" icon={servicos} />
            </div>
          )}

          {/* Opções adicionais para barbeiros admin */}
          {isAdm && barbeariaInfo && (
            <div
              style={{
                marginTop: 32,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Typography variant="h7" style={{ color: "white" }}>
                {barbeariaInfo.nomeNegocio}
              </Typography>
              <OptionsSidebar text="Agenda" icon={calendario} />
              <OptionsSidebar text="Dashboard" icon={chart} />
              <OptionsSidebar text="Serviços" icon={servicos} />
              <OptionsSidebar text="Fluxo de Caixa" icon={dashboard} />
              <OptionsSidebar text="Funcionários" icon={funcionarios} />
            </div>
          )}
        </div>

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
          {/* Botão para cadastro de barbearia (visível apenas se não houver barbearia logada ou se não fizer parte de uma barbearia) */}
          {!barbeariaInfo && (
            <Button
              variant="contained"
              onClick={() => navigate("/cadastro-barbearia")}
              style={{ width: 180 }}
            >
              Possui barbearia?
            </Button>
          )}

          {/* Opção de configurações (visível apenas se houver barbearia logada e se for admin) */}
          {barbeariaInfo && isAdm && (
            <>
              <OptionsSidebar text='Voltar' icon={iconVoltar} />
              <OptionsSidebar text='Configurações' icon={config} />
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
