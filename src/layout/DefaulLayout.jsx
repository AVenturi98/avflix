import { Outlet } from "react-router";

// Context
import GlobalContext from "../context/GlobalContext";

// Components
import Nav from '../components/Nav'
import { useContext } from "react";

export default function DefaultLayout() {

    const { mobileWidth } = useContext(GlobalContext)

    return (
        <>
            <header>
                <Nav />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}