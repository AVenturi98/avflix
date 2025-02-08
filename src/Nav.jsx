import { NavLink } from "react-router"

export default function Nav() {

    return (
        <nav className="flex justify-around items-center bg-blue-400 py-5 text-white">
            <div>
                LOGO
            </div>
            <button
                type='button'
                onClick={() => navigate(-1)}>back
            </button>
            <NavLink to='/'>
                Home
            </NavLink>

            <NavLink to='/popular-movie'>
                Movies
            </NavLink>
            <NavLink to='/popular-tv'>
                Series
            </NavLink>
        </nav>
    )
}