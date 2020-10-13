import React from 'react'

export default (length) => {
  return [...new Array(length)].map(() => React.createRef())
}
