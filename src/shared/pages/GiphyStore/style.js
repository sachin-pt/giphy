import {css, Global} from '@emotion/core'
import { maxDesktopWidth } from 'shared/styles/constants'
import React from 'react'
export const containerStyle = css`
  width: 1024px;
  margin: auto;
  position: relative;
  @media (${maxDesktopWidth}) {
    width: 100%;
  }
`
const global = props => css`
  body {
    background: ${props.background};
  }
`
export const GlobalStyles = () => (<Global styles={global} />)
