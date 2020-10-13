import {css} from '@emotion/core'
import {fonts} from 'shared/styles/constants/fonts'
export const inputStyle = props => css`
  border-radius: 2px;
  width: 200px;
  padding: 5px;
  font-weight: 500;
  border: 2px solid ${props.text};
  color: ${props.text};
  background: ${props.background};
  ${fonts.f16}

`
export const tagContainer = props => css`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 10px 0;
  background: ${props.background};
`

export const flexContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
