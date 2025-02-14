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
                setCountry(res.data.production_countries)
                console.log(res.data)
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
                setCast(res.data.cast.slice(0, 10))
                setCrew(res.data.crew.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
                console.log(res)
            })
            .catch(err => console.error(err));
    }

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

    React.useEffect(() => {
        fetchMovieId()
        fetchCreditsId()
        fetchImages()
        fetchVideos()
    }, [id])

    const vote = Math.floor(post.vote_average) / 2 // Set Vote num int e stars adapted

    const collageImages = img.map(e => ({ src: 'https://image.tmdb.org/t/p/original' + e.file_path })) // Set Path Image for Collage Images

    const numBudget = post.budget
    const budget = numBudget ? numBudget.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }) : 'Non disponibile'

    console.log(budget)

    return (
        <>
            {/* HERO SHOW */}
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
                    {viewMode === 'immagini' ?
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
                    <div className='py-15'>
                        <h3 className='mb-8 px-8 flex items-center gap-5'>
                            <p className='text-4xl font-bold'>Cast & Crew</p>
                            <span>
                                <button>vedi tutti &gt;</button>
                            </span>
                        </h3>
                        <div className='flex items-center gap-8 p-3 overflow-x-auto' style={{
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
                    </div>
                </section>
                <div className='px-10'>
                    <h1 className='font-extrabold text-2xl my-3'>Dettagli</h1>

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Titolo Originale</h3>
                    <p>{post.original_title}</p>

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Prodotto in</h3>
                    <p>{country.map(e => e.name)}</p>

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Compagnia di produzione</h3>
                    <ul>
                        {company.map(e =>
                            <li key={e.name}>{e.name}</li>
                        )}
                    </ul>

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Budget</h3>
                    <p>{budget}</p>

                    <hr className='opacity-30' />

                    {type === 'movie' ?
                        <>
                            <h3 className='font-semibold text-lg my-1'>Data d'uscita</h3>
                            <p>{post.release_date}</p>
                        </> :
                        <>
                            <h3 className='font-semibold text-lg my-1'>Data primo episodio</h3>
                            <p>{post.release_date}</p>
                        </>
                    }

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Durata</h3>
                    <p>{post.runtime} minuti</p>

                    <hr className='opacity-30' />

                    <h3 className='font-semibold text-lg my-1'>Scrittori</h3>
                    <ul>
                        {crew.filter(member => member.known_for_department === 'Writing').map((e, i) =>
                            <li key={i}>{e.name}</li>
                        )}
                    </ul>
                    <hr className='opacity-30' />
                    <h3 className='font-semibold text-lg my-1'>Produttori</h3>
                    <ul>
                        {crew.filter(member => member.job === 'Producer').map((e, i) =>
                            <li key={i}>{e.name}</li>
                        )}
                    </ul>
                </div>
            </div>


        </>
    )
}
