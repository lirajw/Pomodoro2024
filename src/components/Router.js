import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { History } from '../pages/History';
import { DefaultLayout } from '../layouts/DefaultLayout/index';
export function Router() {
    return (_jsx(Routes, { children: _jsxs(Route, { path: '/', element: _jsx(DefaultLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/history", element: _jsx(History, {}) })] }) }));
}
