import React from 'react';

function ModalEditarFuncionario4(){
    return (
    <>
        <div style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#082031'
        }}>
            <span>Deletar funcionário</span>
        </div>

        <div style={{
            marginTop: '5%',
            color: '#082031',
            fontWeight: 600
        }}>
            <span>Deseja deletar o funcionário?</span>
        </div>

        <div style={{
                marginTop: '5%',
                display: 'flex',
                width: '90%',
                justifyContent: 'space-between'
            }}>
                <button style={{
                    color: '#E3A74F',
                    backgroundColor: '#F4F3EE',
                    height: 50,
                    width: '45%',
                    borderRadius: 8,
                    border: '2px solid #E3A74F',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1.5
                }} /*</>onClick={()}*/>Cancelar</button>
                <button style={{
                    color: '#082031',
                    backgroundColor: '#E3A74F',
                    height: 50,
                    width: '45%',
                    borderRadius: 8,
                    border: '0px',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1.5
                }} /*</>onClick={()}*/>Confirmar</button>
            </div>
    </>
    )
}

export default ModalEditarFuncionario4;