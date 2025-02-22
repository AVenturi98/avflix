import { NavLink, Link } from "react-router"
import { useContext, useState } from "react"
import { useParams } from "react-router"

// Context
import GlobalContext from "../context/GlobalContext"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
export default function NavDettailsContent({ type }) {

    const { mobileWidth } = useContext(GlobalContext)

    const [showBack, setShowBack] = useState(false)

    const { id } = useParams()



    return (
        <>
            <div className="my-4 px-2 flex items-center justify-center sm:gap-6 gap-3">
                <div className="sm:grow-1 text-center text-gray-600 hover:text-blue-400 contain-arrow-show-minus">
                    <Link to={`/${type}/${id}`} onMouseOver={() => setShowBack(true)} onMouseOut={() => setShowBack(false)}>
                        {!mobileWidth ?
                            <div>
                                Torna alla pagina <span className={`arrow-show-minus ${showBack ? "visible" : ''}`}>&lt;</span>
                            </div> :
                            <div>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ color: '#008000' }} className="text-3xl" />

                            </div>}
                    </Link>
                </div>
                <div className={`flex items-center gap-4 nav-dettails ${mobileWidth ? 'grow-1 justify-center' : ''}`}>
                    <div className="contain-btn-dettails">
                        <NavLink to='media'>
                            <p>
                                IMMAGINI
                            </p>
                        </NavLink>
                    </div>
                    <div className="contain-btn-dettails">
                        <NavLink to='video'>
                            <p>
                                VIDEO
                            </p>
                        </NavLink>
                    </div>
                    <div className="contain-btn-dettails">
                        <NavLink to='crew'>
                            <p>
                                CREW
                            </p>
                        </NavLink>
                    </div>
                </div>
                <div className={mobileWidth ? 'hidden' : 'grow-1 opacity-0'}>
                    BLANK OUTLET
                </div>
            </div>
        </>
    )
}