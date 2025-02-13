import { Outlet } from "react-router";
import { useWindowWidth } from "../context/WindowContext";

import Nav from '../components/Nav'

export default function DefaultLayout() {

    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640
    const tabletWidth = windowWidth >= 640 && windowWidth <= 1000

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