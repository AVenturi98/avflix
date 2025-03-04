import * as React from 'react'
import Card from './Card'

import GlobalContext from '../context/GlobalContext';

export default function FilteredGenres({ myArray = [], check, init = Number, finish = Number }) {

    const { mobileWidth } = React.useContext(GlobalContext)

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    return (
        <section className="filtered-genres-container ">
            {myArray.slice(init, finish).map(filter => (
                filter.movies.length >= 5 &&
                <div className="filtered-genres-content mb-10" key={filter.title}>
                    <h2 className='px-10 filtered-genres-title text-4xl font-bold my-6'>{filter.title}</h2>
                    <div className='px-10 flex items-center grow-1 gap-2 sm:gap-5 overflow-x-auto overflow-y-hidden pb-8'>
                        {filter.movies.slice(0, 10).map(e =>
                            <Card key={e.id} type={check}
                                item={e}
                                image={e.poster_path ? path_img + e.poster_path : '/placeholder/ImagePlaceholder.jpg'}
                                language={true}
                                stars={true}
                                styleCard={mobileWidth ?
                                    'w-[150px]' : 'w-[200px]'}
                                styleImg={mobileWidth ? 'w-xs h-[220px]'
                                    : 'w-[200px] h-[300px]'} />
                        )}
                    </div>
                </div>
            ))}
        </section>
    )
}