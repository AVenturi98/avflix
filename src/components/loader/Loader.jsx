import './Loader.css'
import GlobalContext from '../../context/GlobalContext'
import { useContext } from 'react'

export default function Loader() {
    const { loader } = useContext(GlobalContext)

    return (
        <>
            {loader === true ?
                <div className='container_loader ' >
                    <div className="loader relative">
                        <div data-glitch="Loading..." className="glitch absolute top-[50%] left-[50%] transform -translate-[-50% -50%]">Loading...</div>
                    </div>
                </div> : ''}
        </>
    )
}