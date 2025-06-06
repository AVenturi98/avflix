import * as React from 'react'
import axios from 'axios'
const KEY = import.meta.env.VITE_API_KEY
import { Link, useParams, useNavigate } from 'react-router'

// Components
import BtnSwitchWord from '../components/BtnSwitchWord'
import ImageCollage from '../components/image-collage/ImagesCollage'
import FilteredSection from '../components/FilteredSection'
import Episodes from '../components/Episodes'
import Spinner from '../components/Spinner' // Import the Spinner component

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faStar,
    faStarHalfStroke,
    faStarHalf
} from '@fortawesome/free-solid-svg-icons'
import { faStar as empty } from '@fortawesome/free-regular-svg-icons'

// Context
import GlobalContext from '../context/GlobalContext'

// Lazy Loader
import LazyLoader from '../components/LazyLoader'

export default function Show({ type }) {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { fetchCreditsId, fetchMedia, fetchVideos, mobileWidth, fetchSectionID, fetchUpComing,
        cast,
        crew,
        videos,
        currentDate,
        upComing,
        titleSlug,
        theme,
        overTextLong,
        readMore, setReadMore } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([]) // set Post
    const [company, setCompany] = React.useState([]) // set Company
    const [country, setCountry] = React.useState([]) // set Country
    const [genres, setGenres] = React.useState([]) // set Genre


    const [viewMode, setViewMode] = React.useState('immagini'); // set View Mode
    const [img, setImg] = React.useState([]) // set Images

    const [season, setSeason] = React.useState([]) // set Seasons
    const [selectedSeason, setSelectedSeason] = React.useState('') // set Show Selected Season
    const [episode, setEpisode] = React.useState([]) // set Show Episode

    const [similar, setSimilar] = React.useState([]) // Set Similar Content
    const [recommendations, setRecommendations] = React.useState([]) // Set Recommendations Content


    const [arrowMore, setArrowMore] = React.useState(false)
    const [loading, setLoading] = React.useState(true) // Add loading state

    const [idWatch, setIdWatch] = React.useState('') // Get Id Watch
    const [slug, setSlug] = React.useState('') // Get Slug



    const { id } = useParams()
    const navigate = useNavigate()

    // Globla fetch
    function fetchMovieId() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}?api_key=dba9492b080738637f53df6bffa6b8c3`,
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
                // console.log('Show Page', res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetch movie to Show Page', err);
                navigate('/not-found')
                setLoading(false)

            })
    }

    const seasonNumber = selectedSeason.replace(/\D/g, "") // set Season Number

    // Seasons-Episodes fetch (only tv)
    function fetchEpisodes() {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber || 1}?api_key=dba9492b080738637f53df6bffa6b8c3`, {
            params: {
                language: 'it-IT'
            }
        })
            .then(res => {
                setEpisode(res.data.episodes)
                // console.log('Episodi', res.data)
            })
            .catch(err => {
                console.log('Error fetch episodes to Show Page', err)
            })
    }

    // Fetch get id watch
    function fetchWatchId() {
        axios.get(`http://localhost:3033/${id}}`)
            .then(res => {
                setIdWatch(res.data.map(e => e.id_watch));
                setSlug(res.data.map(e => e.title_slug))
                // console.log('Fetch watch id', res.data.map(e => e.title_slug))
            })
            .catch(err => {
                console.log('Error fetch watch id', err)
            })
    }

    React.useEffect(() => {

        fetchMovieId()
        fetchCreditsId(type, id)
        fetchMedia(id, type, () => { }, setImg, () => { })
        fetchVideos(type, id, () => { })
        fetchSectionID(type, id, 'similar', setSimilar) // handle similar content
        fetchSectionID(type, id, 'recommendations', setRecommendations) // handle recommendations content

        fetchWatchId()

        document.documentElement.scrollTop = 0

    }, [id])


    // effettuo la chiamata solo se il type è relativo a tv

    React.useEffect(() => {
        {
            type === 'tv' &&
                fetchEpisodes()
        }

    }, [selectedSeason])

    React.useEffect(() => {
        {
            type === ' movie' &&
                fetchUpComing({ init: 0, fin: 10, type })
        } // Coming Soon Movies

    }, [id, upComing])

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

    if (loading) {
        return <Spinner /> // Show spinner while loading
    }



    return (
        <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
            {/* HERO SHOW */}
            <section id='hero-show' className={`relative max-w-screen mb-10 2xl:px-50 py-10 sm:py-20 lg:py-40 flex items-start flex-wrap sm:flex-nowrap ${mobileWidth ? 'justify-center gap-5 px-5' : 'px-15'} bg-gray-100 shadow-lg`}
                style={{ backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.7), rgba(1, 1, 22, 0.9)), url(https://image.tmdb.org/t/p/original${post.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -99 }}>
                <img className='w-full sm:w-48 md:w-60 lg:w-80 h-auto rounded-lg shadow-lg shadow-gray-600'
                    src={post.poster_path && !mobileWidth ? path_img + post.poster_path
                        : post.backdrop_path && mobileWidth ? path_img + post.backdrop_path
                            : !post.poster_path || !post.backdrop_path ? '/placeholder/moviesPlaceholder.png' : ''} alt={post.original_title || post.name} />
                <div className='sm:ml-10 text-white flex flex-col gap-8 justify-start w-full sm:w-200'>
                    <h1 className='text-5xl text-white font-extrabold mt-5 mb-2'>{post.original_title || post.name}</h1>
                    <div className='flex items-center justify-between grow-1'>
                        {company.length > 0 && <div className='text-lg text-white mb-4'>{company[0].name}</div>}
                        {!isNaN(vote) &&
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
                            </div>}
                    </div>
                    <div className='flex gap-5'>
                        <div>
                            {!undefined && post.release_date ?
                                new Date(post.release_date).toLocaleDateString() :
                                !undefined && post.first_air_date || post.last_air_date ?
                                    new Date(post.first_air_date).toLocaleDateString() + ' - ' + new Date(post.last_air_date).toLocaleDateString() : ''}
                        </div>
                        -
                        <div>
                            {post.runtime || post.number_of_episodes ? <FontAwesomeIcon icon={faClock} /> : ''}

                            {type === 'movie' && post.runtime ?
                                ' ' + post.runtime + "'"
                                : type === 'tv' && post.number_of_episodes ?
                                    ' ' + post.number_of_episodes + ' episodi' : ''}
                        </div>
                    </div>
                    <div>{post.overview && !undefined || !null ? post.overview : ''}</div>
                    {genres &&
                        <div className='flex flex-wrap gap-1'>
                            {genres.map((e, index) =>
                                <span key={e.id} className='italic text-amber-100 px-3 py-1 rounded-full text-md'>
                                    {e.name}{index < genres.length - 1 && ' - '}
                                </span>
                            )}
                        </div>}
                </div>
                {post.release_date > currentDate ?
                    <div className='absolute w-full flex justify-center top-2 left-0'>
                        <h1 className='text-6xl uppercase coming-show' >coming soon</h1>
                    </div> : ''
                }
            </section>

            {/* CONTENT */}
            <section className='flex flex-wrap'>

                {/* IMAGES e VIDEO */}
                <div className={`${mobileWidth ? 'px-5 w-full' : 'px-10 w-[70%]'} grow-1`}>
                    <div className='flex flex-col'>
                        <div className='pb-5'>
                            <BtnSwitchWord
                                text1={'immagini'}
                                set1={() => setViewMode('immagini')}
                                text2={'video'}
                                set2={() => setViewMode('video')}
                                styleSelected={'bg-green-500'} />
                        </div>

                        {/* IMMAGINI */}
                        {viewMode === 'immagini' && img.length > 3 ?
                            <ImageCollage images={collageImages} />
                            : viewMode === 'immagini' && img.length < 4 &&
                            'Non disponibile'}

                        {/* VIDEO */}
                        {viewMode === 'video' && videos ?
                            <div className='relative w-full max-w-lg'>
                                <iframe
                                    width='100%'
                                    height="300px"
                                    src={`https://www.youtube.com/embed/${videos.key}`}
                                    title={videos.key}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className='rounded-lg'
                                ></iframe>
                            </div> : viewMode === 'video' && !videos &&
                            'Non disponibile'}
                        <div className='flex gap-2'>
                            <div className={`${theme === 'dark' ? 'contain-btn-dettails-dark' : 'contain-btn-dettails'} w-[47%] sm:w-[30%] text-center my-3`}>
                                <Link to={`/${type}/${id}/dettails/${viewMode === 'immagini' ? 'media' : 'video'}`} >
                                    <p>Vedi tutto</p>
                                </Link>
                            </div>
                            {/* <div className={`${theme === 'dark' ? 'contain-btn-dettails-dark' : 'contain-btn-dettails'} w-[47%] sm:w-[30%] text-center my-3`}>
                                <Link to={`https://streamingcommunity.airforce/watch/${idWatch}${slug ? '-' + slug : ''}`} >
                                    <p>guarda ora </p>
                                </Link>
                            </div> */}
                        </div>
                    </div>

                    {/* CAST */}
                    {cast.length > 0 &&
                        <div className={`${mobileWidth ? 'pt-12 pb-3' : 'py-15'}`}>
                            <h3 className={`${mobileWidth ? 'mb-2 px-1' : 'mb-8 px-8'} flex items-center gap-5`}>
                                <p className='text-4xl font-bold'>Cast & Crew</p>
                                <span className='flex items-baseline hover:text-gray-500 ' >
                                    <Link to={`/${type}/${id}/dettails/crew`} onMouseOver={() => setArrowMore(true)} onMouseOut={() => setArrowMore(false)} >
                                        vedi tutti <span className={`arrow-show-more ${arrowMore ? 'visible' : ''}`}>&gt; </span>
                                    </Link >
                                </span>
                            </h3>
                            <div className='flex items-center gap-8 p-3 overflow-x-auto pr-29' style={{
                                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 1%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                            }}>
                                {cast.slice(0, 10).map(e =>
                                    <Link to={`/person/${e.id}` + '-' + titleSlug(e.name)} key={e.id}>
                                        <div className='flex flex-col items-center'>
                                            <LazyLoader image={e.profile_path ? 'https://image.tmdb.org/t/p/w500' + e.profile_path : '/placeholder/PersonPlaceholder.png'}
                                                style={`${mobileWidth ? 'min-w-30 min-h-30 max-w-30 max-h-30' : 'min-w-50 min-h-50 max-w-50 max-h-50'} rounded-full shadow-lg shadow-black object-cover`} />
                                            <div className='mt-2 text-center text-lg font-bold h-18'>{e.name}</div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>}
                </div>

                {/* DETTAILS */}
                <aside className='px-10'>
                    <h1 className='font-extrabold text-2xl my-3'>Dettagli</h1>

                    <hr className='opacity-30' />

                    {post.original_title || post.original_name ?
                        <>
                            <h3 className='font-semibold text-lg my-1'>Titolo Originale</h3>
                            <p>{post.original_title || post.original_name}</p>
                        </> : !post.original_title || !post.original_name && post.title || post.name ?
                            <>
                                <h3 className='font-semibold text-lg my-1'>Titolo</h3>
                                <p>{post.title || post.name}</p>
                            </> : !post.original_title || !post.original_name && !post.title || !post.name ?
                                'Non disponibile' : ''}

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
                                    <li key={e.id}>{e.name}</li>
                                )}
                            </ul>
                        </>}

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Budget</h3>
                    <p>{budget}</p>

                    <hr className='opacity-30' />

                    {type === 'movie' &&
                        post.release_date ?
                        <>
                            <h3 className='font-semibold text-lg my-1'>Data d'uscita</h3>
                            <p>{new Date(post.release_date).toLocaleDateString()}</p>
                        </> :
                        post.first_air_date || post.last_air_date && !undefined && !null && !isNaN(post.first_air_date) && !isNaN(post.last_air_date) ?
                            <>
                                <h3 className='font-semibold text-lg my-1'>Data primo/ultimo episodio</h3>
                                <p>{new Date(post.first_air_date).toLocaleDateString() + ' - ' + new Date(post.last_air_date).toLocaleDateString()}</p>
                            </> : !post.first_air_date || post.last_air_date && !undefined && !null && !isNaN(post.last_air_date) ?
                                <>
                                    <h3 className='font-semibold text-lg my-1'>Data ultimo episodio</h3>
                                    <p>{post.last_air_date}</p>
                                </> : post.first_air_date || !post.last_air_date && !undefined && !null && !isNaN(post.first_air_date) ?
                                    <>
                                        <h3 className='font-semibold text-lg my-1'>Data primo episodio</h3>
                                        <p>{post.first_air_date}</p>
                                    </> : 'Non disponibile'
                    }

                    <hr className='opacity-30' />

                    {type === 'movie' &&
                        post.runtime && !undefined && !null && !isNaN(post.runtime) ?
                        <>
                            <h3 className='font-semibold text-lg my-1'>Durata</h3>
                            <p>{post.runtime} minuti</p>
                        </> :
                        post.number_of_seasons && post.number_of_episodes && !undefined && !null && !isNaN(post.number_of_seasons) && !isNaN(post.number_of_episodes) ?
                            <>
                                <h3 className='font-semibold text-lg my-1'>Stagioni e Episodi</h3>
                                <p>{post.number_of_seasons + ' stagioni,'}</p>
                                <p>{post.number_of_episodes + ' episodi'}</p>
                            </> : post.number_of_seasons && !post.number_of_episodes && !undefined && !null && !isNaN(post.post.number_of_seasons) ?
                                <>
                                    <h3 className='font-semibold text-lg my-1'>Stagioni</h3>
                                    <p>{post.number_of_seasons + ' stagioni'}</p>
                                </> : !post.number_of_seasons && post.number_of_episodes && !undefined && !null && !isNaN(post.number_of_episodes) ?
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
                </aside>
            </section >

            {/* SEASONS DETTAILS */}
            < section className={`relative my-14 ${readMore && !mobileWidth && 'bg-[rgba(20,20,20,0.8)]'} `}>
                {type === 'tv' &&
                    <>
                        <h2 className='font-extrabold text-4xl my-2'>Esplora la serie</h2>
                        <div className='flex items-baseline flex-wrap lg:flex-nowrap'>

                            {/* SEASONS */}
                            {season &&
                                <div className={selectedSeason ? `w-full p-2 font-semibold` : 'w-[70%] p-1 sm:p-2'}>
                                    <h2 className='font-extrabold text-3xl my-2'>Stagioni</h2>
                                    <select disabled={!season.length > 0} name="seasons" id="seasons"
                                        className='mt-4 mb-6 cursor-pointer hover:bg-blue-200 p-0.5 rounded-xl border-2 border-emerald-500'
                                        value={selectedSeason}
                                        onChange={(e) => setSelectedSeason(e.target.value)}>
                                        <option>{season.length > 0 ? 'Stagioni' : 'Non disponible'}</option>
                                        {season.map(e =>
                                            <option key={e.id} value={e.name}>{e.name}</option>
                                        )}
                                    </select>
                                    <label htmlFor="seasons" className='opacity-30 px-2'>{mobileWidth ? 'scegli' : 'scegli la tua stagione'}</label>

                                    {season.filter(e => e.name === selectedSeason).map(e =>
                                        <div key={e.id} className={`flex gap-5 ${mobileWidth ? 'text-white' : ''}`}>
                                            {!mobileWidth ?
                                                <img src={e.poster_path ? 'https://image.tmdb.org/t/p/w500' + e.poster_path : '/placeholder/moviesPlaceholder.png'} alt={e.name} className={`w-[250px] h-[350px] rounded-xl ${readMore && !mobileWidth && 'z-[-99]'}`} /> : ''}
                                            <div className='flex flex-col justify-around rounded-xl p-3' id='seasons'
                                                style={mobileWidth ? { backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.6), rgba(1, 1, 22, 0.8)), url(${e.poster_path ? 'https://image.tmdb.org/t/p/w500' + e.poster_path : ''})`, minWidth: '320px', minHeight: '300px' } : undefined}>
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
                                                        <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{new Date(e.air_date).toLocaleDateString()}</p>
                                                    </div>}
                                                {e.overview &&
                                                    <div>
                                                        <h3 className='font-extrabold'>Trama</h3>
                                                        <p className='text-center border-2 border-green-500 p-2 rounded-4xl'>{!mobileWidth && e.overview.length > 50 ? overTextLong(e.overview, 50) + ' ' : e.overview}
                                                            {!mobileWidth &&
                                                                <span className='text-green-400'>
                                                                    <button type="button" onClick={() => setReadMore(true)}> leggi tutto</button>
                                                                </span>}
                                                        </p>

                                                        {readMore && !mobileWidth &&
                                                            <div className='center_position bg-amber-400 w-[80%] h-[80%] rounded-md flex justify-center items-center'>
                                                                <button type="button" onClick={() => setReadMore(false)} className='absolute top-2 right-2 text-red-500'>X</button>
                                                                <div className='flex flex-col gap-3 p-3'>
                                                                    <h1 className='text-center font-bold'>Trama: {e.name}</h1>
                                                                    <hr />
                                                                    <p>{e.overview}</p>
                                                                </div>
                                                            </div>}
                                                    </div>}
                                            </div>
                                        </div>
                                    )}

                                    {season.slice(0, 1).map(e =>
                                        <div key={e.name} className={`flex gap-5 ${selectedSeason ? 'hidden' : ''}`}>
                                            <img src={e.poster_path ? 'https://image.tmdb.org/t/p/w500' + e.poster_path : '/placeholder/moviesPlaceholder.png'} alt={e.name} className={`w-[250px] h-[350px] rounded-xl ${readMore && !mobileWidth && 'z-[-99]'}`} />
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
                                                        <p className='border-1 border-green-500 rounded-4xl p-1.5 text-center'>{new Date(e.air_date).toLocaleDateString()}</p>
                                                    </div>}
                                            </div>
                                        </div>
                                    )}
                                </div>}

                            {/* EPISODES */}
                            <Episodes
                                id={id}
                                type={type}
                                episodeFiltered={episodeFiltered}
                                selectedSeason={selectedSeason}
                                seasonNumber={seasonNumber} />
                        </div>
                    </>
                }
            </section >

            {/* UP COMING if is it Up Coming Movie */}
            {upComing && post.release_date > currentDate && type === 'movie' ?
                < FilteredSection myArray={upComing} type={type} title={'In arrivo'} /> : ''}

            {/* SIMILAR  */}
            < FilteredSection myArray={similar} type={type} title={'Correlati'} />

            {/* RECOMMENDATIONS */}
            < FilteredSection myArray={recommendations} type={type} title={'Suggeriti'} />

            {/* UP COMING if not Up Coming Movie */}
            {upComing && post.release_date < currentDate && type === 'movie' ?
                < FilteredSection myArray={upComing} type={type} title={'In arrivo'} /> : ''}
        </div>
    )
}
