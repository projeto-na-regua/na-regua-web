import React from 'react';
import styles from './CardMeusCortes.module.css'
import imgExemplo1 from '../../utils/assets/exemplo1 e imagem principal.jpeg'
import imgExemplo2 from '../../utils/assets/exemplo 2.jpeg'
import imgExemplo3 from '../../utils/assets/exemplo 3.jpeg'

function CardMeusCortes() {
  return (
    <div className={styles.DivTodoCards}>
      <div className={styles.containerCards}>
        <div className={styles.gridContainer}>

          {/* CARD */}
          <div className={styles.card}>
            <div className={styles.divImagemCards}>
              <img className={styles.imagemCards} src={imgExemplo1} alt="" />
            </div>
            <div className={styles.divInformacoesCorte}>
              <div className={styles.informacoes}>
                <div className={styles.titulo}>Barbearia:</div>
                <div className={styles.subTitulo}>Chico Cortes</div>
              </div>
              <div className={styles.informacoes}>
                <div className={styles.titulo}>Feito Por:</div>
                <div className={styles.subTitulo}>Chico Gunha</div>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className={styles.card}>
            <div className={styles.divImagemCards}>
              <img className={styles.imagemCards} src={imgExemplo2} alt="" />
            </div>
            <div className={styles.divInformacoesCorte}>
              <div className={styles.informacoes}>
                <div className={styles.titulo}>Barbearia:</div>
                <div className={styles.subTitulo}>Chico Cortes</div>
              </div>
              <div className={styles.informacoes}>
                <div className={styles.titulo}>Feito Por:</div>
                <div className={styles.subTitulo}>Chico Gunha</div>
              </div>
            </div>
          </div>
          
          {/* CARD */}
          <div className={styles.card}>
            <div className={styles.divImagemCards}>
              <img className={styles.imagemCards} src={imgExemplo3} alt="" />
            </div>
            <div className={styles.divInformacoesCorte}>
              <div className={styles.informacoes}>
                <div className={styles.titulo}>Barbearia:</div>
                <div className={styles.subTitulo}>Chico Cortes</div>
              </div>
              <div className={styles.informacoes}>
                <div className={styles.titulo}>Feito Por:</div>
                <div className={styles.subTitulo}>Chico Gunha</div>
              </div>
            </div>
          </div>       

        </div>
      </div>
    </div>

  );
}


export default CardMeusCortes;
