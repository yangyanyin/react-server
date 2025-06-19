// 客户端
import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'


hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <App serverData={(window as any).__INITIAL_DATA__}/>
    </BrowserRouter>
  </StrictMode>,
)


