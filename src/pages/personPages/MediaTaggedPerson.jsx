import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"
const KEY = import.meta.env.VITE_API_KEY
// Context
import GlobalContext from "../../context/GlobalContext"

// Components
import AllMedia from "../../components/AllMedia"
import BtnSwitchWord from "../../components/BtnSwitchWord"

// Lazy Loader
import LazyLoader from "../../components/LazyLoader"

// Icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function MediaTaggedPerson() {

    // Path Img
    const path_img = `https://image.tmdb.org/t/p/original`

    const { fetchPersonId, person } = useContext(GlobalContext)

    const [backdrops, setBackdrops] = useState([]) // Set Person Image Tag Backdrop
    const [posters, setPosters] = useState([]) // Set Person Image Tag Poster
    const [still, setStill] = useState([]) // Set Person Image Tag Still path

    const [loading, setLoading] = useState(false) // Set Loading State

    const [viewMode, setViewMode] = useState('sfondi')

    const { id } = useParams()

    // fetch Medias
    function fetchMedias() {
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/person/${id}/tagged_images?api_key=dba9492b080738637f53df6bffa6b8c3`, {
            params: {
                language: 'en-US'
            },
        })
            .then(res => {
                setBackdrops(res.data.results.map(e => e.media.backdrop_path).filter(Boolean))
                setPosters(res.data.results.map(e => e.media.poster_path).filter(Boolean))
                setStill(res.data.results.map(e => e.media.still_path).filter(Boolean))
                setLoading(false)
                // console.log('Media Tagged Page', res.data.results.map(e => e.media.backdrop_path))
            })
            .catch(err => {
                console.error('Error Person Page', err)
            })
    }

    useEffect(() => {
        fetchPersonId(id)
        fetchMedias()

        document.documentElement.scrollTop = 0
    }, [id])

    return (
        <>
            {/* IMAGES TAGGED */}
            <div className="container mx-auto px-4 py-8">

                <h1 className="text-4xl font-bold text-center mb-8">{person.name}</h1>

                <div className={`flex justify-center mb-8 ${!backdrops.length && !posters.length ? 'hidden' : ''}`}>
                    <BtnSwitchWord text1={'sfondi'}
                        length1={backdrops.length}
                        text2={'poster'}
                        length2={posters.length}
                        set1={() => setViewMode('sfondi')}
                        set2={() => setViewMode('poster')}
                        styleSelected={'bg-green-500'} />
                </div>

                {viewMode === 'sfondi' && (backdrops.length > 0 || still.length > 0) ?
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {(backdrops.length > 0 ? backdrops : still).map((e, i) =>
                            <div key={i} className="relative cursor-pointer" >
                                <LazyLoader image={path_img + e} style={"w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"} />
                            </div>
                        )}
                    </div>
                    : viewMode === 'sfondi' && !backdrops.length && !still.length ?
                        <div className='flex justify-center'>Nessun sfondo disponibile</div>
                        : loading && viewMode === 'sfondi' ?
                            <div className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faSpinner} />
                            </div>
                            : ''}

                {viewMode === 'poster' && posters.length > 0 ?
                    <AllMedia myArray={posters} />
                    : viewMode === 'poster' && !posters.length > 0 ?
                        <div className='flex justify-center'>Nessun poster disponibile</div>
                        : loading && viewMode === 'poster' ?
                            <div className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faSpinner} />
                            </div>
                            : ''}
            </div>
        </>
    )
}