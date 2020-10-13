import React, { useEffect, useState, useMemo } from 'react'
import {useParams} from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import themes from 'shared/styles/constants/theme'
import { useGiphy } from 'shared/pages/GiphyStore/useGiphy'
import {containerStyle} from 'shared/pages/GiphyStore/style'
import {TYPES} from 'shared/constants/giphyTypes'
import Header from 'shared/pages/GiphyStore/Header'
import List from 'shared/pages/GiphyStore/List'

const GiphyStore = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const themeNames = useMemo(() => Object.keys(themes), [themes]);
  const {query, type = TYPES.GIFS} = useParams()
  const {results, loading, loadMore} = useGiphy({type, query})
  const [theme, setTheme] = useState(themeNames[0])

  let content = useMemo(() => {
    if (results && results.length) {
      return <List data={results} loadMore={loadMore} />
    } else if (loading) {
      return <div>Loading...</div>
    } else {
      return <div>No Results Found</div>
    }
  }, [results])
  return (
    <ThemeProvider theme={themes[theme]}>
      <div css={containerStyle}>
        <Header setTheme={setTheme} theme={theme} query={query} type={type} />
        {content}
      </div>
    </ThemeProvider>
  )
}

export default GiphyStore
