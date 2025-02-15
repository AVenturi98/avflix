import * as React from 'react'
import KEY from '../KEY';
import axios from 'axios';
import { useParams } from 'react-router';

import placeHolder from '../assets/PersonPlaceholder.png'

// Components
import BtnSwitchWord from '../components/BtnSwitchWord'

// Context
import GlobalContext from '../context/GlobalContext';

export default function DettailsPage({ type }) {

    // Path Img
    const path_img = `https://image.tmdb.org/t/p/original`

    const { fetchMedia, fetchVideos, fetchCreditsId,
        cast, crew } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([])
    const [viewMode, setViewMode] = React.useState('immagini'); // set View Mode
    const [viewModeImg, setViewModeImg] = React.useState('sfondi'); // set View Mode
    const [backdrops, setBackdrops] = React.useState([]) // set Images Backdrop
    const [posters, setPosters] = React.useState([]) // set Images Poster
    const [videos, setVideos] = React.useState([]) // set Videos




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
            .catch(err => console.error(err));
    }


    React.useEffect(() => {
        fetchMovieId() // global fetch
        fetchMedia(id, type, () => { }, setBackdrops) // handle images backdrop
        fetchMedia(id, type, () => { }, () => { }, setPosters) // handle images poster
        fetchVideos(type, id, setVideos) // handle videos
        fetchCreditsId(type, id) // handle cast crew
    }, [])


    return (
        <>
            <BtnSwitchWord text1={'immagini'}
                text2={'video'}
                text3={'crew'}
                set1={() => setViewMode('immagini')}
                set2={() => setViewMode('video')}
                set3={() => setViewMode('crew')}
                styleSelected={'bg-blue-500'} />

            <div>{post.title || post.name}</div>

            {/* IMAGES */}
            {viewMode === 'immagini' &&
                <div>
                    <BtnSwitchWord text1={'sfondi'}
                        text2={'poster'}
                        set1={() => setViewModeImg('sfondi')}
                        set2={() => setViewModeImg('poster')}
                        styleSelected={'bg-green-500'} />

                    {viewModeImg === 'sfondi' ?
                        <div className='grid grid-cols-5 gap-4'>
                            {backdrops.map(e =>
                                <img key={e.file_path} src={path_img + e.file_path} alt={post.title || post.name} />
                            )}
                        </div>
                        : viewModeImg === 'poster' &&
                        <div className='grid grid-cols-5 gap-4'>
                            {posters.map(e =>
                                <img key={e.file_path} src={path_img + e.file_path} alt={post.title || post.name} />
                            )}
                        </div>}
                </div>}

            {/* VIDEOS */}
            {viewMode === 'video' &&
                <div className='grid grid-cols-3 gap-3'>
                    {videos.map(e =>
                        <iframe key={e.id}
                            width="80%"
                            height="300px"
                            src={`https://www.youtube.com/embed/${e.key}`}
                            title={e.name}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className='rounded-lg'
                        ></iframe>
                    )}
                </div>
            }


            {/* CREW */}
            {viewMode === 'crew' &&
                <div>
                    <div className='grid grid-cols-2'>
                        <div>
                            <h2>Cast</h2>
                            {cast.map(e =>
                                <div key={e.id}>
                                    <img src={e.profile_path !== null ? `https://image.tmdb.org/t/p/w500` + e.profile_path : placeHolder} alt={e.name}
                                        className='min-w-50 min-h-50 max-w-50 max-h-50 shadow-lg  object-cover' />
                                    <div>{e.name}</div>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2>Crew</h2>
                            {crew.map(e =>
                                <div key={e.id}>
                                    <img src={e.profile_path !== null ? `https://image.tmdb.org/t/p/w500` + e.profile_path : placeHolder} alt={e.name}
                                        className='min-w-50 min-h-50 max-w-50 max-h-50 shadow-lg  object-cover' />
                                    <div>{e.name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>}
        </>
    )
}