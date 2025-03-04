import * as React from 'react'
import axios from 'axios'
const KEY = import.meta.env.VITE_API_KEY

// Placeholder
import videoPlaceholder from '../assets/VideoPlaceholder.webp'
import imagePlaceholder from '../assets/imagePlaceholder.jpg'

// Components
import Card from '../components/Card'
import BtnSwitchWord from '../components/BtnSwitchWord'

import HeroPage from '../components/HeroPage'
import TopRated from '../components/TopRated'
import TopCast from '../components/TopCast'
import FilteredGenres from '../components/FilteredGenres'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

// Context
import GlobalContext from '../context/GlobalContext'


export default function PopularMovie() {

    const { fetchSections, fetchMovies, fetchMedia, fetchUpComing, mobileWidth,
        showMoreMovies,
        currentDate,
        videoPrev,
        upComing } = React.useContext(GlobalContext)

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const [movies, setMovies] = React.useState([]) // fetch Movies

    const [page, setPage] = React.useState(1) // set Page
    const [totalPage, setTotalPage] = React.useState([]) // set Total Page
    const [comedyRow, setComedyRow] = React.useState([]) //set Comedy Row
    const [actionRow, setActionRow] = React.useState([]) //set Action Row
    const [adventureRow, setAdventureRow] = React.useState([]) //set Adventure Row
    const [horrorRow, setHorrorRow] = React.useState([]) //set Horror Row
    const [crimeRow, setCrimeRow] = React.useState([]) //set Crime Row
    const [romanceRow, setRomanceRow] = React.useState([]) //set Romance Page


    const [top5Votes, setTop5Votes] = React.useState([]) // set Top Rated
    const [backgroundVoteImage, setBackgroundVoteImage] = React.useState(''); // set Background Image

    const [cast, setCast] = React.useState([]) // set Cast
    const [top5Cast, setTop5Cast] = React.useState([]); // set Top 5 Cast

    const [backgroundUpComingImage, setBackgroundUpComingImage] = React.useState(''); // set Background Image

    const [playingVideo, setPlayingVideo] = React.useState(null); // set Playing Video
    const [viewMode, setViewMode] = React.useState('poster'); // set View Mode

    // Handle Top Cast
    function fetchCreditsId(movie_id) {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=dba9492b080738637f53df6bffa6b8c3`,
            params: { language: 'it-IT' },
        };

        axios
            .request(options)
            .then(res => {
                setCast(prevCast => {
                    const newCast = [...prevCast, ...res.data.cast]
                    // Remove duplicates
                    const uniqueCast = newCast.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
                    return uniqueCast;
                });
            })
            .catch(err => console.error('Error fetching credits:', err));
    }

    // Filtered Movies
    const actionMovies = filterMoviesByGenre(actionRow, 28)
    const comedyMovies = filterMoviesByGenre(comedyRow, 35)
    const adventureMovies = filterMoviesByGenre(adventureRow, 12)
    const horrorMovies = filterMoviesByGenre(horrorRow, 27)
    const crimeMovies = filterMoviesByGenre(crimeRow, 80)
    const romanceMovies = filterMoviesByGenre(romanceRow, 10749)

    // Array of filters
    const filtersGenres = [
        { title: 'Azione', movies: actionMovies, set: setActionRow },
        { title: 'Commedia', movies: comedyMovies, set: setComedyRow },
        { title: 'Avventura', movies: adventureMovies, set: setAdventureRow },
        { title: 'Horror', movies: horrorMovies, set: setHorrorRow },
        { title: 'Crime', movies: crimeMovies, set: setCrimeRow },
        { title: 'Romantico', movies: romanceMovies, set: setRomanceRow }
    ];

    // Global fetch
    React.useEffect(() => {
        fetchMovies('movie', page, setMovies, setTotalPage, fetchCreditsId) // handle home page movies
        fetchSections('movie', 'top_rated', setTop5Votes) // handle top rated 
        filtersGenres.forEach(genre => {
            return fetchMovies('movie', Math.floor(Math.random() * 10) + 1, genre.set) // handle genres movies
        })

        document.documentElement.scrollTop = 0

    }, [page])

    // Top Cast fetch
    React.useEffect(() => {
        // Filter for Casting
        const sortedCast = cast
            .sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity)) // Sort in descending order by popularity
            .slice(0, 10); // Get the top 5 elements
        setTop5Cast(sortedCast);
    }, [cast]);

    // Up Coming fetch
    React.useEffect(() => {
        fetchUpComing({ init: 0, fin: 5, type: 'movie' });
    }, [currentDate]);

    // Function to filter movies by genre
    function filterMoviesByGenre(movies, genreId) {
        return movies.filter(movie => movie.genre_ids.includes(genreId));
    }

    // Get the backdrop_path of the first element in up coming
    const backdropComingPath = upComing.length > 0 ? upComing[0].backdrop_path : '';
    const posterComingPath = upComing.length > 0 ? upComing[0].poster_path : '';

    // Back top after click
    function BackTop() {
        document.documentElement.scrollTop = 0
    }

    return (
        <>
            {/* POPULARs */}
            <HeroPage type={'Film'} check={'movie'} myArray={movies} />
            {/* PAGINATION */}
            {showMoreMovies &&
                <ul className='flex justify-center items-center gap-3 mt-3 mb-6 sm:my-15'>
                    {totalPage.slice(0, 5).map((e, i) => {
                        const pageNum = i + 1
                        return <li key={i}>
                            <button type='button' onClick={() => { setPage(pageNum), BackTop() }} className={`p-4 bg-blue-500 cursor-pointer rounded-md text-white hover:bg-amber-300 ${page == pageNum ? 'outline-2 outline-offset-3 outline-blue-500' : ''} active:bg-blue-700`}>{pageNum}</button>
                        </li>
                    })}
                </ul>}

            {/* FILTERED GENRES */}
            <FilteredGenres myArray={filtersGenres} check={'movie'} init={0} finish={3} />

            {/* TOP RATED */}
            <TopRated myArray={top5Votes} check={'movie'} set={fetchMedia} backgroundVoteImage={backgroundVoteImage} setBackgroundImage={setBackgroundVoteImage} />

            {/* TOP CAST */}
            <TopCast myArray={top5Cast} title={'Top cast'} />

            {/* FILTERED GENRES */}
            <FilteredGenres myArray={filtersGenres} check={'movie'} init={3} finish={6} />

            {/* UP COMING */}
            <section className='popular relative mb-17' >
                <div className='votes relative py-70 sm:py-100' id='upComing'
                    style={{ backgroundImage: `linear-gradient(rgba(21, 26, 102, 0.78), rgba(21, 26, 102, 0.6)), url(${backgroundUpComingImage || `https://image.tmdb.org/t/p/original${mobileWidth ? posterComingPath : backdropComingPath}`})` }}></div>
                <div className={`flex sm:justify-center mb-5 btnSwitch text-white w-full`}>
                    {!mobileWidth ?
                        <BtnSwitchWord text1={'poster'} set1={() => setViewMode('poster')}
                            text2={'trailer'} set2={() => setViewMode('trailer')}
                            class={'flex justify-center gap-10'}
                            styleSelected={'bg-green-500'} /> : ''}
                </div>
                <div className='contain-top5 absolute'>
                    <div className={`flex items-center overflow-y-hidden pb-8 justify-baseline xl:justify-center sm:px-5 ${mobileWidth ? 'overflow-x-scroll gap-3 px-3' : 'gap-4'}`}>
                        {upComing.map((e, i) => {
                            const video = videoPrev.find(video => video.movie_id === e.id);
                            return viewMode === 'poster' ? (
                                <Card key={i}
                                    type='movie'
                                    item={e}
                                    image={e.poster_path ? path_img + e.poster_path : imagePlaceholder}
                                    media_name={!e.poster_path ? true : false}
                                    titled={e.title}
                                    styleCard={mobileWidth ? 'w-[180px]' : 'w-[240px]'}
                                    styleImg={mobileWidth ? 'w-[240px]' : 'w-xs h-[350px]'}
                                    overviewLong={e.overview}
                                    onMouseEnter={() => fetchMedia(e.id, 'movie', setBackgroundUpComingImage, () => { })}
                                />
                            ) : (
                                <div key={i} className="relative flex flex-wrap w-[350px] h-[200px] transform transition-transform duration-300 hover:scale-102">
                                    <div onMouseEnter={() => fetchMedia(e.id, 'movie', setBackgroundUpComingImage, () => { })}>
                                        <img
                                            src={e.backdrop_path ? `https://image.tmdb.org/t/p/original${e.backdrop_path}` : videoPlaceholder}
                                            alt={e.title}
                                            className="w-full h-full object-cover object-center rounded-xl"
                                        />
                                        <div
                                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                            onClick={() => setPlayingVideo(video ? video.key : null)}
                                        >
                                            <FontAwesomeIcon icon={faPlay} size="3x" color="white" className='transform transition-transform duration-300 hover:scale-110' />
                                        </div>
                                    </div>
                                    {playingVideo === video?.key && (
                                        <iframe
                                            width="350"
                                            height="200"
                                            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                                            title="YouTube video player"
                                            allow="accelerometer; clipboard-write; autoplay; encrypted-media; gyroscope; picture-in-picture; controls"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full rounded-xl"
                                            onMouseEnter={() => fetchMedia(e.id, 'movie', setBackgroundUpComingImage)}
                                        ></iframe>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {!mobileWidth ?
                    <div className="title-container-upComing">
                        <h1 className="title-3d-upComing">coming soon</h1>
                    </div> :
                    <div className="title-container-upComing">
                        <h1 className="coming-3d-upComing-mobile">coming </h1>
                        <h1 className="soon-3d-upComing-mobile">soon</h1>
                    </div>
                }
            </section>
        </>
    )
}

