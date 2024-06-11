import React from "react";
import styles from "./BoxBarbeariaHistorico.module.css";
import { Button } from '@mui/material';

function BoxBarbeariaHistorico() {
  return (
    <div className={styles.divTodo}>
      <div className={styles.container}>
        <div className={styles.gridCards}>

          {/* Repeat the CARD component as needed */}
          <div className={styles.card}>
            <div className={styles.divImagem}>
              <div className={styles.imagem}></div>
            </div>
            <div className={styles.textos}>
              <div className={styles.titulo}>Dom bigode</div>
              <div className={styles.subtitulo}>Endereco barbearia</div>
            </div>
            <div className={styles.botao}>
              <Button style={{ width: '80%', height: '50px' }} variant='contained'>
              Ver mais
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.divImagem}>
              <div className={styles.imagem}></div>
            </div>
            <div className={styles.textos}>
              <div className={styles.titulo}>Dom bigode</div>
              <div className={styles.subtitulo}>Endereco barbearia</div>
            </div>
            <div className={styles.botao}>
              <Button style={{ width: '80%', height: '50px' }} variant='contained'>
              Ver mais
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.divImagem}>
              <div className={styles.imagem}></div>
            </div>
            <div className={styles.textos}>
              <div className={styles.titulo}>Dom bigode</div>
              <div className={styles.subtitulo}>Endereco barbearia</div>
            </div>
            <div className={styles.botao}>
              <Button style={{ width: '80%', height: '50px' }} variant='contained'>
                Ver mais
              </Button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.divImagem}>
              <div className={styles.imagem}></div>
            </div>
            <div className={styles.textos}>
              <div className={styles.titulo}>Dom bigode</div>
              <div className={styles.subtitulo}>Endereco barbearia</div>
            </div>
            <div className={styles.botao}>
              <Button style={{ width: '80%', height: '50px' }} variant='contained'>
              Ver mais
              </Button>
            </div>
          </div>



          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
}

export default BoxBarbeariaHistorico;
