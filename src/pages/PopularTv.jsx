import * as React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import KEY from '../KEY'
import { FlagIcon } from 'react-flag-kit'

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

    const [secondPage, setSecondPage] = React.useState([]) //set Second Page
    const [thirtyPage, setThirtyPage] = React.useState([]) //set Thirty Page

    // Set Buttons
    const [arrow, setArrow] = React.useState(false) //set Arrow Show More
    const [showMore, setShowMore] = React.useState(false) //set Show More




    // Option di default
    const options = {
        params: {
            language: 'it-IT',
            page
        },
    };

    // Chiamata per i movies
    const fetchMovies = () => {
        axios.get(`https://api.themoviedb.org/3/tv/popular${KEY}`, options)
            .then(res => {
                setMovies(res.data.results);
                setTotalPage(new Array('1', '2', '3', '4', '5'))
                console.log(res)
            })
            .catch(err => {
                setTotalPage([])
                console.log(err)
            })
    }

    // Chiamata per i movies page 2
    const fetchSecondPageMovies = () => {
        axios.get(`https://api.themoviedb.org/3/tv/popular${KEY}`, {
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
        axios.get(`https://api.themoviedb.org/3/tv/popular${KEY}`, {
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
        fetchSecondPageMovies()
        fetchThirtyPageMovies()
    }, [page])

    // Back top after click
    function BackTop() {
        document.documentElement.scrollTop = 0
    }


    // Toggle button movies
    function showMoreChange() {
        setShowMore(true)
    }

    function showMinusChange() {
        setShowMore(false)
    }



    // Filter Crime Movies
    const hasCrimeGenre = (movieGenres) => {
        return movieGenres.includes(80)
    }
    const actionMovies = thirtyPage.filter(movie => hasCrimeGenre(movie.genre_ids))
    // console.log('Action movies:', actionMovies)


    // Filter Reality & Soap Movies
    const hasRealitySoapGenre = (movieGenres) => {
        return movieGenres.includes(10764) || movieGenres.includes(10766)
    }
    const adventureMovies = thirtyPage.filter(movie => hasRealitySoapGenre(movie.genre_ids))
    // console.log('Adventure movies:', actionMovies)

    // Filter Comedy Movies
    const hasComedyGenre = (movieGenres) => {
        return movieGenres.includes(35)
    }
    const comedyMovies = secondPage.filter(movie => hasComedyGenre(movie.genre_ids))
    // console.log('Adventure movies:', actionMovies)



    function setArrowShowMore() {
        setArrow(true)
    }
    function setArrowShowMinus() {
        setArrow(false)
    }


    return (
        <>
            <div>
                <h1 className='text-4xl font-bold mb-5'>Popolari</h1>
                {!showMore &&
                    <button type="button" onClick={showMoreChange} onMouseOver={setArrowShowMore} onMouseOut={setArrowShowMinus}>
                        <h2 className='uppercase text-xl my-4 opacity-60 transform transition hover:-translate-y-1 hover:opacity-100'>Mostra di più
                            {arrow &&
                                <span>
                                    <FontAwesomeIcon icon={faArrowRight} className={`arrow-show-more ${arrow ? 'visible' : ''}`} />
                                </span>}
                        </h2>
                    </button>}
                <div className={!showMore ? 'flex items-center gap-2 overflow-x-auto pb-5' : 'flex justify-center items-center gap-2 flex-wrap'}>
                    {!showMore ?
                        movies.slice(0, 10).map(e =>
                            <Link key={e.id} to={`/tv/${e.id}`}>
                                <div className='img_popular_card'>
                                    <Card item={e} />
                                </div>
                            </Link>)
                        :
                        movies.map(e =>
                            <Link key={e.id} to={`/tv/${e.id}`}>
                                <div className='img_popular_card'>
                                    <Card item={e} />
                                </div>
                            </Link>
                        )}
                </div>
                <div className='flex justify-center items-center mt-9' >
                    {showMore &&
                        <button type="button" onClick={() => { showMinusChange(), BackTop() }} onMouseOver={setArrowShowMore} onMouseOut={setArrowShowMinus}>
                            <h2 className='uppercase text-xl my-4 opacity-60 transform transition hover:-translate-y-1 hover:opacity-100'>Mostra di meno
                                {arrow &&
                                    <span>
                                        <FontAwesomeIcon icon={faArrowLeft} className={`arrow-show-minus ${arrow ? 'visible' : ''}`} />
                                    </span>}
                            </h2>
                        </button>}
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
                    {/* CRIME */}
                    <section className='my-10'>
                        <h2 className='text-4xl font-bold my-6'>Crime</h2>
                        <div className='flex items-center gap-2 overflow-x-auto pb-5'>
                            {actionMovies.slice(0, 10).map(e =>
                                <Link key={e.id} to={`/tv/${e.id}`}>
                                    <div className='img_popular_card'>
                                        <Card item={e} />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </section>

                    {/* REALITY e SOAP */}
                    <section className='my-10'>
                        <h2 className='text-4xl font-bold my-6'>Reality & Soap</h2>
                        <div className='flex items-center gap-2 overflow-x-auto pb-5' >
                            {adventureMovies.slice(0, 10).map(e =>
                                <Link key={e.id} to={`/tv/${e.id}`}>
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
                        <div className='flex items-center gap-2 overflow-x-auto pb-5'>
                            {comedyMovies.slice(0, 10).map(e =>
                                <Link key={e.id} to={`/tv/${e.id}`}>
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