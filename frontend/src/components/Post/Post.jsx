import { Button, Typography, Menu, MenuItem } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

export function Post({ username, content, avatar, imagemPost, likes, commits, onLike, modalOpen, isOwner, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [liked, setLiked] = useState(false)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    onDelete()
    handleMenuClose()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      padding: 16,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        }}>
          <img
            src={avatar}
            alt='imagem de perfil'
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
            }}
          />
          <Typography variant='body1'>
            @{username}
          </Typography>
        </div>
        {isOwner && (
          <div>
            <Button onClick={handleMenuOpen} variant='text'>
              <MoreVertIcon />
            </Button>


            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDelete}>Excluir</MenuItem>
            </Menu>
          </div>
        )}

      </div>
      <Typography variant='body1'>
        {content}
      </Typography>
      {imagemPost && (
        <img
          src={imagemPost}
          alt='imagem do post'
          style={{
            width: '100%',
            maxWidth: 500,
            height: 'auto',
            borderRadius: 12,
            border: '1px solid #CBD5E0',
            maxHeight: 400,
            objectFit: 'cover'
          }}
        />
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          cursor: 'pointer',
        }} onClick={() => setLiked(!liked)}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          <Typography variant='body1'>
            {likes === 0 ? 0 : likes}
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          cursor: 'pointer',
        }} onClick={modalOpen}>
          <ModeCommentIcon />
          <Typography variant='body1'>
            {commits}
          </Typography>
        </div>
      </div>
    </div>
  )
}
