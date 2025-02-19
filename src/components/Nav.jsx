import { NavLink, Link } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import logo from '../assets/logo.png'

export default function Nav() {


    return (
        <nav className="flex justify-around items-center bg-sky-950 py-5 text-white">
            <Link to="/">
                <img src={logo} alt={logo} id="logo" />
            </Link>
            <NavLink to='/'>
                Home
            </NavLink>

            <NavLink to='/popular-movie'>
                Movies
            </NavLink>
            <NavLink to='/popular-tv'>
                Series
            </NavLink>
            <NavLink to='/search' className='rounded-md py-1 px-2 hover:bg-green-400' >
                <FontAwesomeIcon icon={faSearch} />
            </NavLink>
        </nav>
    )
}