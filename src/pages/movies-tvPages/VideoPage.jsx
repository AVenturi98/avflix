import * as React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
const KEY = import.meta.env.VITE_API_KEY

import GlobalContext from '../../context/GlobalContext'

export default function VideoPage({ type }) {

    const { fetchVideos } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([])
    const [videos, setVideos] = React.useState([])
    const [playingVideo, setPlayingVideo] = React.useState(null) // Stato per il video in riproduzione

    const { id } = useParams()

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
            })
            .catch(err => console.error('Error fetch movie to Video Page', err));
    }

    React.useEffect(() => {
        fetchMovieId()
        fetchVideos(type, id, setVideos)

        // Carica l'API di YouTube
        const tag = document.createElement('script')
        tag.src = "https://www.youtube.com/iframe_api"
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

        window.onYouTubeIframeAPIReady = () => {
            videos.forEach(video => {
                new YT.Player(`player-${video.id}`, {
                    events: {
                        'onStateChange': event => handleVideoStateChange(event, video.id)
                    }
                })
            })
        }
    }, [videos])

    // Gestisce lo stato del video
    function handleVideoStateChange(event, videoId) {
        if (event.data === 1) { // 1 = Playing
            setPlayingVideo(videoId)
        } else {
            setPlayingVideo(null)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">{post.title || post.name}</h1>

            {/* VIDEOS */}
            <h1 className='text-3xl font-bold'>Video <span className='text-2xl opacity-60'>({videos.length})</span></h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {videos.map(e =>
                    <div key={e.id} className="relative">
                        <iframe
                            id={`player-${e.id}`}
                            width="100%"
                            height="200px"
                            src={`https://www.youtube.com/embed/${e.key}?enablejsapi=1`}
                            title={e.name}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className='rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'
                        ></iframe>
                        {playingVideo !== e.id && (
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg w-full text-center">
                                {e.name}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}