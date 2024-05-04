import { Box, Modal } from '@mui/material'

export function ModalPersonalizado(props) {
  return (
    <>
      <Modal
        open={props.open}
        onClose={() => props.setOpen(props.open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}>
          {props.children}
        </Box>
      </Modal>
    </>
  )
}
