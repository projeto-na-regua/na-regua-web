import { useEffect, useState } from "react";
import utils from '../../../utils/globals';
import { useNavigate } from "react-router-dom";

function AgendamentosUsuario() {


  const navigate = useNavigate()

 
  useEffect(() => {

    const validarLogin = async () =>{
      const user = JSON.parse(sessionStorage.getItem('user'))
      if(!user){
        navigate('/login')
      }
  
    }
      validarLogin();
  }, []);

  const handleLogout = () => {
    utils.logout(); 
  }

    return (
      <div>
        <h1>{`Bem - vindo(a)!`}</h1>  
        <button onClick={handleLogout}>Sair</button> 
      </div>
    );
  }
  
  export default AgendamentosUsuario
  