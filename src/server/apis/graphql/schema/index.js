import { gql } from 'apollo-server-express'

import response from './response'
import entities from './entities'
const linkSchema = gql`

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [linkSchema, ...entities, ...response]
