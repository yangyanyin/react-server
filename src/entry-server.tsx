import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

import { getProductDetailApi } from './api'

export async function render(url: string) {
  const serverData = await getProductDetailApi({ product_id: 558151 })
  const html = renderToString(
    <StrictMode >
      <App serverData={serverData} />
    </StrictMode>,
  )
  return { html, serverData }
}
