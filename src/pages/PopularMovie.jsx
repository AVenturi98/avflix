import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'

// Components
import Card from '../components/Card'

// Context
import { useWindowWidth } from '../context/WindowContext'


export default function PopularMovie() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w200'

    const [movies, setMovies] = React.useState([]) // fetch Movies
    const [page, setPage] = React.useState(1) // set Page
    const [totalPage, setTotalPage] = React.useState([]) // set Total Page

    const [secondPage, setSecondPage] = React.useState([]) //set Second Page
    const [thirtyPage, setThirtyPage] = React.useState([]) //set Thirty Page

    // Set Buttons
    const [showMore, setShowMore] = React.useState(false) //set Show More

    const [voteAvg, setVoteAvg] = React.useState([]) //set Vote Average


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
                // console.log(res)
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
        fetchMovies(page, setVoteAvg)
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
    const comedyMovies = filterMoviesByGenre(secondPage, 35)
    const advenureMovies = filterMoviesByGenre(secondPage, 12)

    // Array of filters
    const filtersGenres = [
        { title: 'Azione', movies: actionMovies },
        { title: 'Commedia', movies: comedyMovies },
        { title: 'Avventura', movies: advenureMovies }
    ];


    // Filter for Average Votes
    const top5Votes = voteAvg
        .sort((a, b) => b.vote_average - a.vote_average) // Sort in descending order by vote_average
        .slice(0, 5); // Get the top 5 elements
    // console.log('Top 5 votes:', top5Votes);


    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640


    // Get the backdrop_path of the first element in top5Votes
    const backdropPath = top5Votes.length > 0 ? top5Votes[0].backdrop_path : '';
    const posterPath = top5Votes.length > 0 ? top5Votes[0].poster_path : '';

    return (
        <>
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
                <div className={!showMore ? 'flex items-center gap-2 overflow-x-auto overflow-y-hidden pb-5' : 'flex justify-center items-center gap-2 flex-wrap'}>
                    {!showMore ?
                        movies.slice(0, 10).map(e =>
                            <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} language={true} stars={true} overview={e.overview} styleCard={'w-[240px]'} styleImg={'w-xs h-[350px]'} />
                        )
                        :
                        movies.map(e =>
                            <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} language={true} stars={true} overview={e.overview} styleCard={mobileWidth ? 'w-[150px]' : 'w-[240px]'} styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-xs h-[350px]'} />
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
            <section className="filtered-genres-container">
                {!showMore ?
                    <>
                        {filtersGenres.map(filter => (
                            filter.movies.length > 5 &&
                            <div className="filtered-genres-content" key={filter.title}>
                                <h2 className='filtered-genres-title text-4xl font-bold my-6'>{filter.title}</h2>
                                <div className='flex items-center gap-2 overflow-x-scroll overflow-y-hidden pb-8'>
                                    {filter.movies.slice(0, 8).map(e =>
                                        <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} language={true} stars={true} styleCard={mobileWidth ? 'w-[150px]' : 'w-[200px]'} styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-[200px] h-[300px]'} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </> : ''}
            </section>

            {/* BACK IMG */}
            <section className='relative' id='popular'>
                <div id='votes' className='relative popular' style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${mobileWidth ? posterPath : backdropPath}')` }}></div>
                <div className='contain-top5 absolute'>
                    <div className={`flex items-center overflow-y-hidden pb-8 ${mobileWidth ? 'overflow-x-scroll gap-3 px-3' : 'justify-center gap-8'}`}>
                        {top5Votes.map((e, i) => (
                            <Card key={i} type='movie' item={e} image={path_img + e.poster_path} styleCard={mobileWidth ? 'w-[180px]' : 'w-[240px]'} styleImg={mobileWidth ? 'w-[180px] h-[200px]' : 'w-xs h-[350px]'} sty backdrop={e.backdrop_path} back={path_img + e.backdrop_path} votes={true} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}