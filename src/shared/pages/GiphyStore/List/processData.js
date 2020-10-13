const CONTAINER_WIDTH = 1024
const ITEMS_PER_ROW = 3
const ITEM_WIDTH = Math.floor(CONTAINER_WIDTH / ITEMS_PER_ROW)
export const processData = (list) => {
  let minTops = [0, 0, 0]
  const processedData = list.map(({aspectRatio, url}) => {
    const height = Math.floor(aspectRatio * ITEM_WIDTH)
    const top = Math.min(...minTops)
    const minTopIndex = minTops.indexOf(top)
    const left = minTopIndex * ITEM_WIDTH
    minTops[minTopIndex] = top + height
    return {
      url,
      width: ITEM_WIDTH,
      height,
      top,
      left
    }
  })
  const height = Math.floor(ITEM_WIDTH)
  const top = Math.min(...minTops)
  const minTopIndex = minTops.indexOf(top)
  const left = minTopIndex * ITEM_WIDTH
  return {
    processedData,
    top,
    height,
    width: ITEM_WIDTH,
    left
  }
}
