import React, { Fragment } from 'react'
import { css, Global } from '@emotion/core'
import { desktopWidth } from 'shared/styles/constants'

const font = () => {
    return `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
}
const globals = () => css`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font: inherit;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    @media (min-width: ${desktopWidth}) {
      -webkit-font-smoothing: antialiased; /* font smoothing enabled for mobile icons & desktop only */
    }
  }

  ::before,
  ::after {
    -webkit-font-smoothing: antialiased;
  }

  html,
  body {
    height: 100%;
  }
  .pixel {
    display: none;
  }

  html {
    font-size: 14px;
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  body {
    position: relative;
    font-family: ${font()};
    font-style: normal;
    -webkit-tap-highlight-color: transparent;
    &.fixed {
      overflow: hidden;
    }
    @media (min-width: ${desktopWidth}) {
      font-weight: 300;
    }
  }

  a {
    background-color: transparent;
    color: inherit;
    text-decoration: none;
  }

  b,
  strong {
    font-weight: 500;
  }

  button,
  input,
  select {
    border: none;
    border-radius: 0;
    outline: none;
  }

  input[type='number'],
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    appearance: textfield;
  }

  h2 {
    font-weight: inherit;
  }

  img,
  a {
    border: none;
    outline: none;
  }

  select {
    background: transparent;
    appearance: none;
  }

  ul {
    list-style: none;
  }

  .app {
    min-height: 100%;
  }
`

const Core = ({  }) => (
  <Fragment>
    <Global styles={globals()} />
  </Fragment>
)


export default Core
