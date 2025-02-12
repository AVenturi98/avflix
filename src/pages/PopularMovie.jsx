import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'

// Components
import Card from '../components/Card'
import Carousel from '../components/carousel/Carousel'
import BtnSwitchWord from '../components/BtnSwitchWord'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

// Context
import { useWindowWidth } from '../context/WindowContext'


export default function PopularMovie() {

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

    const [now_playing, setNow_playing] = React.useState([]); // set Now to Theatres

    const [upComing, setUpComing] = React.useState([]); // set Up Coming
    const [date, setDate] = React.useState([])// set Upcomings Date

    const [backgroundUpComingImage, setBackgroundUpComingImage] = React.useState(''); // set Background Image

    const [videos, setVideos] = React.useState([]); // set Videos
    const [playingVideo, setPlayingVideo] = React.useState(null); // set Playing Video
    const [viewMode, setViewMode] = React.useState('poster'); // set View Mode




    // Set Buttons
    const [showMore, setShowMore] = React.useState(false) //set Show More



    function fetchMovies(indexPage, set) {
        axios.get(`https://api.themoviedb.org/3/movie/popular${KEY}`, {
            params: {
                language: 'it-IT',
                page: indexPage
            },
        })
            .then(res => {
                set(res.data.results);
                setTotalPage(new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'))
                // console.log(res)
                res.data.results.forEach(movie => fetchCreditsId(movie.id));// Fetch credits for each movie
            })
            .catch(err => {
                setTotalPage([])
                console.log(err)
            })
    }


    // Handle images
    function fetchImages(movie_id, section, setImg) {
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/${section}${KEY}`)
            .then(res => {
                if (res.data.backdrops.length > 0) {
                    setImg(`https://image.tmdb.org/t/p/original${res.data.backdrops[0].file_path}`)
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    // Handle Top Cast
    function fetchCreditsId(movie_id) {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movie_id}/credits${KEY}`,
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
            .catch(err => console.error(err));
    }

    // Handle For Section
    function fetchSections(section, set, page) {
        axios.get(`https://api.themoviedb.org/3/movie/${section}${KEY}`, {
            params: {
                language: 'it-IT',
                page: page
            },
        })
            .then(res => {
                set(prev => [...prev, ...res.data.results])
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Handle Videos
    function fetchVideos(movie_id) {
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos${KEY}`)
            .then(res => {
                setVideos(prevVideos => {

                    const newVideos = [...prevVideos, ...res.data.results.map(video => ({ ...video, movie_id: res.data.id }))]
                    // Remove duplicates
                    const uniqueVideos = newVideos.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
                    return uniqueVideos;
                });
                // console.log(res.data)
            })
            .catch(err => console.error(err));
    }

    // Filtered Movies
    const actionMovies = filterMoviesByGenre(actionRow, 28)
    const comedyMovies = filterMoviesByGenre(comedyRow, 35)
    const adventureMovies = filterMoviesByGenre(adventureRow, 12)
    const horrorMovies = filterMoviesByGenre(horrorRow, 27)
    const crimeMovies = filterMoviesByGenre(crimeRow, 80)
    const romanceMovies = filterMoviesByGenre(romanceRow, 12)


    // Array of filters
    const filtersGenres = [
        { title: 'Azione', movies: actionMovies, set: setActionRow },
        { title: 'Commedia', movies: comedyMovies, set: setComedyRow },
        { title: 'Avventura', movies: adventureMovies, set: setAdventureRow },
        { title: 'Horror', movies: horrorMovies, set: setHorrorRow },
        { title: 'Crime', movies: crimeMovies, set: setCrimeRow },
        { title: 'Romantico', movies: romanceMovies, set: setRomanceRow }
    ];

    React.useEffect(() => {
        fetchMovies(page, setMovies) // handle home page movies
        fetchSections('top_rated', setTop5Votes) // handle top rated 
        filtersGenres.forEach(genre => {
            return fetchMovies(Math.floor(Math.random() * 10) + 1, genre.set) // handle genres movies
        })

    }, [page])

    React.useEffect(() => {
        // Filter for Casting
        const sortedCast = cast
            .sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity)) // Sort in descending order by popularity
            .slice(0, 10); // Get the top 5 elements
        setTop5Cast(sortedCast);
    }, [cast]);


    React.useEffect(() => {
        // Check and print dates greater than current date
        const currentDate = new Date().toISOString().split('T')[0];

        function fetchUpComing() {
            let allUpComing = [];
            for (let i = 1; i <= 10; i++) {
                axios.get(`https://api.themoviedb.org/3/movie/upcoming${KEY}`, {
                    params: {
                        language: 'it-IT',
                        page: i
                    },
                })
                    .then(res => {
                        const filtered = res.data.results.filter(movie => movie.release_date > currentDate);
                        allUpComing = [...allUpComing, ...filtered];
                        // Remove duplicates
                        allUpComing = allUpComing.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                        if (allUpComing.length >= 5) {
                            setUpComing(allUpComing.slice(0, 5));
                            allUpComing.forEach(movie => fetchVideos(movie.id)); // Fetch videos for each upcoming movie
                            return;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

        fetchUpComing();

    }, [date]);

    // Back top after click
    function BackTop() {
        document.documentElement.scrollTop = 0
    }


    // Toggle elements
    function open(set) {
        set(true)
    }
    function close(set) {
        set(false)
    }



    // Function to filter movies by genre
    function filterMoviesByGenre(movies, genreId) {
        return movies.filter(movie => movie.genre_ids.includes(genreId));
    }


    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640


    // Get the backdrop_path of the first element in top5Votes || up coming
    const backdropVotesPath = top5Votes.length > 0 ? top5Votes[0].backdrop_path : '';
    const posterVotesPath = top5Votes.length > 0 ? top5Votes[0].poster_path : '';
    const backdropComingPath = upComing.length > 0 ? upComing[0].backdrop_path : '';
    const posterComingPath = upComing.length > 0 ? upComing[0].poster_path : '';


    return (
        <>
            {/* POPULARs */}
            <section className='flex justify-center'>
                <div className='container'>
                    <h1 className='text-4xl font-bold mb-5'>Film Popolari</h1>
                    {!showMore &&
                        <button type='button' onClick={() => open(setShowMore)} className="cta flex justify-center items-center">
                            <span>Mostra di più</span>
                            <svg width="15px" height="10px" viewBox="0 0 13 10">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </button>}
                    <div className={!showMore ? 'flex items-center gap-5 overflow-x-auto overflow-y-hidden pb-5' : 'flex justify-center items-center gap-2 flex-wrap'}>
                        {!showMore ?
                            movies.slice(0, 10).map(e =>
                                <Card key={e.id}
                                    type='movie'
                                    item={e}
                                    image={path_img + e.poster_path}
                                    language={true}
                                    stars={true}
                                    overviewSmall={e.overview}
                                    styleCard={'w-[240px]'}
                                    styleImg={'w-xs h-[350px]'} />
                            )
                            :
                            movies.map(e =>
                                <Card key={e.id}
                                    type='movie'
                                    item={e}
                                    image={path_img + e.poster_path}
                                    language={true}
                                    stars={true}
                                    overviewSmall={e.overview}
                                    styleCard={mobileWidth ? 'w-[150px]' : 'w-[240px]'}
                                    styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-xs h-[350px]'} />
                            )}
                    </div>
                    <div className='flex justify-center items-center mt-9' >
                        {showMore &&
                            <button type='button' onClick={() => { close(setShowMore), BackTop() }} className="cta cta-back flex justify-center items-center">
                                <span>Mostra di meno</span>
                                <svg width="15px" height="10px" viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>}
                    </div>

                    {/* PAGINATION */}
                    {showMore &&
                        <ul className='flex justify-center items-center gap-3 my-15'>
                            {totalPage.slice(0, 5).map((e, i) => {
                                // console.log('page', e, i)
                                const pageNum = i + 1
                                return <li key={i}>
                                    <button type='button' onClick={() => { setPage(pageNum), BackTop() }} className={`p-4 bg-blue-500 cursor-pointer rounded-md text-white hover:bg-amber-300 ${page == pageNum ? 'outline-2 outline-offset-3 outline-blue-500' : ''} active:bg-blue-700`}>{pageNum}</button>
                                </li>
                            }
                            )}
                        </ul>}
                </div >
            </section>

            {/* FILTERED GENRES */}
            <section className="filtered-genres-container">
                {filtersGenres.slice(0, 3).map(filter => (
                    filter.movies.length > 5 &&
                    <div className="filtered-genres-content mb-10" key={filter.title}>
                        <h2 className='filtered-genres-title text-4xl font-bold my-6'>{filter.title}</h2>
                        <div className='flex items-center gap-2 sm:gap-5 overflow-x-auto overflow-y-hidden pb-8'>
                            {filter.movies.slice(0, 10).map(e =>
                                <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} language={true} stars={true} styleCard={mobileWidth ? 'w-[150px]' : 'w-[200px]'} styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-[200px] h-[300px]'} />
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {/* BACK IMG */}
            <section className='relative mb-17' id='popular'>
                <div id='votes' className='relative' style={{ backgroundImage: `linear-gradient(rgba(21, 26, 102, 0.78), rgba(21, 26, 102, 0.6)), url(${backgroundVoteImage || `https://image.tmdb.org/t/p/original${mobileWidth ? posterVotesPath : backdropVotesPath}`})` }}></div>
                <div className='contain-top5 absolute'>
                    <div className={`flex items-center overflow-y-hidden pb-8 ${mobileWidth ? 'overflow-x-scroll gap-3 px-3' : 'justify-center gap-8'}`}>
                        {top5Votes.slice(0, 5).map((e, i) => (
                            <Card key={i}
                                type='movie'
                                item={e}
                                image={path_img + e.poster_path}
                                styleCard={mobileWidth ? 'w-[180px]' : 'w-[240px]'}
                                styleImg={mobileWidth ? 'w-[240px]' : 'w-xs h-[350px]'}
                                backdrop={e.backdrop_path}
                                votes={true}
                                onMouseEnter={() => fetchImages(e.id, 'images', setBackgroundVoteImage)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* TOP CAST */}
            <section id='contain-top-cast'>
                <h2 className='text-4xl font-bold my-6'>Top Cast</h2>
                <div className='flex justify-center items-center gap-2 sm:gap-8 overflow-y-hidden pb-8'>
                    <Carousel images={top5Cast} />
                </div>
            </section>

            {/* To CINEMA */}
            <section className="filtered-genres-container">
                <div className="filtered-genres-content mb-10">
                    <h2 className='filtered-genres-title text-4xl font-bold my-6'>Al Cinema</h2>
                    <div className='flex items-center gap-2 sm:gap-5 overflow-x-auto overflow-y-hidden pb-8'>
                        {now_playing.map(e =>
                            <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} language={true} stars={true} styleCard={mobileWidth ? 'w-[150px]' : 'w-[200px]'} styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-[200px] h-[300px]'} />
                        )}
                    </div>
                </div>
            </section>

            {/* UP COMING */}
            <section className='relative mb-17' id='popular'>
                <div id='votes' className='relative' style={{ backgroundImage: `linear-gradient(rgba(21, 26, 102, 0.78), rgba(21, 26, 102, 0.6)), url(${backgroundUpComingImage || `https://image.tmdb.org/t/p/original${mobileWidth ? posterComingPath : backdropComingPath}`})` }}></div>
                <div className='flex justify-center mb-5 btnSwitch'>
                    <BtnSwitchWord text1={'poster'} set1={() => setViewMode('poster')} text2={'trailer'} set2={() => setViewMode('trailer')} />

                </div>
                <div className='contain-top5 absolute'>
                    <div className={`flex items-center overflow-y-hidden pb-8 ${mobileWidth ? 'overflow-x-scroll gap-3 px-3' : 'justify-center gap-4'}`}>
                        {upComing.slice(0, 5).map((e, i) => {
                            const video = videos.find(video => video.movie_id === e.id);
                            return viewMode === 'poster' ? (
                                <Card key={i}
                                    type='movie'
                                    item={e}
                                    image={path_img + e.poster_path}
                                    styleCard={mobileWidth ? 'w-[180px]' : 'w-[240px]'}
                                    styleImg={mobileWidth ? 'w-[240px]' : 'w-xs h-[350px]'}
                                    overviewLong={e.overview}
                                    onMouseEnter={() => fetchImages(e.id, 'images', setBackgroundUpComingImage)}
                                />
                            ) : (
                                <div key={i} className="relative w-[350px] h-[200px] transform transition-transform duration-300 hover:scale-102">
                                    <div onMouseEnter={() => fetchImages(e.id, 'images', setBackgroundUpComingImage)}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${e.backdrop_path}`}
                                            alt={e.title}
                                            className="w-full h-full object-cover rounded-xl"
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
                                            onMouseEnter={() => fetchImages(e.id, 'images', setBackgroundUpComingImage)}
                                        ></iframe>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

