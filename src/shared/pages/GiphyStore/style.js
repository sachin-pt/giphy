import {css} from '@emotion/core'
import { maxDesktopWidth } from 'shared/styles/constants'

export const containerStyle = css`
  width: 1024px;
  margin: auto;
  position: relative;
  @media (${maxDesktopWidth}) {
    width: 100%;
  }
`
