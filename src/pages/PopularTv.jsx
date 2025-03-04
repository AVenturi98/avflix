import * as React from 'react'
import axios from 'axios'
const KEY = import.meta.env.VITE_API_KEY

// Components
import HeroPage from '../components/HeroPage'
import TopRated from '../components/TopRated'
import TopCast from '../components/TopCast'
import FilteredGenres from '../components/FilteredGenres'

// Context
import GlobalContext from '../context/GlobalContext'


export default function PopularMovie() {

    const { fetchSections, fetchMovies, fetchMedia, mobileWidth, showMoreSeries } = React.useContext(GlobalContext)

    const [series, setSeries] = React.useState([]) // fetch Movies

    const [page, setPage] = React.useState(1) // set Page
    const [totalPage, setTotalPage] = React.useState([]) // set Total Page
    const [comedyRow, setComedyRow] = React.useState([]) //set Comedy Row
    const [realityeSoap, setRealityeSoap] = React.useState([]) //set Reality & Soap Row
    const [mysteryRow, setMysteryRow] = React.useState([]) //set Mystery Row
    const [adventureRow, setAdventureRow] = React.useState([]) //set Adventure Row
    const [animationRow, setAnimationRow] = React.useState([]) //set Horror Row
    const [crimeRow, setCrimeRow] = React.useState([]) //set Crime Row
    const [documentaryRow, setDocumentaryRow] = React.useState([]) //set Romance Page


    const [top5Votes, setTop5Votes] = React.useState([]) // set Top Rated
    const [backgroundVoteImage, setBackgroundVoteImage] = React.useState(''); // set Background Image

    const [cast, setCast] = React.useState([]) // set Cast
    const [top5Cast, setTop5Cast] = React.useState([]); // set Top 5 Cast


    // Handle Top Cast
    function fetchCreditsId(movie_id) {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${movie_id}/credits`,
            params: { language: 'it-IT' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmE5NDkyYjA4MDczODYzN2Y1M2RmNmJmZmE2YjhjMyIsIm5iZiI6MTczNDAwMTk5My42MzkwMDAyLCJzdWIiOiI2NzVhYzU0OTlhZTUyNmQ1MDhhOWNmOGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5QxtZmHBD5OWY4MsxJKFi1Me51dzgXlbXp0-CsDINX8'
            }
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


    // Function to filter movies by genre
    function filterMoviesByGenre(movies, genreId) {
        return movies.filter(movie => movie.genre_ids.includes(genreId));
    }

    // Filtered Movies
    const crimeMovies = filterMoviesByGenre(crimeRow, 80);
    const realitySoapMovies = filterMoviesByGenre(realityeSoap, 10764).concat(filterMoviesByGenre(realityeSoap, 10766));
    const comedyMovies = filterMoviesByGenre(comedyRow, 35);
    const mysteryMovies = filterMoviesByGenre(mysteryRow, 9648)
    const adventureMovies = filterMoviesByGenre(adventureRow, 10759)
    const animationMovies = filterMoviesByGenre(animationRow, 16)
    const documentaryMovies = filterMoviesByGenre(documentaryRow, 99)

    // Array of filters
    const filtersGenres = [
        { title: 'Crime', movies: crimeMovies, set: setCrimeRow },
        { title: 'Reality & Soap', movies: realitySoapMovies, set: setRealityeSoap },
        { title: 'Commedia', movies: comedyMovies, set: setComedyRow },
        { title: 'Azione', movies: mysteryMovies, set: setMysteryRow },
        { title: 'Avventura', movies: adventureMovies, set: setAdventureRow },
        { title: 'Horror', movies: animationMovies, set: setAnimationRow },
        { title: 'Romantico', movies: documentaryMovies, set: setDocumentaryRow }
    ];

    // Global fetch
    React.useEffect(() => {
        fetchMovies('tv', page, setSeries, setTotalPage, fetchCreditsId) // handle home page movies
        fetchSections('tv', 'top_rated', setTop5Votes) // handle top rated 
        filtersGenres.forEach(genre => {
            return fetchMovies('tv', Math.floor(Math.random() * 10) + 1, genre.set) // handle genres movies
        })

        document.documentElement.scrollTop = 0

    }, [page])

    // fetch Cast
    React.useEffect(() => {
        // Filter for Casting
        const sortedCast = cast
            .sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity)) // Sort in descending order by popularity
            .slice(0, 10); // Get the top 5 elements
        setTop5Cast(sortedCast);
    }, [cast]);



    // Function to filter movies by genre
    function filterMoviesByGenre(movies, genreId) {
        return movies.filter(movie => movie.genre_ids.includes(genreId));
    }



    // Back top after click
    function BackTop() {
        document.documentElement.scrollTop = 0
    }

    return (
        <>
            {/* POPULARs */}
            <HeroPage type={'Serie'} check={'tv'} myArray={series} />
            {/* PAGINATION */}
            {showMoreSeries &&
                <ul className='flex justify-center items-center gap-3 mt-3 mb-6 sm:my-15'>
                    {totalPage.slice(0, 5).map((e, i) => {
                        // console.log('page', e, i)
                        const pageNum = i + 1
                        return <li key={i}>
                            <button type='button' onClick={() => { setPage(pageNum), BackTop() }} className={`p-4 bg-blue-500 cursor-pointer rounded-md text-white hover:bg-amber-300 ${page == pageNum ? 'outline-2 outline-offset-3 outline-blue-500' : ''} active:bg-blue-700`}>{pageNum}</button>
                        </li>
                    }
                    )}
                </ul>}

            {/* FILTERED GENRES */}
            <FilteredGenres myArray={filtersGenres} check={'tv'} init={0} finish={3} />


            {/* TOP RATED */}
            <TopRated myArray={top5Votes} check={'tv'} set={fetchMedia} backgroundVoteImage={backgroundVoteImage} setBackgroundImage={setBackgroundVoteImage} />

            {/* TOP CAST */}
            <TopCast myArray={top5Cast} title={'Top cast'} />


            {/* FILTERED GENRES */}
            <FilteredGenres myArray={filtersGenres} check={'tv'} init={3} finish={6} />

        </>
    )
}

