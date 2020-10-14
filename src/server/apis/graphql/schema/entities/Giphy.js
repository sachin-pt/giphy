import { gql } from 'apollo-server-express'

export default gql`
  type Giphy {
    aspectRatio: Float
    url: String
    still: String
  }
`
