import { Typography, Divider } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ModeCommentIcon from '@mui/icons-material/ModeComment'

export function Post({ username, content, avatar, imagemPost, likes, dislikes, liked, disliked, commits }) {
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
        <Typography variant='h6'>
          {username}
        </Typography>
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
            borderRadius: 12,
            marginTop: 16,
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
        }}>
          {liked ? <ThumbUpIcon style={{ cursor: 'pointer' }} /> : <ThumbUpOutlinedIcon style={{ cursor: 'pointer' }} />}
          <Typography variant='body1'>
            {likes}
          </Typography>

          {disliked ? <ThumbDownIcon style={{ cursor: 'pointer' }} /> : <ThumbDownOutlinedIcon style={{ cursor: 'pointer' }} />}
          <Typography variant='body1'>
            {dislikes}
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
        }}>
          <ModeCommentIcon style={{ cursor: 'pointer' }} />
          <Typography variant='body1'>
            {commits}
          </Typography>
        </div>
      </div>
    </div>
  )
}
