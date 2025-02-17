import * as React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import KEY from '../../KEY'
import BtnSwitchWord from '../../components/BtnSwitchWord'

import GlobalContext from '../../context/GlobalContext'

export default function MediasPage({ type }) {

    // Path Img
    const path_img = `https://image.tmdb.org/t/p/original`

    const { fetchMedia, openModal } = React.useContext(GlobalContext)

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
        <div className="container mx-auto px-4 py-8">
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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {backdrops.map((e, index) =>
                        <div key={e.file_path} className="relative cursor-pointer" onClick={() => openModal(index)}>
                            <img src={path_img + e.file_path} alt={post.title || post.name} className="w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" />
                        </div>
                    )}
                </div>
                : !backdrops.length > 0 ?
                    'Nessun poster disponibile' : ''}
            {viewModeImg === 'poster' ?
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {posters.map((e, index) =>
                        <div key={e.file_path} className="relative cursor-pointer" onClick={() => openModal(index)}>
                            <img src={path_img + e.file_path} alt={post.title || post.name} className="w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" />
                        </div>
                    )}
                </div> : !posters.length > 0 ?
                    'Nessuno sfondo disponibile' : ''}
        </div>
    )
} 