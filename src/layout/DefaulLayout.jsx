import { Outlet, useNavigate } from "react-router";

import Nav from "../Nav";

export default function DefaultLayout() {

    const navigate = useNavigate()

    return (
        <>
            <header>
                <Nav />
            </header>
            <main className="p-5">
                <Outlet />
            </main>
        </>
    )
}