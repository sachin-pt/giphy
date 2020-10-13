import { css } from '@emotion/core'

export const appStyle = css`
  height: 100%;
  &:empty {
    height: 300px;
    background-size: 100px 100px;
  }
`
