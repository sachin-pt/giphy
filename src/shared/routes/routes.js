import React from 'react'
import loadable from '@loadable/component'
const GiphyStore = loadable(() =>
  import(/* webpackChunkName: "GiphyStore" */ '../pages/GiphyStore')
)

const storeRoute = (path) => ({
  path,
  exact: true,
  sensitive: true,
  chunk: 'GiphyStore',
  component: GiphyStore
})


export default () => [
  storeRoute()
]
