import React from 'react';

function ModalEditarFuncionario5() {
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '85%'
            }}>
                <svg width="15" height="15" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 23L13 13M13 13L3 3M13 13L23 3M13 13L3 23" stroke="#E3A74F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            <div style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#082031',
                marginTop: '5%'
            }}>
                <span>Deletar funcionário</span>
            </div>

            <div style={{
            marginTop: '5%',
            color: '#082031',
            fontWeight: 600,
            marginBottom: '5%'
        }}>
            <span>Funcionário excluído com sucesso</span>
        </div>
        </>
    )
}

export default ModalEditarFuncionario5;