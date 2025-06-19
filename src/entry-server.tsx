import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

import { getProductDetailApi } from './api'

export async function render(url: string) {
  const serverData = await getProductDetailApi({ product_id: 558151 })
  const html = renderToString(
    <StrictMode >
      <StaticRouter location={url || '/'}>
        <App serverData={serverData} />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, serverData }
}
