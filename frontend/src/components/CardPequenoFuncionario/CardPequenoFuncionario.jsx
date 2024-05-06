import React from 'react'
import styles from './CardPequenoFuncionario.module.css'

function CardPequenoFuncionario(props) {
  return (
    <div onClick={props.onClick} style={{ cursor: props.cursor }} className={styles.adicionarFuncionario}>
      <div className={styles.iconAdicionarFuncionario}>
        {/* <svg width="30" height="35" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43 40.5H28M35.5 33V48M3 48C3 38.335 10.835 30.5 20.5 30.5C22.2375 30.5 23.9157 30.7532 25.5 31.2247M30.5 13C30.5 18.5229 26.0228 23 20.5 23C14.9771 23 10.5 18.5229 10.5 13C10.5 7.47715 14.9771 3 20.5 3C26.0228 3 30.5 7.47715 30.5 13Z" stroke="#082031" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> */}
        {props.icon}
      </div>

      <div className={styles.spanAdicionarFuncionario}>
        <span>{props.title}</span>
      </div>
    </div>
  )

}

export default CardPequenoFuncionario
