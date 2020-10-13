import React from 'react'
import conf from 'conf/appConfig'
import { HttpLink, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'

export const createStore = (initialState) => {
  return new ApolloClient({
    // ssrMode: __SERVER__,
    link: new HttpLink({ uri: conf.endPoints.gql, fetch }),
    cache: new InMemoryCache()
    // cache: initialState ? new InMemoryCache().restore(JSON.parse(initialState)) : new InMemoryCache(),
  });
}
export const Provider = ({children, store}) => {
  return <ApolloProvider client={store}>{children}</ApolloProvider>
}
