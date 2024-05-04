import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';
import { defaultTheme } from '../styles/themes/default';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './components/Router';
import { CycleContextProvider } from './contexts/CyclesContext';
function App() {
    return (_jsxs(ThemeProvider, { theme: defaultTheme, children: [_jsx(GlobalStyle, {}), _jsx(BrowserRouter, { children: _jsx(CycleContextProvider, { children: _jsx(Router, {}) }) })] }));
}
export default App;
