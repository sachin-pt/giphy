import React, {useMemo} from 'react'
import { processData } from 'shared/pages/GiphyStore/List/processData'
import ListItem from 'shared/pages/GiphyStore/ListItem'
import Waypoint from 'shared/components/Waypoint'
import { listStyle } from 'shared/pages/GiphyStore/List/style'
const List = ({loadMore, data = []}) => {
  const {processedData, top, left, height, width} = useMemo(() => processData(data), [data])
  return (
    <div css={listStyle}>
      {processedData.map(item => <ListItem data={item} key={item.url} />)}
      <Waypoint onChange={loadMore}>
        <ListItem data={{top, left, height, width}} />
      </Waypoint>
    </div>
  )
}

export default List
