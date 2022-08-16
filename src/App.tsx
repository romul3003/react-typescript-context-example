import { 
  createContext,
  useContext, 
  FC, 
  useState,
  PropsWithChildren,
  useCallback, 
  useMemo, 
  CSSProperties,
} from 'react'

interface Theme {
  color: string;
  background: string;
}

type AvailableThemes = 'light' | 'dark'

const themes: Record<AvailableThemes, CSSProperties> = {
  light: {
    color: '#000000',
    background: '#eeeeee'
  },
  dark: {
    color: '#ffffff',
    background: '#222222'
  },
}

const ThemeContext = createContext<{
  theme: CSSProperties,
  toggle: () => void,
  setTheme?: (t: AvailableThemes) => void
}>({
  theme: themes.dark,
  toggle: () => {},
})


const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<AvailableThemes>('dark')

  const toggle = useCallback<() => void>(() => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }, [currentTheme])

  const setTheme = useCallback<(theme: AvailableThemes) => void>((theme) => {
    setCurrentTheme(theme)
  }, [])

  const memoizedTheme = useMemo<CSSProperties>(() => {
    return themes[currentTheme]
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{
      toggle,
      setTheme,
      theme: memoizedTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

const Hooks: FC = () => {
  const { theme, toggle } = useContext(ThemeContext)

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 0'}}>
      <button
        onClick={toggle}
        style={{background: theme.background, color: theme.color}}
      >
        My beautiful button
      </button>
    </div>
  )
}

const App: FC = () => (
  <div>
    <ThemeProvider>
      <Hooks />
    </ThemeProvider>
  </div>
)

export default App
