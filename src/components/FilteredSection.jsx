// Placeholder 
import { useContext } from 'react'
import imagePlaceholder from '../assets/ImagePlaceholder.jpg'

// Components
import Card from '../components/Card'

// Context
import GlobalContext from '../context/GlobalContext'


export default function FilteredSection({ myArray = [], type, title }) {


    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { mobileWidth } = useContext(GlobalContext)

    return (
        <>
            {myArray.length >= 5 ?
                <section className="filtered-genres-container">
                    <div className="filtered-genres-content mb-10" style={{
                        WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                        maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 1%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    }}>
                        <h2 className='filtered-genres-title text-4xl font-bold my-6'>{title}</h2>
                        <div className='flex items-center grow-1 gap-2 sm:gap-5 overflow-x-auto overflow-y-hidden pb-8'>
                            {myArray.map(e =>
                                <Card key={e.id} type={type} item={e} image={e.poster_path ? path_img + e.poster_path : imagePlaceholder} language={true} stars={true} styleCard={mobileWidth ? 'w-[150px]' : 'w-[200px]'} styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-[200px] h-[300px]'} />
                            )}
                        </div>
                    </div>
                </section> : ''}

        </>
    )
}