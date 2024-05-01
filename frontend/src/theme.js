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
  },
  typography: {
    fontFamily: 'Jakarta, sans-serif',
    h1: {
      fontSize: 48,
      fontWeight: 700,
      color: '#082031'
    },
    h2: {
      fontSize: 32,
      fontWeight: 700,
      color: '#082031'
    },
    h3: {
      fontSize: 24,
      fontWeight: 700,
      color: '#082031'
    },
    h4: {
      fontSize: 20,
      fontWeight: 700,
      color: '#082031'
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
      color: '#082031'
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
      color: '#082031'
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      color: '#082031'
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
            color: '#082031'
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
    }
  }
})
