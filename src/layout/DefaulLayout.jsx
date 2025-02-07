import { NavLink, Outlet, useNavigate } from "react-router";

export default function DefaultLayout() {

    const navigate = useNavigate()

    return (
        <>
            <header>
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
            </header>
            <main className="p-5">
                <Outlet />
            </main>
        </>
    )
}