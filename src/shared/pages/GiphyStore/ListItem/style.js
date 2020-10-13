import {css} from '@emotion/core'

export const itemStyle = css`
  padding: 5px;
  position: absolute;
  & > div, & > img {
    background: #8d8c8c;
    display: block;
    border-radius: 4px;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`
