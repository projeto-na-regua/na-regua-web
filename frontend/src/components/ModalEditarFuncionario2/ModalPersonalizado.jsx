import { Box, Modal } from '@mui/material'

export function ModalPersonalizado(props) {
  return (
    <>
      <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#F4F3EE',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingLeft: 0,
          paddingRight: 0
        }}>
          {props.children}
        </Box>
      </Modal>
    </>
  )
}
