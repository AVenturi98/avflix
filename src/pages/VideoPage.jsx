import * as React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import KEY from '../KEY'

import GlobalContext from '../context/GlobalContext'

export default function VideoPage({ type }) {

    const { fetchVideos } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([])
    const [videos, setVideos] = React.useState([]) // set Videos

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
            .catch(err => console.error('Error fetch movie to Video Page', err));
    }

    React.useEffect(() => {
        fetchMovieId() // global fetch
        fetchVideos(type, id, setVideos) // handle videos

        document.documentElement.scrollTop = 0

    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">{post.title || post.name}</h1>

            {/* VIDEOS */}
            <h1 className='text-3xl font-bold'>Video <span className='text-2xl opacity-60'>({videos.length})</span></h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {videos.map(e =>
                    <div key={e.id} className="relative">
                        <iframe
                            width="100%"
                            height="200px"
                            src={`https://www.youtube.com/embed/${e.key}`}
                            title={e.name}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className='rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'
                        ></iframe>
                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg w-full text-center">
                            {e.name}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}