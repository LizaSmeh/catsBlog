import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FF6F00',
            contrastText: '#FFFFFF'
        }, 
        secondary: {
            main: '#757575'
        },
        background: {
            default: '#F5f5f5f5',
            paper: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: '"Roboto", "Arial", san-serif',
        h4: {
            fontWeight: 700,
            fontSize: '2rem',
            '@media (max-width:600px)': {
                fontSize: '1.5rem'
            }
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
            
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.25rem',
            
        },
        body1: {
             fontSize: '1rem',
             lineHeight: 1.6
            
        },
        body2: {
             fontSize: '0.875rem',
             lineHeight: 1.5
            
        },

    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }
                }
            }

        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 6
                }
            }

        }
    }
})