import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#082031',
      contrastText: '#F4F3EE'
    },
    secondary: {
      main: '#E3A74F',
      contrastText: '#082031',
    }
  }
  ,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0
        }
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#E3A74F',
            color: '#082031',
            borderRadius: 10,
            height: '100%',
            paddingTop: 12,
            paddingBottom: 12,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#082031',
              color: '#E3A74F',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: '#E3A74F',
            border: '1px solid #E3A74F',
            borderRadius: 10,
          }
        },
        {
          props: { variant: 'containedBlue' },
          style: {
            backgroundColor: '#082031',
            color: '#E3A74F',
            borderRadius: 10,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#E3A74F',
              color: '#082031',
            },
          }
        },
        {
          props: { variant: 'outlinedBlue' },
          style: {
            backgroundColor: '#F4F3EE',
            border: '1px solid #082031',
            color: '#082031',
            borderRadius: 10,
            fontWeight: 500,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#082031',
              color: '#E3A74F',
            },
          }
        }
      ]
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#E3A74F'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Plus Jakarta Sans, sans-serif'
        }
      },
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontSize: 32,
            fontWeight: 600,
            color: '#082031'
          }
        },
        {
          props: { variant: 'h2' },
          style: {
            fontSize: 16,
            fontWeight: 500,
            color: '#082031'
          }
        },
        {
          props: { variant: 'body1' },
          style: {
            fontSize: 14,
            fontWeight: 400,
            color: '#082031'
          }
        },
      ]
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      },
      defaultProps: {
        InputProps: {
          style: {
            borderRadius: 12,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14,
            color: '#082031'
          }
        },
        InputLabelProps: {
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14
          }
        }
      }
    },
  }
})
