import { Button } from '@mui/material'
import { useState } from 'react'

export function Teste () {
  const [open, setOpen] = useState(false)

  return  (
    <>
      <div>
        {open ? (
          <div style={{
           backgroundColor: 'red',
           width: 200,
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <Button onClick={() => setOpen(true)}>Editar</Button>
            <Button onClick={() => setOpen(true)}>Deletar</Button>
            
            <Button onClick={() => setOpen(false)}>Fechar</Button>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'green',
            width: 200,
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <p>FOTO DA MUIE</p>
            <Button onClick={() => setOpen(true)}>Abrir</Button>
          </div>
        )}
      </div>
    </>
  )
}
