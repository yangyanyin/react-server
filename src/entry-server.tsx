// server.tsx
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import App from './App'
import { routes } from './routers'
import { matchRoutes } from 'react-router-dom'

export async function render(url: string) {
  const fullUrl = url.startsWith('/') ? url : `/${url}`;
  const matched:any = matchRoutes(routes, fullUrl)

  if (!matched) {
    return {
      html: `<h1>404 Not Found</h1>`,
      statusCode: 404,
    }
  }

  let serverData = null
  if (matched && matched[0].route.fetchData) {
    serverData = await matched[0].route.fetchData(matched[0])
  }

  const html = renderToString(
    <StaticRouter location={fullUrl}>
      <App serverData={serverData} />
    </StaticRouter>
  )

  return { html, serverData }
}
