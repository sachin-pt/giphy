import React, { Fragment } from 'react'

const renderHtml = () => (
  <Fragment>
    <head>
      <title>Giphy Store</title>
    </head>
    <body>
      <div id='app' className='app'>
        __MARKUP__
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__ = __STATE__`
        }}
      />
      __SCRIPTS__
    </body>
  </Fragment>
)

class HTML extends React.Component {
  render () {
    const markup = renderHtml()
    return (
      <html>
        {markup}
      </html>
    )
  }
}

export default HTML
