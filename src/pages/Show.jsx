import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'
import { useParams } from 'react-router'

export default function Show({ type }) {

    const [post, setPost] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const [cast, setCast] = React.useState([])


    const { id } = useParams()

    function fetchMovieId() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id} ${KEY}`,
            params: { language: 'it-IT' },
        };

        axios
            .request(options)
            .then(res => {
                setPost(res.data)
                setGenres(res.data.genres)
                // console.log(res)
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
    }, [id])

    return (
        <>
            <div>{post.id}</div>
            <div> {post.original_title || post.name}</div>
            <img src={'https://image.tmdb.org/t/p/w200' + post.poster_path} alt="" />
            <h3>Genere</h3>
            <ul>
                {
                    genres.map(e =>
                        <li key={e.id}> {e.name}</li>
                    )
                }
            </ul >
            <br />

            <section>
                <h3>Actors</h3>
                <div>
                    {cast.map(e =>
                        <div key={e.id}>{e.name}</div>
                    )}
                </div>
            </section>

            <h3>Trama</h3>
            <div>{post.overview}</div>

        </>
    )
}