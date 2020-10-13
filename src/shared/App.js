import React, { Fragment, memo } from 'react'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'utils/reactRouterConfig'
import GlobalStyles from 'shared/styles/core'
import { appStyle } from './style'
import ErrorBoundary from 'shared/components/ErrorBoundary/appLevelErrorBoundary'

const App = (props) => {
  const {
    routes,
  } = props
  return (
    <ErrorBoundary>
          <React.Fragment>
            <GlobalStyles />
              <Fragment>
                <div css={appStyle}>
                  {renderRoutes(routes)}
                </div>
              </Fragment>
          </React.Fragment>
    </ErrorBoundary>
  )
}

export default withRouter(
  memo(App)
)
