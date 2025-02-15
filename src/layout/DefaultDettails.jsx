import { useState } from "react"
import { Outlet, NavLink, Link, useParams } from "react-router"

export default function DefaultDettails({ type }) {

    const [showBack, setShowBack] = useState(false)

    const { id } = useParams()
    return (
        <>
            <div className="my-4 flex justify-center gap-6">
                <div className="grow-1 text-center text-gray-600 hover:text-blue-400 contain-arrow-show-minus">
                    <Link to={`/${type}/${id}`} onMouseOver={() => setShowBack(true)} onMouseOut={() => setShowBack(false)}>
                        Torna alla pagina <span className={`arrow-show-minus ${showBack ? "visible" : ''}`}>&lt;</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4 nav-dettails">
                    <NavLink to='media'>
                        IMMAGINI
                    </NavLink>
                    <NavLink to='video'>
                        VIDEO
                    </NavLink>
                    <NavLink to='crew'>
                        CREW
                    </NavLink>
                </div>
                <div className="grow-1 opacity-0">
                    BLANK OUTLET
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}