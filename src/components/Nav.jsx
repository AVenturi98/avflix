import * as React from 'react';
import { NavLink, Link } from "react-router";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// Logo
import logo from '../assets/logo.png';
import logoName from '../assets/name_av.png';

// Context
import GlobalContext from "../context/GlobalContext";
// Components
import MenuMobile from './mobile-menu/MenuMobile';
import BtnDarkMode from './btnTheme/BtnDarkMode';

export default function Nav() {
    const { mobileWidth } = React.useContext(GlobalContext);

    const [openAside, setOpenAside] = React.useState(false);
    const [showNav, setShowNav] = React.useState(true);
    const asideRef = React.useRef(null);
    const lastScrollY = React.useRef(0);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (asideRef.current && !asideRef.current.contains(event.target)) {
                setOpenAside(false);
            }
        };

        if (openAside) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openAside]);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        document.body.style.paddingTop = '80px';
        return () => {
            document.body.style.paddingTop = '';
        };
    }, []);

    return (
        <>
            <nav className={`fixed top-0 w-full bg-sky-950 text-white transition-transform duration-300 ${mobileWidth ? mobileWidth : showNav ? 'z-50 translate-y-0' : 'z-0 -translate-y-full'} `}>
                {mobileWidth ? (
                    <MenuMobile />
                ) : (
                    <div className="flex justify-around items-center p-3">
                        <Link to="/" className='flex items-center gap-1'>
                            <img src={logo} alt="logo" id="logo" />
                            <img src={logoName} alt="name" id='name' />
                        </Link>

                        <nav className='cursor-context-menu flex justify-around'>
                            <button
                                type="button"
                                className='rounded-md p-2 transition-colors duration-200 hover:bg-sky-800'
                                onClick={() => {
                                    if (openAside) setOpenAside(false)
                                    else setOpenAside(true)
                                }}>
                                <FontAwesomeIcon
                                    icon={faBars}
                                    size='2xl'
                                    style={{ color: !openAside ? '#ffffff' : '#ffff00', }} />
                            </button>
                        </nav>
                    </div>
                )}
            </nav>

            {/* HUM menu */}
            <aside ref={asideRef} className={`fixed z-[100] top-0.5 right-0 bg-[#000000ef] text-white rounded-l-full h-screen flex justify-center items-center transition-all transition-discrete duration-500 ${openAside ? 'translate-0 xl:w-[30%] sm:w-[50%] pointer-events-auto' : 'translate-100 w-0 pointer-events-none'}`}>
                <button
                    type="button"
                    className={`text-[#ffff00] bg-gray-500 hover:bg-gray-400 border-2 border-amber-100 py-1 px-2 rounded-md absolute top-50 right-10 ${openAside ? 'block' : 'hidden'}`}
                    onClick={() => setOpenAside(false)}>
                    <FontAwesomeIcon icon={faX} />
                </button>

                <div className="flex flex-col items-start gap-6 text-2xl">
                    <NavLink to="/" className="rounded-md px-3 py-1 transition-colors duration-200 hover:bg-slate-700" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faHouse} /> Home</NavLink>
                    <NavLink to="/popular-movie" className="rounded-md px-3 py-1 transition-colors duration-200 hover:bg-slate-700" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faFilm} /> Film</NavLink>
                    <NavLink to="/popular-tv" className="rounded-md px-3 py-1 transition-colors duration-200 hover:bg-slate-700" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faClapperboard} /> Serie Tv</NavLink>
                    <NavLink to="/search" className="rounded-md px-3 py-1 transition-colors duration-200 hover:bg-slate-400" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faSearch} /> Cerca</NavLink>
                    <NavLink to="/favorites" className="rounded-md px-3 py-1 transition-colors duration-200 hover:bg-slate-700" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faHeart} /> Preferiti</NavLink>
                    <BtnDarkMode className='item-center' />
                </div>
            </aside>
        </>
    );
}