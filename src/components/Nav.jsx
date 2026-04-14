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

    return (
        <nav className={`fixed inset-x-0 top-0 z-50 bg-sky-950 py-2 text-white transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
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

                    {/* HUM menu */}
                    <aside ref={asideRef} className={`fixed z-99 top-0.5 right-0 bg-[#000000ef] text-white rounded-l-full h-screen flex justify-center items-center transition-all transition-discrete duration-500 ${openAside ? ' translate-0 xl:w-[30%] sm:w-[50%]' : ' translate-100 w-0'}`}>
                        <button
                            type="button"
                            className={`text-[#ffff00] bg-gray-500 hover:bg-gray-400 border-2 border-amber-100 py-1 px-2 rounded-md absolute top-50 right-10 ${openAside ? 'block' : 'hidden'}`}
                            onClick={() => setOpenAside(false)}>
                            <FontAwesomeIcon icon={faX} />
                        </button>

                        <div className="flex flex-col items-start gap-6 text-2xl">
                            <NavLink to="/" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faHouse} /> Home</NavLink>
                            <NavLink to="/popular-movie" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faFilm} /> Film</NavLink>
                            <NavLink to="/popular-tv" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faClapperboard} /> Serie Tv</NavLink>
                            <NavLink to="/search" className="rounded-md hover:bg-green-400" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faSearch} /> Cerca</NavLink>
                            <NavLink to="/favorites" onClick={() => setOpenAside(false)}><FontAwesomeIcon icon={faHeart} /> Preferiti</NavLink>
                            <BtnDarkMode className='item-center' />
                        </div>
                    </aside>
                </div>
            )}
        </nav>
    );
}