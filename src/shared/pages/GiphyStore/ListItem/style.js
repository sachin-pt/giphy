import {css} from '@emotion/core'
import playImage from 'shared/assets/play.svg'
import pauseImage from 'shared/assets/pause.svg'

export const itemStyle = css`
  padding: 5px;
  position: absolute;
  & > div, & > img {
    background: #8d8c8c;
    display: block;
    border-radius: 4px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
export const btnStyle = play => css`
  background-color: white;
  background-image: url(${play ? pauseImage : playImage});
  height: 24px;
  width: 24px;
  display: block;
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-repeat: no-repeat;
  background-position: center / center;
  background-size: contain;
`
