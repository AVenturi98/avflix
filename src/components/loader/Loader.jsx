import './Loader.css'
import GlobalContext from '../../context/GlobalContext'
import { useContext } from 'react'

export default function Loader() {
    const { loader } = useContext(GlobalContext)

    return (
        <>
            {loader === true ?
                <div className="loader relative" style={{ width: '100%', height: '100%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div data-glitch="Loading..." className="glitch absolute top-[50%] left-[50%] transform -translate-[-50% -50%]">Loading...</div>
                </div> : ''}
        </>
    )
}