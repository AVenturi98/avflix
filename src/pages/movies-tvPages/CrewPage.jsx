import * as React from 'react'
const KEY = import.meta.env.VITE_API_KEY
import axios from 'axios';
import { Link, useParams } from 'react-router';

import personPlaceholder from '../../assets/PersonPlaceholder.png'

// Context
import GlobalContext from '../../context/GlobalContext';

export default function CrewPage({ type }) {

    // Path Img
    const path_img = `https://image.tmdb.org/t/p/w500`

    const { fetchCreditsId, cast, crew, titleSlug } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([])

    const { id } = useParams()

    // Global fetch
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
            .catch(err => console.error('Error fetch movie to Crew Page', err));
    }

    React.useEffect(() => {
        fetchMovieId() // global fetch
        fetchCreditsId(type, id) // handle cast crew

        document.documentElement.scrollTop = 0

    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">{post.title || post.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CAST */}
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Cast <span className='text-2xl opacity-60'>({cast.length})</span></h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {cast.map(e =>
                            <Link to={`/person/${e.id}` + '_' + titleSlug(e.name)}>
                                <div key={e.id} className="flex flex-col items-center border border-amber-600 bg-amber-50 p-2 rounded-xl">
                                    <img src={e.profile_path !== null ? path_img + e.profile_path : personPlaceholder} alt={e.name}
                                        className='w-32 h-32 rounded-full shadow-lg object-cover mb-2' />
                                    <div className="text-center font-semibold">{e.name}</div>
                                    <div className='text-center italic text-gray-500'>{e.character}</div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                {/* CREW */}
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Crew <span className='text-2xl opacity-60'>({crew.length})</span></h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {crew.map(e =>
                            <Link to={`/person/${e.id}`}>
                                <div key={e.id} className="flex flex-col items-center">
                                    <img src={e.profile_path !== null ? path_img + e.profile_path : personPlaceholder} alt={e.name}
                                        className='w-32 h-32 rounded-full shadow-lg object-cover mb-2' />
                                    <div className="text-center font-semibold">{e.name}</div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}