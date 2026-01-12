import * as React from 'react';
import { NavLink, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
    const asideRef = React.useRef(null);

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

    return (
        <nav className="bg-sky-950 py-2 text-white">
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

                        <div className="flex flex-col items-center gap-6 text-2xl">
                            <NavLink to="/" onClick={() => setOpenAside(false)}>Home</NavLink>
                            <NavLink to="/popular-movie" onClick={() => setOpenAside(false)}>Film</NavLink>
                            <NavLink to="/popular-tv" onClick={() => setOpenAside(false)}>Serie Tv</NavLink>
                            <NavLink to="/search" className="rounded-md py-1 px-2 hover:bg-green-400" onClick={() => setOpenAside(false)}>
                                <FontAwesomeIcon icon={faSearch} />
                            </NavLink>
                            <BtnDarkMode />
                        </div>
                    </aside>
                </div>
            )}
        </nav>
    );
}