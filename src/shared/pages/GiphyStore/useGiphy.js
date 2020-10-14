import {useQuery, gql} from '@apollo/client'
import { useCallback } from 'react'

const TRENDING_QUERY = gql`
  query ($type: String!, $offset: Int, $limit: Int) {
    trendingGiphys(limit: $limit, offset: $offset, type: $type) {
      results {
        aspectRatio
        url
        still
      }
      nextOffset
    }
  }
`;

const SEARCH_QUERY = gql`
  query ($query: String!, $type: String!, $offset: Int, $limit: Int) {
    searchGiphys(query: $query, limit: $limit, offset: $offset, type: $type) {
      results {
        aspectRatio
        url
        still
      }
      nextOffset
    }
  }
`;

export const useGiphy = ({type, query}) => {
  const {data = {}, fetchMore, loading} = useQuery(
    query ? SEARCH_QUERY : TRENDING_QUERY,
    {
      variables: {
        limit: 25,
        offset: 0,
        type,
        query
      },
      fetchPolicy: "cache-first"
    }
  )
  const {results = [], nextOffset} = data.trendingGiphys || data.searchGiphys || {}
  const loadMore = useCallback(() => !loading && nextOffset && fetchMore({
    variables: {
      offset: nextOffset
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult || nextOffset === 0) return prev
      const key = Object.keys(prev)[0]
      const prevData = prev[key]
      return {
        ...prev,
        [key]: {...prevData, ...fetchMoreResult[key], results: [...prevData.results, ...fetchMoreResult[key].results]}
      }
    }
  }), [loading, nextOffset, fetchMore])

  return {results, loading, loadMore}
}
