import * as React from 'react'
import { NavLink, Link, useParams } from 'react-router'

// Icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

// Context
import GlobalContext from '../context/GlobalContext'

export default function NavDettailsPerson({ type }) {

    const { mobileWidth, theme } = React.useContext(GlobalContext)

    const [showBack, setShowBack] = React.useState(false)


    const { id } = useParams()

    return (
        <>
            <div className="my-4 px-2 flex flex-wrap items-center justify-center sm:gap-6 gap-4">
                <div className="grow-1 sm:text-center text-gray-600 hover:text-blue-400 contain-arrow-show-minus">
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
                <div className={`flex flex-wrap items-center gap-4 nav-dettails ${mobileWidth ? 'grow-1 justify-center' : ''}`}>
                    <div className={theme === "dark" ? "contain-btn-dettails-dark" : "contain-btn-dettails"}>
                        <NavLink to='media/person'>
                            <p>
                                personaggio
                            </p>
                        </NavLink>
                    </div>
                    <div className={theme === "dark" ? "contain-btn-dettails-dark" : "contain-btn-dettails"}>
                        <NavLink to='media/images'>
                            <p>
                                correlate
                            </p>
                        </NavLink>
                    </div>
                    <div className={theme === "dark" ? "contain-btn-dettails-dark" : "contain-btn-dettails"}>
                        <NavLink to='media/shows'>
                            <p>
                                shows
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