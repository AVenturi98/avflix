import * as React from 'react';
import { NavLink, Link } from 'react-router';
import './MenuMobile.css';

// Logo
import logo from '../../assets/logo.png';
import logoName from '../../assets/name_av.png';

// Icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFilm, faSearch, faTv, faX } from '@fortawesome/free-solid-svg-icons';

//Components
import BtnDarkMode from '../btnTheme/BtnDarkMode';

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
                        <div className="flex flex-col justify-center items-center h-full">
                            <div className='btnClose' onClick={() => setOpen(false)}>
                                <FontAwesomeIcon icon={faX} />
                            </div>
                            <NavLink to='/' className='text-2xl my-4' onClick={() => setOpen(false)}>
                                Home
                            </NavLink>
                            <NavLink to='/search' className='text-2xl my-4' onClick={() => setOpen(false)}>
                                <div>
                                    Search
                                    <span className='ml-2'>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </div>
                            </NavLink>
                            <NavLink to='/popular-movie' className='text-2xl my-4' onClick={() => setOpen(false)}>
                                <div>
                                    Film
                                    <span className='ml-2'>
                                        <FontAwesomeIcon icon={faFilm} />
                                    </span>
                                </div>
                            </NavLink>
                            <NavLink to='/popular-tv' className='text-2xl my-4' onClick={() => setOpen(false)}>
                                <div>
                                    Serie Tv
                                    <span className='ml-2'>
                                        <FontAwesomeIcon icon={faTv} />
                                    </span>
                                </div>
                            </NavLink>
                            <BtnDarkMode />
                        </div>
                    </div>}
            </div>
        </>
    )
}