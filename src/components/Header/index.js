import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeaderContainer } from "./Styles";
import logoIgnite from "../../assets/Logo.svg";
import { Scroll, Timer } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
export function Header() {
    return (_jsxs(HeaderContainer, { children: [_jsx("img", { src: logoIgnite }), _jsxs("nav", { children: [_jsx(NavLink, { to: "/", title: "Timer", children: _jsx(Timer, { size: 24 }) }), _jsx(NavLink, { to: "/history", title: "History", children: _jsx(Scroll, { size: 24 }) })] })] }));
}
