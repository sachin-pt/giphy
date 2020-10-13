import { gql } from 'apollo-server-express'

export default gql`
  type GiphyResult {
    results: [Giphy]
    nextOffset: Int
  }

  extend type Query {
    trendingGiphys(
      type: String!
      offset: Int
      limit: Int
    ): GiphyResult
  }

  extend type Query {
    searchGiphys(
      query: String!
      type: String!
      offset: Int
      limit: Int
    ): GiphyResult
  }
`
