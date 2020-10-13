import loadable from '@loadable/component'
import ErrorBoundary from 'shared/components/ErrorBoundary'
import React, { forwardRef } from 'react'
export default (loadableConstructor, { throwOnError = false, silent = true, ...options } = {}) => {
  const Component = loadable(loadableConstructor, options)
  return forwardRef((props, ref) => {
    const { errorBoundaryOptions = {} } = props
    return (
      <ErrorBoundary errorBoundaryOptions={{ throwOnError, silent, ...errorBoundaryOptions }}>
        <Component {...props} ref={ref} />
      </ErrorBoundary>
    )
  })
}
