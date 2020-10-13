import { loadableReady } from '@loadable/component'
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import App from 'shared/App'
import cleanUrl from 'client/lib/cleanUrl'
import routes from 'activeRoutes'
import { Provider, createStore } from 'shared/store'
import getHistory from 'client/lib/history'

const polyfills = []
if (!__USE_REACT__ && !__PROD__) {
  require('preact/debug')
}
function renderApp () {
  cleanUrl()
  const store = createStore(window.__INITIAL_STATE__)

  render(
    <Provider store={store}>
      <Router history={getHistory()}>
        <App routes={routes()} />
      </Router>
    </Provider>,
    document.getElementById('app'),
  )
  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept()
    }
  }
}
function loadSource () {
  return new Promise((resolve) => {
    loadableReady(() => resolve())
  })
}
function downloadPolyfill () {
  if (!window.IntersectionObserver) {
    polyfills.push(
      import(/* webpackChunkName:"polyfill-intersectionObserver" */ 'intersection-observer')
    )
  }
  return Promise.all(polyfills)
}
try {
  Promise.all([loadSource(), downloadPolyfill()]).then(() => renderApp())
} catch (e) {
  console.log(e)
}
