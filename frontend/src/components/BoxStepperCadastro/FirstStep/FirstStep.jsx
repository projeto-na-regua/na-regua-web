import { Box, Button, Divider, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import StorefrontIcon from '@mui/icons-material/Storefront'
import ContentCutIcon from '@mui/icons-material/ContentCut'

export function FirstStep() {
  const [selectedOption, setSelectedOption] = useState('')
  const hoverRef = useRef(null)
  const iconRef = useRef(null)
  const textRef = useRef(null)

  const handleOption = (option) => {
    setSelectedOption(option)
  }

  return (
    <Box style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 64
    }}>

      <Box style={{
        marginLeft: 32,
        marginRight: 32,
      }}>
       <Box style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
              RECOMENDADO
            </Typography>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
              <div
                onClick={() => handleOption('empreendedor')}
                style={{
                  display: 'flex',
                  border: selectedOption === 'empreendedor' ? '2px solid #082031' : '1px solid #ccc',
                  borderRadius: 12,
                  flexDirection: 'column',
                  padding: 16,
                  cursor: 'pointer',
                  gap: 16,
                }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 16,
                  alignItems: 'center',
                }}>
                  <StorefrontIcon
                    style={{
                      fontSize: 24,
                      color: selectedOption === 'empreendedor' ? '#082031' : '#9E9E9E'
                    }} />

                  <Typography
                    variant='h7'
                    style={{
                      color: selectedOption === 'empreendedor' ? '#082031' : '#9E9E9E',
                      fontWeight: 600
                    }}>
                    Quero administrar uma barbearia
                  </Typography>
                </div>

                <div>
                  <Typography variant='h7' style={{ color: '#9E9E9E', fontSize: 14 }}>
                    Se você é um empreendedor e deseja cadastrar sua barbearia, clique nesta opção.
                  </Typography>
                </div>
              </div>

              <div
                onClick={() => handleOption('cliente')}
                style={{
                  display: 'flex',
                  border: selectedOption === 'cliente' ? '2px solid #082031' : '1px solid #ccc',
                  borderRadius: 12,
                  flexDirection: 'column',
                  padding: 16,
                  cursor: 'pointer',
                  gap: 16
                }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 16,
                  alignItems: 'center',
                }}>
                  <ContentCutIcon
                    style={{
                      fontSize: 24,
                      color: selectedOption === 'cliente' ? '#082031' : '#9E9E9E'
                    }} />

                  <Typography
                    variant='h7'
                    style={{
                      color: selectedOption === 'cliente' ? '#082031' : '#9E9E9E',
                      fontWeight: 600
                    }}>
                    Quero cortar meu cabelo
                  </Typography>
                </div>

                <div>
                  <Typography variant='h7' style={{ color: '#9E9E9E', fontSize: 14 }}>
                    Se você deseja cortar o cabelo e deseja encontrar barbearias próximas a você, clique nesta opção.
                  </Typography>
                </div>
              </div>
            </div>

            <Divider />

            <Typography variant='body1' style={{ color: '#082031', fontWeight: 'bold', fontSize: 12 }}>
              OUTRAS OPÇÕES
            </Typography>

            <div
              ref={hoverRef}
              style={{
                display: 'flex',
                border: '1px solid #ccc',
                borderRadius: 12,
                flexDirection: 'column',
                padding: 16,
                cursor: 'pointer',
                gap: 16,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => {
                hoverRef.current.style.border = '1px solid #082031'
                iconRef.current.style.color = '#082031'
                textRef.current.style.color = '#082031'
              }}
              onMouseLeave={() => {
                hoverRef.current.style.backgroundColor = ''
                hoverRef.current.style.border = '1px solid #ccc'
                iconRef.current.style.color = '#9E9E9E'
                textRef.current.style.color = '#9E9E9E'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <ContentCutIcon ref={iconRef} style={{ fontSize: 24, color: '#9E9E9E' }} />

                <Typography ref={textRef} variant='h7' style={{ color: '#9E9E9E', fontWeight: 600 }}>
                  Entrar na minha conta de barbeiro
                </Typography>
              </div>
            </div>
          </Box>
      </Box>
    </Box>
  )
}
