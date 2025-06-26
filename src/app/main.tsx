import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../app/index.css'
import App from './App'
import AnimeProvider from './components/AnimeProvider'
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AnimeProvider>
          <App />
    </AnimeProvider>
    </BrowserRouter>
  </StrictMode>,
)
