import conf from 'conf/appConfig'
import fetch from 'node-fetch'
const endpoints = {
  TRENDING: ({ type, offset, limit }) => `${conf.endPoints.giphy}v1/${type}/trending?offset=${offset}&limit=${limit}&api_key=${conf.giphyApiKey}`,
  SEARCH: ({ query, type, offset, limit }) => `${conf.endPoints.giphy}v1/${type}/search?offset=${offset}&limit=${limit}&q=${query}&api_key=${conf.giphyApiKey}`
}

const fetchAndParse = endpoint => async (_, params) => {
  const { data, pagination: { total_count: total, offset, count } } = await fetch(endpoint(params)).then(res => res.json())
  return {
    results: data.map(({ images }) => {
      const { fixed_width_downsampled: { height, width, webp: url }, fixed_width_still: { url: still } } = images || {}
      return { aspectRatio: height / width, url, still }
    }),
    nextOffset: offset + count >= total ? null : offset + count
  }
}
export default {
  Query: {
    searchGiphys: fetchAndParse(endpoints.SEARCH),
    trendingGiphys: fetchAndParse(endpoints.TRENDING)
  }
}
