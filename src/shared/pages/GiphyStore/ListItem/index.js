import React from 'react'
import {itemStyle} from 'shared/pages/GiphyStore/ListItem/style'

const ListItem = ({data}) => {
  const {url, top, left, height, width} = data
  if (url) {
    return (
      <div css={itemStyle}  style={{
        height: `${height}px`,
        width: `${width}px`,
        top: `${top}px`,
        left: `${left}px`
      }}><img src={url} loading='lazy'  />
      </div>
    )
  }
  return (
    <div css={itemStyle} loading='lazy' style={{
      height: `${height}px`,
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`
    }}><div  />
    </div>
  )
}
export default ListItem
