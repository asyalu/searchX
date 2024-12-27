import { useState, useEffect } from 'react'
import { SearchItem } from '../../types/search'
import { mockData } from '../../data/mockData'
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  query: string
}

const SearchResults = ({ query }: SearchResultsProps): JSX.Element => {
  const [results, setResults] = useState<SearchItem[]>([])
  const [loadingTime, setLoadingTime] = useState<number>(0)

  useEffect(() => {
    if (query) {
      const startTime = performance.now()
      const filteredResults = mockData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      )
      const endTime = performance.now()
      setResults(filteredResults)
      setLoadingTime(endTime - startTime)
    }
  }, [query])

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.metaDataWrapper}>
        <div className={styles.resultsCount}>
          {results.length} results found
        </div>
        <div className={styles.loadingTime}>
          Time taken: {loadingTime.toFixed(2)} ms
        </div>
      </div>
      <ul className={styles.resultsList}>
        {results.map((item) => (
          <li key={item.title} className={styles.resultItem}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.resultLink}>
              <strong>{item.title}</strong>
            </a>
            <p className={styles.resultDescription}>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
