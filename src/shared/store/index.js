import React from 'react'
import conf from 'conf/appConfig'
import { HttpLink, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'

export const createStore = (initialState) => {
  return new ApolloClient({
    ssrMode: __SERVER__,
    link: new HttpLink({ uri: conf.endPoints.gql, fetch }),
    cache: initialState && !__SERVER__ ? new InMemoryCache().restore(initialState) : new InMemoryCache(),
  })
}
export const Provider = ({children, store}) => {
  return <ApolloProvider client={store}>{children}</ApolloProvider>
}
