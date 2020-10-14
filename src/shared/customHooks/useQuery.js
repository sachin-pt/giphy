import {useLocation, useParams} from 'react-router-dom'
import {useMemo} from 'react'
export const useRouter = () => {
  const location = useLocation()
  const params = useParams()
  const query = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const iterator = searchParams.keys()
    let result = iterator.next()
    const query = {}
    while (!result.done) {
      const key = result.value
      let value = searchParams.getAll(key)
      value = value.length > 1 ? value : value[0]
      query[key] = value
      result = iterator.next()
    }
    return query
  }, [location])
  return {params, query}
}
