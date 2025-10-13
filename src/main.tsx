import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {Provider} from 'react-redux' 
import { store } from './app/store.ts'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
    <App /></BrowserRouter>
    </ThemeProvider></Provider>
  </StrictMode>,
)
