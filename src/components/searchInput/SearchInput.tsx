import { useState, useEffect, useRef } from 'react'
import { mockData } from '../../data/mockData'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  onSearch: (query: string) => void
}

const SearchInput = ({ onSearch }: SearchInputProps): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [history, setHistory] = useState<string[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parsed = JSON.parse(localStorage.getItem('searchHistory') || '[]')
    const historyFromStorage: string[] = Array.isArray(parsed) ? parsed : []
    setHistory([...new Set(historyFromStorage)])
  }, [])

  useEffect(() => {
    if (query) {
      const filteredMockData = mockData
        .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        .map((item) => item.title)

      setAutocompleteResults(filteredMockData.slice(0, 10))
    } else {
      setAutocompleteResults([])
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const combinedResults = [
    ...history.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    ...autocompleteResults,
  ].filter((value, index, self) => self.indexOf(value) === index).slice(0, 10)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (!isFocused) {
      setIsFocused(true)
    }
  }

  const saveHistoryToLocalStorage = (newItem: string, currentHistory: string[]) => {
    const updatedHistory = [newItem, ...currentHistory.filter(item => item !== newItem)]
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
    return updatedHistory
  }

  const handleResultClick = (item: string) => {
    setQuery(item)
    onSearch(item)

    const updatedHistory = saveHistoryToLocalStorage(item, history)
    setHistory(updatedHistory)

    setIsFocused(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query)

      if (query) {
        const updatedHistory = saveHistoryToLocalStorage(query, history)
        setHistory(updatedHistory)
      }

      setIsFocused(false)
    }
  }

  return (
    <div className={styles.inputWrapper} ref={wrapperRef}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        autoFocus
      />
      {isFocused && (
        <div className={styles.autocompleteWrapper}>
          {combinedResults.length > 0 && (
            <ul className={styles.autocompleteList}>
              {combinedResults.map((item) => {
                const color = history.includes(item) ? 'purple' : 'black'

                return (
                  <li
                    className={styles.autocompleteItem}
                    key={item}
                    onClick={() => handleResultClick(item)}
                    style={{color: color}}
                  >
                    {
                      history.includes(item)
                        ? <img src="/history.svg" alt="History" style={{marginRight: '10px'}}/>
                        : <img src="/search.svg" alt="Search" style={{marginRight: '10px'}}/>
                    }
                    {item}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchInput
