import { flexContainer, tagContainer, inputStyle } from 'shared/pages/GiphyStore/Header/style'
import Tags from 'shared/components/Tags'
import {TYPES} from 'shared/constants/giphyTypes'
import themes from 'shared/styles/constants/theme'
import debounce from 'shared/utils/debounce'
import getHistory from 'client/lib/history'
import React, {useState} from 'react'
const debouncedPush = debounce(pushHistory, 300)
function pushHistory (path) {
  getHistory().push(path)
}
const Header = ({setTheme, theme, query, type}) => {
  const [str, setQuery] = useState(query || '')
  const onChange = e => {
    const val = e.target.value || ''
    setQuery(val)
    const query = new URLSearchParams({type, query: val})
    const path = `/?${query.toString()}`
    debouncedPush(path)
  }
  const changeType = (type) => {
    const qry = new URLSearchParams({type, query: query || ''})
    const path = `/?${qry.toString()}`
    getHistory().push(path)
  }
  return (
    <div css={tagContainer}>
      <div css={flexContainer}>
        <Tags label='Theme' onChange={setTheme} values={Object.keys(themes)} value={theme} />
        <input placeholder='Search here..' css={inputStyle} value={str} onChange={onChange} />
        <Tags label='Type' onChange={changeType} values={[TYPES.GIFS, TYPES.STICKERS]} value={type} />
      </div>
    </div>
  )
}
export default Header
