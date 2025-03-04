import * as React from 'react'
import axios from 'axios'
const KEY = import.meta.env.VITE_API_KEY

// Placeholder
import imagePlaceholder from '../../public/placeholder/ImagePlaceholder.jpg'
import personPlaceholder from '../../public/placeholder/PersonPlaceholder.png'

import CardPlaceholder from '../components/cardPlaceholder/CardPlaceholder'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

// Components
import Card from '../components/Card'

// Context
import GlobalContext from '../context/GlobalContext'

export default function SearchPage() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { mobileWidth, setLoader } = React.useContext(GlobalContext)

    const [search, setSearch] = React.useState('') // set Search Elements
    const [post, setPost] = React.useState([]) // set Search Elements
    const [loading, setLoading] = React.useState(false) // set Loading State
    const [searched, setSearched] = React.useState(false) // set Searched State

    const focused = React.useRef(null) // Ref for input focus

    React.useEffect(() => {
        focused.current.focus()
    }, [])

    function fetchData(e) {
        e.preventDefault()

        setLoading(true)
        setLoader(true)

        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=dba9492b080738637f53df6bffa6b8c3`, {
            params: {
                language: 'it-IT',
                query: search
            },
        })
            .then(res => {
                setPost(res.data.results)
                setLoading(false)
                setSearched(true)
                // console.log('Fetch Search Page', res.data)
            })
            .catch(err => {
                console.error('Error Search Page', err)
                setLoading(false)
                setLoader(false)
                setSearched(true)
            })
            .finally(() => {
                setLoader(false)
            })
    }



    function handleChangeInput(e) {
        setSearch(e.target.value)
    }

    return (
        <>
            <div className='relative flex justify-center items-center flex-col gap-5 px-2'>
                <form onSubmit={fetchData} className="my-4 flex justify-center items-center gap-3 border-1 border-gray-500 rounded-md w-full  sm:w-[50%]" >
                    <button type='submit' className='active:bg-sky-800 rounded-md'>
                        <FontAwesomeIcon icon={faSearch} className='hover:text-gray-500 px-3' />
                    </button>
                    <input ref={focused} min={1} max={100} type="text" name="title" id="title" onChange={handleChangeInput}
                        placeholder="cerca tutti i film, serie tv e personaggi..."
                        className="grow-1 sm:grow-0 sm:w-[50%] px-3 py-0.5 focus-visible:outline-2 focus-visible:outline-sky-700" />
                    {searched && <p className='text-gray-500 px-2'>risultati {!mobileWidth ? 'per ' : ''} <span className='italic text-gray-800'>{!mobileWidth ? ` ${search} ` : ''}</span>{post.length}</p>}
                </form>


                <div className='flex justify-center items-center'>
                    {loading ?
                        <CardPlaceholder />
                        :
                        post.length > 0 ?
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                                {post.map((e, i) =>
                                    <Card key={i} type={e.media_type} item={e}
                                        titled={e.title || e.name}
                                        image={e.media_type === 'tv' || e.media_type === 'movie' && e.poster_path ?
                                            path_img + e.poster_path
                                            : e.media_type === 'person' && e.profile_path ? path_img + e.profile_path :
                                                e.media_type === 'person' ? personPlaceholder
                                                    : imagePlaceholder
                                        }
                                        styleCard={mobileWidth ? 'w-[150px]' : 'w-[200px]'}
                                        styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-[200px] h-[300px]'}
                                        media_name={mobileWidth ? true : false}
                                        media_type={e.media_type === 'tv' ? 'serie tv'
                                            : e.media_type === 'movie' ? 'film'
                                                : e.media_type === 'person' ? 'personaggio' : ''} />
                                )}
                            </div>
                            :
                            searched && 'Nessun risultato'

                    }
                </div>
            </div>

        </>
    )
}