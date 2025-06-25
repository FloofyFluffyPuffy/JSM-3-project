import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../app/index.css'
import App from './App'
import AnimeProvider from './components/AnimeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimeProvider>
          <App />
    </AnimeProvider>
  </StrictMode>,
)
