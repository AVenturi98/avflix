import * as React from 'react';
import { NavLink, Link } from 'react-router';
import './MenuMobile.css';

// Logo
import logo from '../../assets/logo.png';
import logoName from '../../assets/name_av.png';

// Icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClapperboard, faFilm, faHouse, faSearch, faTv, faX } from '@fortawesome/free-solid-svg-icons';

//Components
import BtnDarkMode from '../btnTheme/BtnDarkMode';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function MenuMobile() {

    const [open, setOpen] = React.useState(false) // Set Open Mobile Menù

    return (
        <>
            <div className="px-6 flex justify-between items-center">
                <Link to="/" className='flex justify-center items-center gap-1'>
                    <img src={logo} alt={logo} id="logo" />
                    <img src={logoName} alt="name" id="name" />
                </Link>
                <div className='bars' onClick={() => setOpen(true)}>
                    <FontAwesomeIcon icon={faBars} className='text-2xl' />
                </div>

                {open &&
                    <div id="container_menu">
                        <div className="flex flex-col justify-center items-start mx-[30%] h-full text-2xl gap-7">
                            <div className='btnClose' onClick={() => setOpen(false)}>
                                <FontAwesomeIcon icon={faX} />
                            </div>

                            <NavLink to="/" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faHouse} /> Home</NavLink>
                            <NavLink to="/popular-movie" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faFilm} /> Film</NavLink>
                            <NavLink to="/popular-tv" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faClapperboard} /> Serie Tv</NavLink>
                            <NavLink to="/search" className="rounded-md hover:bg-green-400" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faSearch} /> Cerca</NavLink>
                            <NavLink to="/favorites" onClick={() => setOpen(false)}><FontAwesomeIcon icon={faHeart} /> Preferiti</NavLink>

                            <BtnDarkMode />
                        </div>
                    </div>}
            </div>
        </>
    )
}