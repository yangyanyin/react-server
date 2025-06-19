import fs from 'node:fs/promises'
import express from 'express'
import path from 'node:path'
import { Transform } from 'node:stream'
import { createProxyMiddleware } from 'http-proxy-middleware'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5174
const base = process.env.BASE || '/'
const ABORT_DELAY = 10000

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// create the proxy
/** @type {import('http-proxy-middleware/dist/types').RequestHandler<express.Request, express.Response>} */
const exampleProxy = createProxyMiddleware({
  target: 'https://api.alpha.patpat.vip', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: { '^/api': '' }
});
app.use('/api', exampleProxy)

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (isProduction) {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
} else {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (isProduction) {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    } else {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    }


    const rendered = await render(url)
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(`<!--server-data-->`, `<script>window.__INITIAL_DATA__ = ${JSON.stringify(rendered.serverData)}</script>`)
      
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
