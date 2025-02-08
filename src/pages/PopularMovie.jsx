import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'

// Components
import Card from '../components/Card'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRight,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

export default function PopularMovie() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w200'

    const [movies, setMovies] = React.useState([]) // fetch Movies
    const [page, setPage] = React.useState(1) // set Page
    const [totalPage, setTotalPage] = React.useState([]) // set Total Page

    const [secondPage, setSecondPage] = React.useState([]) //set Second Page
    const [thirtyPage, setThirtyPage] = React.useState([]) //set Thirty Page

    // Set Buttons
    const [arrow, setArrow] = React.useState(false) //set Arrow Show More
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
                setTotalPage(new Array('1', '2', '3', '4', '5'))
                console.log(res)
            })
            .catch(err => {
                setTotalPage([])
                console.log(err)
            })
    }

    React.useEffect(() => {
        fetchMovies(page, setMovies)
        fetchMovies(2, setSecondPage)
        fetchMovies(3, setThirtyPage)
    }, [page])

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

    // Filtered Movies
    const actionMovies = filterMoviesByGenre(thirtyPage, 28)
    const comedyMovies = filterMoviesByGenre(thirtyPage, 35)
    const advenureMovies = filterMoviesByGenre(secondPage, 12)

    // Array of filters
    const filters = [
        { title: 'Azione', movies: actionMovies },
        { title: 'Commedia', movies: comedyMovies },
        { title: 'Avventura', movies: advenureMovies }
    ];

    return (
        <>
            <div>
                <h1 className='text-4xl font-bold mb-5'>Film Popolari</h1>
                {!showMore &&
                    <button type="button" onClick={() => open(setShowMore)} onMouseOver={() => open(setArrow)} onMouseOut={() => close(setArrow)} className='transform transition hover:-translate-y-1 inset-shadow-sm inset-shadow-indigo-500 hover:inset-shadow-gray-500 px-2 rounded-md my-3'>
                        <h2 className='uppercase text-xl my-4 opacity-60 hover:opacity-100'>Mostra di più
                            {arrow &&
                                <span>
                                    <FontAwesomeIcon icon={faArrowRight} className={`arrow-show-more ${arrow ? 'visible ' : ''}`} />
                                </span>}
                        </h2>
                    </button>}
                <div className={!showMore ? 'flex items-center gap-2 overflow-x-auto pb-5' : 'flex justify-center items-center gap-2 flex-wrap'}>
                    {!showMore ?
                        movies.slice(0, 10).map(e =>
                            <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} />
                        )
                        :
                        movies.map(e =>
                            <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} />
                        )}
                </div>
                <div className='flex justify-center items-center mt-9' >
                    {showMore &&
                        <button type="button" onClick={() => { close(setShowMore), BackTop() }} onMouseOver={() => open(setArrow)} onMouseOut={() => close(setArrow)} className='transform transition hover:-translate-y-1 inset-shadow-sm inset-shadow-indigo-500 hover:inset-shadow-gray-500 p-1 rounded-md'>
                            <h2 className='contain-arrow-show-minus uppercase text-xl my-4 opacity-60  hover:opacity-100'>Mostra di meno
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

            {/* FILTERED GENRES */}
            {!showMore ?
                <>
                    {filters.map(filter => (
                        <section className='my-10' key={filter.title}>
                            <h2 className='text-4xl font-bold my-6'>{filter.title}</h2>
                            <div className='flex items-center gap-2 overflow-x-auto pb-5'>
                                {filter.movies.slice(0, 10).map(e =>
                                    <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} />
                                )}
                            </div>
                        </section>
                    ))}
                </> : ''}
        </>
    )
}