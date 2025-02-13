import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'
import { useParams } from 'react-router'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faStar,
    faStarHalfStroke,
    faStarHalf
} from '@fortawesome/free-solid-svg-icons'
import { faStar as empty } from '@fortawesome/free-regular-svg-icons'

export default function Show({ type }) {

    const [post, setPost] = React.useState([]) // set Post
    const [company, setCompany] = React.useState([]) // set Company
    const [genres, setGenres] = React.useState([]) // set Genre
    const [cast, setCast] = React.useState([]) // set Cast

    const [img, setImg] = React.useState([]) // set Images


    const { id } = useParams()

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
                // console.log(res.data)
            })
            .catch(err => console.error(err));
    }

    function fetchCreditsId() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}/credits${KEY}`,
            params: { language: 'it-IT' },
        };

        axios
            .request(options)
            .then(res => {
                setCast(res.data.cast.slice(0, 5))
                // console.log(res)
            })
            .catch(err => console.error(err));
    }

    React.useEffect(() => {
        fetchMovieId()
        fetchCreditsId()
        fetchImages()
    }, [id])


    function fetchImages() {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/images${KEY}`)
            .then(res => {
                setImg(res.data.backdrops)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const vote = Math.floor(post.vote_average) / 2

    return (
        <>
            <section id='hero-show' className='px-15 lg:px-50 py-10 sm:py-20 lg:py-40 flex items-start bg-gray-100 shadow-lg' style={{ backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.7), rgba(1, 1, 22, 0.9)), url(https://image.tmdb.org/t/p/original${post.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <img className='w-48 lg:w-80 h-auto rounded-lg shadow-md' src={'https://image.tmdb.org/t/p/w500' + post.poster_path} alt={post.original_title || post.name} />
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
                                            : vote <= 2
                                                ? faStarHalf
                                                : empty
                                }
                                style={{ color: " #FFD43B ", }} />
                            {vote}
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div>{post.release_date}</div>
                        -
                        <div>
                            <FontAwesomeIcon icon={faClock} />

                            {' ' + post.runtime}'
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

            <section>
                <h3>Actors</h3>
                <div>
                    {cast.map(e =>
                        <div key={e.id}>{e.name}
                            <img src={'https://image.tmdb.org/t/p/w200' + e.profile_path} alt="" />
                        </div>
                    )}
                </div>
            </section>

            <h3>Trama</h3>
            <div>{post.overview}</div>

            {img &&
                img.map(e =>
                    <img key={e.file_path} src={'https://image.tmdb.org/t/p/w500' + e.file_path} alt="" />
                )
            }
        </>
    )
}