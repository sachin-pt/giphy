import React, { Component } from 'react'
class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError (error) {
    console.log(error)
    if (error) return { hasError: true, error: error }
  }
  componentDidCatch (error, errorInfo) {
    console.log(error, errorInfo)
  }
  render () {
    let {
      errorBoundaryOptions: {
        errorFallback = null,
        throwOnError = false,
        loadFailMessage = 'Something went wrong!',
        silent = true
      } = {},
      children
    } = this.props

    if (this.state.hasError) {
      if (errorFallback) {
        return errorFallback
      }
      if (throwOnError || __SERVER__) {
        throw this.state.error
      }
      return <DefaultError loadFailMessage={loadFailMessage} silent={silent} />
    }
    return children
  }
}
const DefaultError = ({ loadFailMessage, silent }) => {
  if (silent) return null
  else {
    return <span>{loadFailMessage}</span>
  }
}
export default ErrorBoundary
