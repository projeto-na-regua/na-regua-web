import React from "react";
import style from "./NotFound.module.css"
import Logo from '../../utils/assets/logo-scale0.svg'


function NotFound() {
  return (
    <div className={style.divTodo}>
      <div className={style.divConteudo}>

        <div className={style.divImagem}>
          <img className={style.imagem} src={Logo} alt=""/>
          <div>404 Not Found</div>
        </div>

        <div className={style.textoInfomarivo}>
          Não foi possivel encontrar o que você está procurando!
        </div>


      </div>
    </div>
  );
}

export default NotFound
