import React from 'react'
import {tagStyle} from 'shared/components/Tags/style'

const Tags = ({value: selected, onChange, values}) => {
  return (
    <span>
      {values.map(value => <span css={tagStyle(selected === value)} key={value} onClick={() => onChange(value)}>{value}</span>)}
    </span>
  )
}

export default Tags
