import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../../../utils/globals"

function AgendamentosBarbearia() {

  const navigate = useNavigate()
  useEffect(() => {

      const validarLogin = () =>{

        const user = JSON.parse(sessionStorage.getItem('user'))
        
        if(!user){
          navigate('/login')
        }

      }

      validarLogin()

  }, []);

  const handleLogout = () => {
    utils.logout(); 
  }


    return (
      <div>
        <h1>{`Bem - vindo(a) a sua barbearia!`}</h1>
        <button onClick={handleLogout}>Sair</button>   
      </div>
    );
  }
  
  export default AgendamentosBarbearia
  