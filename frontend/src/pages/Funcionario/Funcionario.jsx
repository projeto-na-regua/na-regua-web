
import { useState } from 'react';
import React from 'react';
import styles from './Funcionario.module.css' 
import NavbarBarbeiro from '../../components/NavbarBarbeiro/NavbarBarbeiro';
import HeaderUsuario from '../../components/HeaderUsuario/HeaderUsuario';

function abrirEditarDeletar(){

}

export function Funcionarios() {
  const [open, setOpen] = useState(false);

  return (

<div className="Header">

<HeaderUsuario />

    <div className={styles.conteudo}>
      <div className={styles.container}>
        <div className={styles.conteudoFuncionarios}>
          <NavbarBarbeiro/>
          <div className={styles.inputsPesquisaFiltro}>
            <div className={styles.pesquisaFuncionario}>
              <input type="text" placeholder="Pesquise por funcionário" />
            </div>

            <div className={styles.filtro}>
              <input type="text" placeholder="Filtro" />
            </div>
          </div>

          <div className={styles.quadroFuncionarios}>
            <div className={styles.totalAdicionarFuncionarios}>
              <div className={styles.totalFuncionarios}>
                <div className={styles.numeroTotalFuncionarios}>
                  <span>27</span>
                </div>

                <div className={styles.spanTotalFuncionarios}>
                  <span>Total de funcionários</span>
                </div>
              </div>

              <div className={styles.adicionarFuncionario}>
                <div className={styles.iconAdicionarFuncionario}>
                  <svg width="30" height="35" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43 40.5H28M35.5 33V48M3 48C3 38.335 10.835 30.5 20.5 30.5C22.2375 30.5 23.9157 30.7532 25.5 31.2247M30.5 13C30.5 18.5229 26.0228 23 20.5 23C14.9771 23 10.5 18.5229 10.5 13C10.5 7.47715 14.9771 3 20.5 3C26.0228 3 30.5 7.47715 30.5 13Z" stroke="#082031" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className={styles.spanAdicionarFuncionario}>
                  <span>Adicionar funcionários</span>
                </div>
              </div>
            </div>

            <div className={styles.listaFuncionarios}>
              <div className={styles.funcionario}>
                <div className={styles.fotoFuncionario}>
                  <div className={styles.fotoTeste}>a</div>
                </div>

                <div className={styles.nomeFuncionario}>
                  <span>Monique F.</span>
                </div>

                <div className={styles.buttonVerMais}>
                  <button onClick={() => abrirEditarDeletar()}>Ver mais</button>
                </div>
              </div>

              <div className={styles.funcionario}>
                <div className={styles.fotoFuncionario}>
                  <div className={styles.fotoTeste}>a</div>
                </div>

                <div className={styles.nomeFuncionario}>
                  <span>Monique F.</span>
                </div>

                <div className={styles.buttonVerMais}>
                  <button onClick={() => abrirEditarDeletar()}>Ver mais</button>
                </div>
              </div>

              <div className={styles.funcionario}>
                <div className={styles.fotoFuncionario}>
                  <div className={styles.fotoTeste}>a</div>
                </div>

                <div className={styles.nomeFuncionario}>
                  <span>Monique F.</span>
                </div>

                <div className={styles.buttonVerMais}>
                  <button onClick={() => abrirEditarDeletar()}>Ver mais</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Funcionarios;
