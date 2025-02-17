import { Outlet } from "react-router"

import NavDettailsContent from "../components/NavDettailsContent"
import NavDettailsPerson from "../components/NavDettailsPerson"

export default function DefaultDettails({ type }) {

    return (
        <>
            {type === ('movie' || 'tv') ?
                <NavDettailsContent type={type} /> :
                <NavDettailsPerson type={type} />}
            <div>
                <Outlet />
            </div>
        </>
    )
}