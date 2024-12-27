import { useState } from 'react'
import SearchInput from './components/searchInput/SearchInput'
import SearchResults from './components/searchResults/SearchResults'
import styles from './App.module.css'

const App = (): JSX.Element => {
  const [query, setQuery] = useState<string>('')

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.appTitle}>
        Search X
      </h1>
      <SearchInput onSearch={handleSearch} />
      {query && <SearchResults query={query} />}
    </div>
  )
}

export default App

