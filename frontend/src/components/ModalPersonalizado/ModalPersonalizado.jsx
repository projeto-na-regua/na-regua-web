import { Box, Modal } from '@mui/material'

export function ModalPersonalizado(props) {
  return (
    <>
      <Modal
        open={props.open}
        setOpen={() => props.setOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#F4F3EE',
          borderRadius: 8,
          boxShadow: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingLeft: 0,
          paddingRight: 0,
          ...props.style
        }}>
          {props.children}
        </Box>
      </Modal>
    </>
  )
}
