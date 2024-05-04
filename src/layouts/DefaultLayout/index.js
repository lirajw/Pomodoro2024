import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from './Styles';
export function DefaultLayout() {
    return (_jsxs(LayoutContainer, { children: [_jsx(Header, {}), _jsx(Outlet, {})] }));
}
