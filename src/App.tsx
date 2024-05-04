import { ThemeProvider } from 'styled-components'
import {GlobalStyle} from '../styles/global'
import {defaultTheme} from '../styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import {Router} from './components/Router'
import { CycleContextProvider } from './contexts/CyclesContext'

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>        
      <GlobalStyle/>      
      <BrowserRouter>
        <CycleContextProvider>
          <Router/>
        </CycleContextProvider>
      </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
