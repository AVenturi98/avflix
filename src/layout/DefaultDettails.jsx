import { Outlet, NavLink, Link, useParams } from "react-router"

export default function DefaultDettails({ type }) {

    const { id } = useParams()
    return (
        <>
            <div className="my-4 flex justify-center gap-6">
                <div className="grow-1 text-center hover:text-blue-400">
                    <Link to={`/${type}/${id}`}>
                        Torna alla pagina
                    </Link>
                </div>
                <div className="flex items-center gap-4 ">
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