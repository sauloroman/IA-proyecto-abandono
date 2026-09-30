import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PredictorApp } from './PredictorApp'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PredictorApp />
  </StrictMode>,
)
