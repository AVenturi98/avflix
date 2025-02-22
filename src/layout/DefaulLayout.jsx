import { Outlet } from "react-router";

// Context
import GlobalContext from "../context/GlobalContext";

// Components
import Nav from '../components/Nav'
import { useContext } from "react";
import Footer from "../components/Footer";

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
            <footer>
                <Footer />
            </footer>
        </>
    )
}