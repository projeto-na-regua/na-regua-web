import React from 'react';
import styles from './CardMeusCortes.module.css'
import imgExemplo from '../../utils/assets/IconsHeaderUsuario/exemplo.jpeg'

function CardMeusCortes() {
  return (
    <div className={styles.gridContainer}>

          {/* CARD */}
          <div className={styles.card}>
            <div className={styles.divImagemCards}>
              <img className={styles.imagemCards} src={imgExemplo} alt="" />
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
              <img className={styles.imagemCards} src={imgExemplo} alt="" />
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
              <img className={styles.imagemCards} src={imgExemplo} alt="" />
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
              <img className={styles.imagemCards} src={imgExemplo} alt="" />
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

  );
}


export default CardMeusCortes;
