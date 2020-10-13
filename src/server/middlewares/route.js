import React from 'react'
import App from 'shared/App'
import { matchRoutes } from 'utils/reactRouterConfig'
import routes from 'activeRoutes'
import { ChunkExtractor } from '@loadable/server'
import paths from 'config/paths'
import render from 'server/render'

export default async (req, res, next) => {
  res.locals.extractor = new ChunkExtractor({
    statsFile: paths.loadableClientStatsFile(res.locals.useragent.browserEnv),
    entrypoints: ['bundle']
  })
  const serverContext = {}
  const matched = matchRoutes(
    routes(),
    res.locals.path
  )
  const matches = matched.map(({ route }) => route)
  const app = <App routes={matches} />
  res.header('Content-Type', 'text/html')
  await render(req, res, next, serverContext, app)
}
