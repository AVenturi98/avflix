import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'
import { useParams } from 'react-router'

import BtnSwitchWord from '../components/BtnSwitchWord'
import ImageCollage from '../components/ImagesCollage'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faStar,
    faStarHalfStroke,
    faStarHalf
} from '@fortawesome/free-solid-svg-icons'
import { faStar as empty } from '@fortawesome/free-regular-svg-icons'
import { selectClasses } from '@mui/joy'

export default function Show({ type }) {

    const [post, setPost] = React.useState([]) // set Post
    const [company, setCompany] = React.useState([]) // set Company
    const [country, setCountry] = React.useState([]) // set Country
    const [genres, setGenres] = React.useState([]) // set Genre
    const [cast, setCast] = React.useState([]) // set Cast
    const [crew, setCrew] = React.useState([]) // set Crew


    const [viewMode, setViewMode] = React.useState('immagini'); // set View Mode
    const [img, setImg] = React.useState([]) // set Images
    const [videos, setVideos] = React.useState([]) // set Videos

    const [season, setSeason] = React.useState([]) // set Seasons
    const [selectedSeason, setSelectedSeason] = React.useState('') // set Show Selected Season
    const [episode, setEpisode] = React.useState([]) // set Show Episode
    const [selectedEpisode, setSelectedEpisode] = React.useState('') // set Show Selected Episode 



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
                setGenres(res.data.genres)
                setCompany(res.data.production_companies)
                setCountry(res.data.production_countries)
                setSeason(res.data.seasons)
                // console.log(res.data)
            })
            .catch(err => console.error(err));
    }

    // Credits fetch (cast, crew)
    function fetchCreditsId() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}/credits${KEY}`,
            params: { language: 'it-IT' },
        };

        axios
            .request(options)
            .then(res => {
                setCast(res.data.cast.slice(0, 10))
                setCrew(res.data.crew.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
                // console.log(res)
            })
            .catch(err => console.error(err));
    }

    // Images fetch
    function fetchImages() {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/images${KEY}`)
            .then(res => {
                setImg(res.data.backdrops.concat(res.data.posters))
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Videos fetch
    function fetchVideos() {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos${KEY}`)
            .then(res => {
                setVideos(res.data.results[0])
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const seasonNumber = selectedSeason.replace(/\D/g, "") // set Season Number

    // Seasons-Episodes fetch (only tv)
    function fetchEpisodes() {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber || 1}${KEY}`, {
            params: {
                language: 'it-IT'
            }
        })
            .then(res => {
                setEpisode(res.data.episodes)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        fetchMovieId()
        fetchCreditsId()
        fetchImages()
        fetchVideos()
    }, [id])

    React.useEffect(() => {
        fetchEpisodes()

    }, [selectedSeason])

    const vote = Math.floor(post.vote_average) / 2 // Set Vote num int e stars adapted

    const collageImages = img.map(e => ({ src: 'https://image.tmdb.org/t/p/original' + e.file_path })) // Set Path Image for Collage Images

    // Set Budget to Dettails section
    const numBudget = post.budget
    const budget = numBudget ? numBudget.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }) : 'Non disponibile'

    const episodeFiltered = episode.filter(e => e.season_number == seasonNumber) // set Filtered Episodes


    return (
        <>
            {/* HERO SHOW */}
            <section id='hero-show' className='mb-10 px-15 lg:px-50 py-10 sm:py-20 lg:py-40 flex items-start bg-gray-100 shadow-lg' style={{ backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.7), rgba(1, 1, 22, 0.9)), url(https://image.tmdb.org/t/p/original${post.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <img className='w-48 lg:w-80 h-auto rounded-lg shadow-lg shadow-gray-600' src={'https://image.tmdb.org/t/p/w500' + post.poster_path} alt={post.original_title || post.name} />
                <div className='ml-10 text-white flex flex-col gap-8 justify-start w-200'>
                    <h1 className='text-5xl text-white font-extrabold mb-2'>{post.original_title || post.name}</h1>
                    <div className='flex items-center justify-between grow-1'>
                        {company.length > 0 && <div className='text-lg text-white mb-4'>{company[0].name}</div>}
                        <div className='text-3xl grow-1 flex justify-center'>
                            <FontAwesomeIcon
                                icon={
                                    vote >= 5
                                        ? faStar
                                        : vote >= 3
                                            ? faStarHalfStroke
                                            : vote > 0
                                                ? faStarHalf
                                                : empty
                                }
                                style={{ color: " #FFD43B ", }} />
                            {vote}
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div>{post.release_date || post.first_air_date + ' / ' + post.last_air_date}</div>
                        -
                        <div>
                            <FontAwesomeIcon icon={faClock} />

                            {type === 'movie' ? ' ' + post.runtime + "'" : ' ' + post.number_of_episodes + ' episodi'}
                        </div>
                    </div>
                    <div>{post.overview}</div>
                    <div className='flex flex-wrap gap-1'>
                        {genres.map((e, index) =>
                            <span key={e.id} className='italic text-amber-100 px-3 py-1 rounded-full text-md'>
                                {e.name}{index < genres.length - 1 && ' - '}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className='flex'>
                <section className='px-10 w-[70%]'>
                    <div className='pb-5'>
                        <BtnSwitchWord text1={'immagini'} set1={() => setViewMode('immagini')} text2={'video'} set2={() => setViewMode('video')} styleSelected={'bg-blue-500 text-white'} />
                    </div>
                    {viewMode === 'immagini' && img.length > 3 ?
                        <ImageCollage images={collageImages} /> :
                        videos ?
                            <iframe
                                width="50%"
                                height="300px"
                                src={`https://www.youtube.com/embed/${videos.key}`}
                                title={videos.key}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='rounded-lg'
                            ></iframe> :
                            'Nessun video disponibile'}
                    <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'>View All Images</button>
                    {/* CAST */}
                    {cast.length > 0 &&
                        <div className='py-15'>
                            <h3 className='mb-8 px-8 flex items-center gap-5'>
                                <p className='text-4xl font-bold'>Cast & Crew</p>
                                <span>
                                    <button>vedi tutti &gt;</button>
                                </span>
                            </h3>
                            <div className='flex items-center gap-8 p-3 overflow-x-auto pr-29' style={{
                                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 1%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
                            }}>
                                {cast.map(e =>
                                    <div key={e.id} className='flex flex-col items-center'>
                                        <img className='min-w-50 min-h-50 max-w-50 max-h-50 rounded-full shadow-lg shadow-black' src={'https://image.tmdb.org/t/p/w500' + e.profile_path} alt={e.name} style={{ objectFit: 'cover' }} />
                                        <div className='mt-2 text-center text-lg font-bold h-18'>{e.name}</div>
                                    </div>
                                )}
                            </div>
                        </div>}
                </section>

                {/* DETTAILS */}
                <div className='px-10'>
                    <h1 className='font-extrabold text-2xl my-3'>Dettagli</h1>

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Titolo Originale</h3>
                    <p>{post.original_title ?
                        post.original_title
                        : post.title && !post.original_title ?
                            post.title : ''}</p>

                    <hr className='opacity-30' />

                    {country[0] &&
                        <>
                            <h3 className='font-semibold text-lg my-1'>Prodotto in</h3>
                            <p>{country.map(e => e.name)}</p>
                        </>}

                    <hr className='opacity-30' />

                    {company[0] &&
                        <>
                            <h3 className='font-semibold text-lg my-1'>Compagnia di produzione</h3>
                            <ul>
                                {company.map(e =>
                                    <li key={e.name}>{e.name}</li>
                                )}
                            </ul>
                        </>}

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Budget</h3>
                    <p>{budget}</p>

                    <hr className='opacity-30' />

                    {type === 'movie' ?
                        post.release_date &&
                        <>
                            <h3 className='font-semibold text-lg my-1'>Data d'uscita</h3>
                            <p>{post.release_date}</p>
                        </> :
                        post.first_air_date || post.last_air_date ?
                            <>
                                <h3 className='font-semibold text-lg my-1'>Data primo/ultimo episodio</h3>
                                <p>{post.first_air_date + ' / ' + post.last_air_date}</p>
                            </> : !post.first_air_date || post.last_air_date ?
                                <>
                                    <h3 className='font-semibold text-lg my-1'>Data ultimo episodio</h3>
                                    <p>{post.last_air_date}</p>
                                </> : post.first_air_date || !post.last_air_date ?
                                    <>
                                        <h3 className='font-semibold text-lg my-1'>Data primo episodio</h3>
                                        <p>{post.first_air_date}</p>
                                    </> : ''
                    }

                    <hr className='opacity-30' />

                    {type === 'movie' ?
                        post.runtime &&
                        <>
                            <h3 className='font-semibold text-lg my-1'>Durata</h3>
                            <p>{post.runtime} minuti</p>
                        </> :
                        post.number_of_seasons && post.number_of_episodes ?
                            <>
                                <h3 className='font-semibold text-lg my-1'>Stagioni e Episodi</h3>
                                <p>{post.number_of_seasons + ' stagioni,'}</p>
                                <p>{post.number_of_episodes + ' episodi'}</p>
                            </> : post.number_of_seasons && !post.number_of_episodes ?
                                <>
                                    <h3 className='font-semibold text-lg my-1'>Stagioni</h3>
                                    <p>{post.number_of_seasons + ' stagioni,'}</p>
                                </> : !post.number_of_seasons && post.number_of_episodes ?
                                    <>
                                        <h3 className='font-semibold text-lg my-1'>Episodi</h3>
                                        <p>{post.number_of_episodes + ' episodi'}</p>
                                    </> : ''
                    }

                    <hr className='opacity-30' />

                    {crew.filter(member => member.known_for_department === 'Writing').length > 0 &&
                        <>
                            <h3 className='font-semibold text-lg my-1'>Scrittori</h3>
                            <ul>
                                {crew.filter(member => member.known_for_department === 'Writing').slice(0, 6).map((e, i) =>
                                    <li key={i}>{e.name}</li>
                                )}
                            </ul>
                        </>}

                    <hr className='opacity-30' />

                    {crew.filter(member => member.job === 'Producer').length > 0 &&
                        <>
                            <h3 className='font-semibold text-lg my-1'>Produttori</h3>
                            <ul>
                                {crew.filter(member => member.job === 'Producer').map((e, i) =>
                                    <li key={i}>{e.name}</li>
                                )}
                            </ul>
                        </>}
                </div>
            </div>

            {/* SEASONS DETTAILS */}
            {type === 'tv' &&
                <div className='flex items-baseline'>

                    {/* SEASONS */}
                    {season &&
                        <div className='p-10 font-semibold w-[100%]'>
                            <h2 className='font-extrabold text-4xl my-2'>Stagioni</h2>
                            <select name="seasons" id="seasons" className='mt-4 mb-6 cursor-pointer hover:bg-blue-200 p-0.5 rounded-xl border-2 border-emerald-500' value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                                <option>Stagioni</option>
                                {season.map(e =>
                                    <option key={e.name} value={e.name}>{e.name}</option>
                                )}
                            </select>
                            <label htmlFor="seasons" className='opacity-30 px-2'>scegli la tua stagione</label>

                            {season.filter(e => e.name === selectedSeason).map(e =>
                                <div key={e.name} className='flex gap-5'>
                                    <img src={'https://image.tmdb.org/t/p/w500' + e.poster_path} alt={e.name} className='w-[200px] rounded-xl' />
                                    <div className='flex flex-col justify-around'>
                                        {e.name &&
                                            <div>
                                                <h3 className='font-extrabold'>Stagione</h3>
                                                <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{e.name}</p>
                                            </div>}
                                        {e.episode_count &&
                                            <div>
                                                <h3 className='font-extrabold'>Episodi</h3>
                                                <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{e.episode_count + ' episodi'}</p>
                                            </div>}
                                        {e.air_date &&
                                            <div>
                                                <h3 className='font-extrabold'>Data</h3>
                                                <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{e.air_date}</p>
                                            </div>}
                                        <div>
                                            {e.overview ?
                                                <>
                                                    <h3>Trama</h3>
                                                    <p className='border-1 border-green-500 rounded-2xl p-1 text-center'>{e.overview}</p>
                                                </> : ''}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {season.slice(0, 1).map(e =>
                                <div key={e.name} className={`flex gap-5 ${selectedSeason ? 'hidden' : ''}`}>
                                    <img src={'https://image.tmdb.org/t/p/w500' + e.poster_path} alt={e.name} className='w-[200px] rounded-xl' />
                                    <div className='flex flex-col justify-around'>
                                        {e.name &&
                                            <div>
                                                <h3>Stagione</h3>
                                                <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{e.name}</p>
                                            </div>}
                                        {e.episode_count &&
                                            <div>
                                                <h3>Episodi</h3>
                                                <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{e.episode_count + ' episodi'}</p>
                                            </div>}
                                        {e.air_date &&
                                            <div>
                                                <h3>Data</h3>
                                                <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{e.air_date}</p>
                                            </div>}
                                        <div>
                                            {e.overview ?
                                                <>
                                                    <h3>Trama</h3>
                                                    <p className='border-1 border-green-500 rounded-2xl p-1 text-center'>{e.overview}</p>
                                                </> : ''}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>}

                    {/* EPISODES */}
                    {episode &&
                        <div className='w-[100%] p-10'>
                            <h2 className='font-extrabold text-4xl my-2'>Episodi</h2>
                            <select name="episodes" id="episodes" value={selectedEpisode} onChange={(e) => setSelectedEpisode(e.target.value)} className='mt-4 mb-6 cursor-pointer hover:bg-blue-200 p-0.5 rounded-xl border-2 border-emerald-500'>
                                <option>Episodi</option>
                                {episodeFiltered.map((e, i) =>
                                    <option value={i + 1}>{'Episodio ' + (i + 1)}</option>
                                ) ||
                                    episodeFiltered[0].map((e, i) =>
                                        <option value={i + 1}>{'Episodio ' + (i + 1)}</option>
                                    )}
                            </select>
                            <label htmlFor="episodes" className='opacity-30 px-2'>scegli l'episodio</label>

                            <div className='text-white'>
                                {episodeFiltered.filter((e, i) => (i + 1) == selectedEpisode).map(e =>
                                    <div key={e.id} id='episodes' className='flex gap-5 rounded-2xl' style={{ backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.6), rgba(1, 1, 22, 0.8)), url(${'https://image.tmdb.org/t/p/original' + e.still_path})` }}>
                                        <div className='px-4 lg:py-8 sm:py-6'>
                                            {e.episode_number &&
                                                <div>
                                                    <h3 className='font-extrabold'>Episodio
                                                        <span>{' ' + e.episode_number}</span>
                                                    </h3>
                                                </div>}
                                            <div className='flex items-center justify-between'>
                                                {e.name &&
                                                    <div>
                                                        <h3 className='font-extrabold'>Titolo</h3>
                                                        <p className='border-2 border-green-500 py-1 px-3 rounded-4xl'>{e.name}</p>
                                                    </div>}
                                                {e.runtime &&
                                                    <div className='grow-1 text-center max-w-[20%]'>
                                                        <h3 className='font-extrabold'>Durata</h3>
                                                        <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{e.runtime}</p>
                                                    </div>}
                                            </div>
                                            {e.air_date ?
                                                <div>
                                                    <h3 className='font-extrabold'>Data d'uscita</h3>
                                                    <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{e.air_date}</p>
                                                </div> : ''}
                                            {e.overview &&
                                                <div>
                                                    <h3 className='font-extrabold'>Trama</h3>
                                                    <p className='text-center border-2 border-green-500 p-2 rounded-4xl'>{e.overview}</p>
                                                </div>}
                                        </div>

                                    </div>
                                )}
                                {episode.slice(0, 1).map(e =>
                                    <div key={e.id} id='episodes' className={`flex gap-5 rounded-2xl ${selectedEpisode ? 'hidden' : ''}`} style={{ backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.65), rgba(1, 1, 22, 0.8)), url(${'https://image.tmdb.org/t/p/original' + e.still_path})` }}>
                                        <div className='px-4 lg:py-8 sm:py-6'>
                                            {e.episode_number &&
                                                <div>
                                                    <h3 className='font-extrabold'>Episodio
                                                        <span>{' ' + e.episode_number}</span>
                                                    </h3>
                                                </div>}
                                            <div className='flex items-center justify-between'>
                                                {e.name &&
                                                    <div>
                                                        <h3 className='font-extrabold'>Titolo</h3>
                                                        <p className='border-2 border-green-500 py-1 px-3 rounded-4xl'>{e.name}</p>
                                                    </div>}
                                                {e.runtime &&
                                                    <div className='grow-1 text-center max-w-[20%]'>
                                                        <h3 className='font-extrabold'>Durata</h3>
                                                        <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{e.runtime}</p>
                                                    </div>}
                                            </div>
                                            {e.air_date &&
                                                <div>
                                                    <h3 className='font-extrabold'>Data d'uscita</h3>
                                                    <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{e.air_date}</p>
                                                </div>}
                                            {e.overview &&
                                                <div>
                                                    <h3 className='font-extrabold'>Trama</h3>
                                                    <p className='text-center border-2 border-green-500 p-2 rounded-4xl'>{e.overview}</p>
                                                </div>}
                                        </div>

                                    </div>
                                )}

                            </div>
                        </div>}
                </div>
            }





        </>
    )
}
