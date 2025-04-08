import * as React from 'react';
import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// Logo
import logo from '../assets/logo.png';
// Context
import GlobalContext from "../context/GlobalContext";
// Components
import MenuMobile from './mobile-menu/MenuMobile';
import BtnDarkMode from './BtnDarkMode';

export default function Nav() {
    const { mobileWidth } = React.useContext(GlobalContext);

    return (
        <nav className="bg-sky-950 py-5 text-white">
            {mobileWidth ? (
                <MenuMobile />
            ) : (
                <div className="flex justify-around items-center">
                    <Link to="/">
                        <img src={logo} alt="logo" id="logo" />
                    </Link>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/popular-movie">Film</NavLink>
                    <NavLink to="/popular-tv">Serie Tv</NavLink>
                    <NavLink to="/search" className="rounded-md py-1 px-2 hover:bg-green-400">
                        <FontAwesomeIcon icon={faSearch} />
                    </NavLink>
                    <BtnDarkMode />
                </div>
            )}
        </nav>
    );
}