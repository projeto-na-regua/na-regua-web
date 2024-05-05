import React, { useState } from 'react';
import { ModalPersonalizado } from '../ModalPaiEditarFuncionario/ModalPersonalizado';
import styles from './ModalEditarFuncionario3.module.css';

function ModalEditarFuncionario3() {

    const [placeholder, setPlaceholder] = useState('Digite aqui');
    const [placeholder2, setPlaceholder2] = useState('Digite aqui');

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#E3A74F',
                width: 220,
                height: 220,
                borderRadius: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    width: 200,
                    backgroundColor: '#031B4B',
                    borderRadius: 100,
                    cursor: 'pointer'
                }} onClick={trocarFotoEditarFuncionario()}><svg width="50" height="50" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0781 27.5C20.8396 27.5 23.0781 25.2615 23.0781 22.5C23.0781 19.7386 20.8396 17.5 18.0781 17.5C15.3167 17.5 13.0781 19.7386 13.0781 22.5C13.0781 25.2615 15.3167 27.5 18.0781 27.5Z" stroke="#F4F3EE" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.4805 52.5001C28.4053 27.7501 39.9803 23.3999 53.0803 39.4749" stroke="#F4F3EE" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M36.4531 7.5H13.0781C10.4259 7.5 7.88243 8.5534 6.00705 10.4288C4.13168 12.3041 3.07812 14.8478 3.07812 17.5V42.5C3.07812 45.1522 4.13168 47.6955 6.00705 49.571C7.88243 51.4462 10.4259 52.5 13.0781 52.5H43.0781C45.7304 52.5 48.2739 51.4462 50.1491 49.571C52.0246 47.6955 53.0781 45.1522 53.0781 42.5V22.5" stroke="#F4F3EE" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M56.3537 7.92478L43.6037 20.65C42.3537 21.925 38.6037 22.4998 37.7537 21.6748C36.9037 20.8498 37.4787 17.0749 38.7537 15.7999L51.4789 3.07493C52.1219 2.41189 53.0022 2.03156 53.9257 2.01749C54.8494 2.00343 55.7407 2.3567 56.4037 2.99985C57.0669 3.643 57.4472 4.52313 57.4614 5.44675C57.4754 6.37038 57.1219 7.26175 56.4789 7.92478H56.3537Z" stroke="#F4F3EE" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '5%',
                gap: 15,
                width: '100%',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '50%'
                    }} className={styles.span}>
                        <span>Nome</span>
                    </div>

                    <div style={{
                        width: '50%'
                    }} className={styles.divInput}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder={placeholder}
                            onFocus={() => setPlaceholder('')}
                            onBlur={() => setPlaceholder('Digite aqui')}
                            style={{
                                height: 40,
                                borderRadius: 12,
                                backgroundColor: '#F4F3EE',
                                width: '100%'
                            }}
                        />
                    </div>

                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 7,
                    fontSize: 12,
                    fontWeight: 600,
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '50%'
                    }} className={styles.span}>
                        <span>Cargo</span>
                    </div>

                    <div style={{
                        width: '50%'
                    }} className={styles.divInput}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder={placeholder2}
                            onFocus={() => setPlaceholder2('')}
                            onBlur={() => setPlaceholder2('Digite aqui')}
                            style={{
                                height: 40,
                                borderRadius: 12,
                                backgroundColor: '#F4F3EE',
                                width: '100%'
                            }}
                        />
                    </div>

                </div>
            </div>


            <div style={{
                marginTop: '10%',
                display: 'flex',
                width: '90%',
                justifyContent: 'space-between'
            }}>
                <button style={{
                    color: '#082031',
                    backgroundColor: '#F4F3EE',
                    height: 60,
                    width: '45%',
                    borderRadius: 8,
                    border: '2px solid #082031',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1.5
                }}>Descartar informações</button>
                <button style={{
                    color: '#F4F3EE',
                    backgroundColor: '#082031',
                    height: 60,
                    width: '45%',
                    borderRadius: 8,
                    border: '2px solid #082031',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1.5
                }}>Editar informações</button>
            </div>
        </>
    )
}

function trocarFotoEditarFuncionario() {

}

export default ModalEditarFuncionario3;