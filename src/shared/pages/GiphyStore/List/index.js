import React, {useMemo} from 'react'
import { processData } from 'shared/pages/GiphyStore/List/processData'
import ListItem from 'shared/pages/GiphyStore/ListItem'
import { useWaypoint } from 'shared/customHooks/useWaypoint'
import { listStyle } from 'shared/pages/GiphyStore/List/style'
const List = ({loadMore, data = []}) => {
  const {processedData, top, left, height, width} = useMemo(() => processData(data), [data])
  const loadMoreRef = useWaypoint(loadMore)
  return (
    <div css={listStyle}>
      {processedData.map(item => <ListItem data={item} key={item.url} />)}
      <ListItem data={{top, left, height, width}}><div ref={loadMoreRef} /></ListItem>
    </div>
  )
}

export default List
