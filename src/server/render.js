import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import Html from 'server/components/HTML'
import { StaticRouter as Router } from 'react-router-dom'
import jsec from 'jsesc'
import {getDataFromTree} from '@apollo/client/react/ssr'
import { createStore, Provider } from 'shared/store'
const getFooter = (template, state, script) => {
  const initialState = JSON.stringify(state).replace(/</g, '\\u003c')
  return template
    .replace(
      '__STATE__',
        `JSON.parse(${jsec(initialState, { json: true, isScriptContext: true })})`
    )
    .replace('__SCRIPTS__', script)
}

const render = async (
  req,
  res,
  next,
  serverContext,
  app,
) => {
  const extractor = res.locals.extractor
  const store = createStore()
  const appContainer = extractor.collectChunks(
        <Provider store={store}>
            <Router location={req.url} context={serverContext}>
              {app}
            </Router>
        </Provider>
  )
  try {
    let markup = ''
      try {
        await getDataFromTree(appContainer)
        markup = renderToString(appContainer)
      } catch (e) {
        console.log(e)
        markup = renderToString(
          extractor.collectChunks(
            <Provider store={store}>
              <Router location={req.url} context={serverContext}>
                Some Error Occured
              </Router>
            </Provider>
          )
        )
      }
    res.status(200)
    res.write('<!doctype html>')

    const staticTemplate = renderToStaticMarkup(
        <Html />
    )
    const [header, footer] = staticTemplate.split('__MARKUP__')
    res.write(header)
    res.write(markup)
    res.end(
      getFooter(
          footer,
          store.extract(),
          `${extractor.getScriptTags()}`,
        )
    )
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default render
