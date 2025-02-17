// Placeholder 
import { useContext, useEffect } from 'react'
import { Link } from 'react-router'
import imagePlaceholder from '../assets/ImagePlaceholder.jpg'

// Components
import Card from '../components/Card'

// Context
import GlobalContext from '../context/GlobalContext'


export default function FilteredSection({ myArray = [], type, title, init, fin, viewmorePerson, id }) {


    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { mobileWidth } = useContext(GlobalContext)


    return (
        <>
            {myArray.length >= 1 ?
                <section className="filtered-genres-container">
                    <div className="filtered-genres-content flex-col sm:gap-3 sm:mb-10" style={{
                        WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                        maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 1%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    }}>
                        <div className='px-3 sm:px-10 filtered-genres-title flex gap-8 flex-wrap'>
                            <h2 className='filtered-genres-title text-2xl sm:text-4xl font-bold my-6'>{title}</h2>
                            {viewmorePerson ?
                                <Link to={`/${type}/${id}/dettails/media/shows`} >
                                    <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'>Vedi tutti</button>
                                </Link>
                                : ''}
                        </div>
                        <div className='flex items-center grow-1 gap-2 sm:gap-5 overflow-x-auto overflow-y-hidden sm:pb-8 pl-2 sm:pl-5 pr-15 sm:pr-35'>
                            {myArray.slice(init, fin).map((e, i) =>
                                <Card key={i} type={!e.media_type ? type : e.media_type} item={e}
                                    image={e.poster_path ? path_img + e.poster_path : imagePlaceholder}
                                    language={e.title && e.title.length > 35 && e.name && e.name.length > 35 ? false : true}
                                    stars={e.title && e.title.length > 60 || e.name && e.name.length > 60 ? false : true}
                                    styleCard={mobileWidth ? 'w-[150px]' : 'w-[200px]'}
                                    styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-[200px] h-[300px]'} />
                            )}
                        </div>
                    </div>
                </section> : ''}

        </>
    )
}