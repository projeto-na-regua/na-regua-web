import React from 'react'
import styles from './CardFuncionario.module.css'
import { Button } from '@mui/material'

function CardFuncionario(props) {
  return (
    <div className={styles.funcionario}>
      <div className={styles.fotoFuncionario}>
        <img className={styles.fotoTeste} src={props.image} alt='imagem-barbeiro' />
      </div>

      <div className={styles.nomeFuncionario}>
        <span>{props.name}</span>
      </div>

      <Button onClick={props.onClick} variant='contained'>
        Ver mais
      </Button>
    </div>
  )
}

export default CardFuncionario
