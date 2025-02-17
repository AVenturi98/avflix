import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"
import KEY from "../../KEY"
// Context
import GlobalContext from "../../context/GlobalContext"

// Components
import AllMedia from "../../components/AllMedia"
import BtnSwitchWord from "../../components/BtnSwitchWord"

export default function MediaTaggedPerson() {

    const { fetchPersonId, person } = useContext(GlobalContext)

    const [backdrops, setBackdrops] = useState([]) // Set Person Image Tag Backdrop
    const [posters, setPosters] = useState([]) // Set Person Image Tag Poster

    const [viewMode, setViewMode] = useState('sfondi')

    const { id } = useParams()

    // fetch Medias
    function fetchMedias() {

        axios.get(`https://api.themoviedb.org/3/person/${id}/tagged_images${KEY}`, {
            params: {
                language: 'en-US'
            }
        })
            .then(res => {
                setBackdrops(res.data.results.map(e => e.media.backdrop_path))
                setPosters(res.data.results.map(e => e.media.poster_path))
                // console.log('Media Tagged Page', res.data.results.map(e => e.media.backdrop_path))

            })
            .catch(err => {
                console.error('Error Person Page', err)
            })
    }

    useEffect(() => {
        fetchPersonId(id)
        fetchMedias()
    }, [id])


    return (
        <>
            {/* IMAGES TAGGED */}


            <div className="container mx-auto px-4 py-8" style={{
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 1%, rgba(0,0,0,1) 99.5%, rgba(0,0,0,0) 100%)',
            }}>

                <h1 className="text-4xl font-bold text-center mb-8">{person.name}</h1>

                <div className={`flex justify-center mb-8 ${!backdrops.length >= 1 && !posters.length >= 1 ? 'hidden' : ''}`}>
                    <BtnSwitchWord text1={'sfondi'}
                        length1={backdrops.length}
                        text2={'poster'}
                        length2={posters.length}
                        set1={() => setViewMode('sfondi')}
                        set2={() => setViewMode('poster')}
                        styleSelected={'bg-green-500'} />
                </div>

                {viewMode === 'sfondi' ?
                    <AllMedia myArray={backdrops} />
                    : !backdrops.length > 0 ?
                        <div className='flex justify-center'>Nessun poster disponibile</div> : ''}

                {viewMode === 'poster' ?
                    <AllMedia myArray={posters} />
                    : !posters.length > 0 ?
                        <div className='flex justify-center'>Nessun poster disponibile</div> : ''}
            </div>

        </>
    )
}