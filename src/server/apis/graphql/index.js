import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
export default (app) => {
  const server = new ApolloServer({
    introspection: true,
    playground: false,
    typeDefs: schema,
    resolvers,
    mocks: process.env.MOCK
      ? {
        Int: () => 1
      }
      : undefined,
  })

  server.applyMiddleware({ app, path: '/api/gql', cors: false })
}
