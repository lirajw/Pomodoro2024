import { HeaderContainer } from "./Styles";
import logoIgnite from "../../assets/Logo.svg";
import { Scroll, Timer } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logoIgnite}/>                            
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24}/>
                </NavLink>
                <NavLink to="/history" title="History">
                    <Scroll size={24}/>
                </NavLink>                                
            </nav>
        </HeaderContainer>
    )
}