import React, {useState} from 'react'
import {itemStyle, btnStyle} from 'shared/pages/GiphyStore/ListItem/style'

const ListItem = ({data}) => {
  const {url, top, left, height, width, still} = data
  const [play, setPlay] = useState(false)
  const displayUrl = play ? url : still
  let content = <div />
  if (url) {
    content = (
      <>
        <img src={displayUrl} loading='lazy' />
        <span onClick={() => setPlay(!play)} css={btnStyle(play)} />
      </>
    )
  }
  return (
    <div css={itemStyle} style={{
      height: `${height}px`,
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`
    }}>
      {content}
    </div>
  )
}
export default ListItem
