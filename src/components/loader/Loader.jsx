import './Loader.css'

export default function Loader() {

    return (
        <div className="loader relative" style={{width: '100%', height: '100%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div data-glitch="Loading..." className="glitch absolute top-[50%] left-[50%] transform -translate-[-50% -50%]">Loading...</div>
        </div>
    )
}