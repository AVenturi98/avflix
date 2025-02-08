import * as React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import KEY from '../KEY'

// Context
import { useWindowWidth } from '../context/WindowContext'

// Components
import Card from '../components/Card'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRight,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

export default function PopularMovie() {


    const [movies, setMovies] = React.useState([]) // fetch Movies
    const [page, setPage] = React.useState(1) // set Page
    const [totalPage, setTotalPage] = React.useState([]) // set Total Page
    const [showMore, setShowMore] = React.useState(false) //set Show More

    const [genresMovie, setGenresMovie] = React.useState([]) //set Genres Movie
    const [genre, setGenre] = React.useState([]) //set Genres
    const [secondPage, setSecondPage] = React.useState([]) //set Second Page
    const [thirtyPage, setThirtyPage] = React.useState([]) //set Thirty Page




    // Option di default
    const options = {
        params: {
            language: 'it-IT',
            page
        },
    };

    // Chiamata per i movies
    const fetchMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular${KEY}`, options)
            .then(res => {
                setMovies(res.data.results);
                setTotalPage(new Array('1', '2', '3', '4', '5'))
                setGenresMovie(res.data.results.map(e => e.genre_ids))
                // console.log(res)
            })
            .catch(err => {
                setTotalPage([])
                console.log(err)
            })
    }

    // Chiamata per i movies page 2
    const fetchSecondPageMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular${KEY}`, {
            params: {
                language: 'it-IT',
                page: 2
            }
        })
            .then(res => {
                setSecondPage(res.data.results);
                // console.log(res)
            })
            .catch(err => {
                setTotalPage([])
                console.log(err)
            })
    }

    // Chiamata per i movies page 3
    const fetchThirtyPageMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular${KEY}`, {
            params: {
                language: 'it-IT',
                page: 3
            }
        })
            .then(res => {
                setThirtyPage(res.data.results);
                // console.log(res)
            })
            .catch(err => {
                setTotalPage([])
                console.log(err)
            })
    }

    React.useEffect(() => {
        fetchMovies()
        fetchGenre()
        fetchSecondPageMovies()
        fetchThirtyPageMovies()
    }, [page])

    // Back top after click
    function BackTop() {
        document.documentElement.scrollTop = 0
    }


    // Toggle movies
    function showMoreChange() {
        setShowMore(true)
    }

    function showMinusChange() {
        setShowMore(false)
    }


    // Chiamata per i generi
    const fetchGenre = () => {

        axios.get(`https://api.themoviedb.org/3/genre/movie/list${KEY}`, options)
            .then(res => {
                setGenre(res.data.genres)
                console.log('genres', res.data.genres)
            })
            .catch(err => {
                console.log(err)
            })
    }



    // Filter Action Movies
    const hasActionGenre = (movieGenres) => {
        return movieGenres.includes(28)
    }
    const actionMovies = thirtyPage.filter(movie => hasActionGenre(movie.genre_ids))
    // console.log('Action movies:', actionMovies)


    // Filter Adventure Movies
    const hasAdventureGenre = (movieGenres) => {
        return movieGenres.includes(12)
    }
    const adventureMovies = secondPage.filter(movie => hasAdventureGenre(movie.genre_ids))
    // console.log('Adventure movies:', actionMovies)

    // Filter Comedy Movies
    const hasComedyGenre = (movieGenres) => {
        return movieGenres.includes(35)
    }
    const comedyMovies = thirtyPage.filter(movie => hasComedyGenre(movie.genre_ids))
    // console.log('Adventure movies:', actionMovies)


    // Mobile Width
    const windowWidth = useWindowWidth();
    const mobileWidth = windowWidth >= 640


    return (
        <>
            <div>
                <h1 className='text-4xl font-bold mb-5'>Popolari</h1>
                {!showMore &&
                    <button type="button" onClick={showMoreChange}>
                        <h2 className='uppercase text-xl my-4'>Mostra di più
                            <span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </span>
                        </h2>
                    </button>}
                <div className={!showMore ? 'flex items-center gap-2 overflow-x-auto pb-5' : 'flex justify-center items-center gap-2 flex-wrap'}>
                    {!showMore ?
                        movies.slice(0, 10).map(e =>
                            <Link key={e.id} to={`/movie/${e.id}`}>
                                <div className='img_popular_card'>
                                    <Card item={e} />
                                </div>
                            </Link>)
                        :
                        movies.map(e =>
                            <Link key={e.id} to={`/movie/${e.id}`}>
                                <div className='img_popular_card'>
                                    <Card item={e} />
                                </div>
                            </Link>
                        )}
                    <div className='col-start-1 col-end-4 lg:col-start-1 lg:col-end-5' >
                        {showMore &&
                            <button type="button" onClick={() => { showMinusChange(), BackTop() }} className='uppercase text-xl my-5'>Mostra meno <span><FontAwesomeIcon icon={faArrowLeft} /></span></button>}
                    </div>
                </div>

                {/* PAGINATION */}
                {showMore &&
                    <ul className='flex justify-center items-center gap-3 my-15'>
                        {totalPage.map((e, i) => {
                            // console.log('page', e, i)
                            const pageNum = i + 1
                            return <li key={i}>
                                <button type='button' onClick={() => { setPage(pageNum), BackTop() }} className={`p-4 bg-blue-500 cursor-pointer rounded-md text-white hover:bg-amber-300 ${page == pageNum ? 'outline-2 outline-offset-3 outline-blue-500' : ''} active:bg-blue-700`}>{pageNum}</button>
                            </li>
                        }
                        )}
                    </ul>}
            </div >

            {!showMore ?
                <>
                    {/* ACTION */}
                    <section className='my-10'>
                        <h2 className='text-4xl font-bold my-6'>Action</h2>
                        <div className='flex items-center gap-2 overflow-x-scroll pb-5'>
                            {actionMovies.slice(0, 10).map(e =>
                                <Link key={e.id} to={`/movie/${e.id}`}>
                                    <div className='img_popular_card'>
                                        <Card item={e} />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </section>

                    {/* ADVENTURE  */}
                    <section className='my-10'>
                        <h2 className='text-4xl font-bold my-6'>Avventura</h2>
                        <div className='flex items-center gap-2 overflow-x-scroll pb-5' >
                            {adventureMovies.slice(0, 10).map(e =>
                                <Link key={e.id} to={`/movie/${e.id}`}>
                                    <div className='img_popular_card'>
                                        <Card item={e} />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </section>

                    {/* COMMEDY   */}
                    <section className='my-10'>
                        <h2 className='text-4xl font-bold my-6'>Commedia</h2>
                        <div className='flex items-center gap-2 overflow-x-scroll pb-5'>
                            {comedyMovies.slice(0, 10).map(e =>
                                <Link key={e.id} to={`/movie/${e.id}`}>
                                    <div className='img_popular_card'>
                                        <Card item={e} />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </section>
                </> : ''}




        </>
    )
}