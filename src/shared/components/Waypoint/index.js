import React, {useRef, useCallback, useEffect} from 'react'

export default ({children = 'Loading...', onChange}) => {
  const loadMoreFunction = useRef({ fn: () => {} })
  const loadMoreRef = useRef(null)

  const observeCallback = useCallback(entry => {
    const [{isIntersecting}] = entry || []
    if (isIntersecting) {
      loadMoreFunction.current.fn && loadMoreFunction.current.fn()

    }
  }, [])

  useEffect(() => {
    // update the function without rerender, also to ensure that intersection observer now fires the new function
    loadMoreFunction.current.fn = onChange
  }, [onChange])

  useEffect(() => {
    if (loadMoreRef && loadMoreRef.current) {
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: [0.1]
      }

      let observer = new IntersectionObserver(observeCallback, options)
      observer.observe(loadMoreRef.current)
      return () => {
        loadMoreRef && loadMoreRef.current && observer.unobserve(loadMoreRef.current)
      }
    }
  }, [loadMoreRef])

  return (
    <span ref={loadMoreRef}>
      {children}
    </span>
  )
}
