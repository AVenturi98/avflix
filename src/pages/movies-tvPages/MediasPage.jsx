import * as React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import KEY from '../../KEY'

// Components
import BtnSwitchWord from '../../components/BtnSwitchWord'
import AllMedia from '../../components/AllMedia'

import GlobalContext from '../../context/GlobalContext'

export default function MediasPage({ type }) {

    // Path Img
    const path_img = `https://image.tmdb.org/t/p/original`

    const { fetchMedia } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([])
    const [viewModeImg, setViewModeImg] = React.useState('sfondi') // set View Mode
    const [backdrops, setBackdrops] = React.useState([]) // set Images Backdrop
    const [posters, setPosters] = React.useState([]) // set Images Poster

    const { id } = useParams()

    // Globla fetch
    function fetchMovieId() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}${KEY}`,
            params: { language: 'it-IT' },
        };

        axios
            .request(options)
            .then(res => {
                setPost(res.data)
                // console.log(res.data)
            })
            .catch(err => console.error('Error fetch movie to Medias Page', err));
    }

    React.useEffect(() => {
        fetchMovieId() // global fetch
        fetchMedia(id, type, () => { }, setBackdrops) // handle images backdrop
        fetchMedia(id, type, () => { }, () => { }, setPosters) // handle images poster

        document.documentElement.scrollTop = 0

    }, [])

    return (
        <div className="container mx-auto px-4 py-8" style={{
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 1%, rgba(0,0,0,1) 99.5%, rgba(0,0,0,0) 100%)',
        }}>
            <h1 className="text-4xl font-bold text-center mb-8">{post.title || post.name}</h1>

            {/* IMAGES */}
            <div className="flex justify-center mb-8">
                <BtnSwitchWord text1={'sfondi'}
                    length1={backdrops.length}
                    text2={'poster'}
                    length2={posters.length}
                    set1={() => setViewModeImg('sfondi')}
                    set2={() => setViewModeImg('poster')}
                    styleSelected={'bg-green-500'} />
            </div>

            {viewModeImg === 'sfondi' ?
                <AllMedia myArray={backdrops} />
                : !backdrops.length > 0 ?
                    <div className='flex justify-center'>Nessun poster disponibile</div> : ''}
            {viewModeImg === 'poster' ?
                <AllMedia myArray={posters} />
                : !posters.length > 0 ?
                    <div className='flex justify-center'>Nessun poster disponibile</div> : ''}
        </div>
    )
} 