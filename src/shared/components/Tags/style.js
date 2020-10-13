import {css} from '@emotion/core'
import {fonts} from 'shared/styles/constants/fonts'

export const tagStyle = selected => props => css`
  display: inline-block;
  vertical-align: middle;
  border-radius: 20px;
  text-align: center;
  min-width: 120px;
  padding: 5px;
  border: 2px solid ${props.text};
  color: ${selected ? props.background : props.text};
  background: ${selected ? props.text : props.background};
  cursor: pointer;
  margin: 0 5px;
  ${fonts.f16}
`
