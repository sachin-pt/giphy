import React from 'react'
import GlobalStyles from 'shared/styles/core'
import { appStyle } from 'shared/style'

const Error = () => {
  return (
    <React.Fragment>
      <div css={appStyle}>
        <GlobalStyles />
        Some Error Occured
      </div>
    </React.Fragment>
  )
}

export default Error
