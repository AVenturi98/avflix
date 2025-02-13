import * as React from 'react'
import Card from './Card'

import GlobalContext from '../context/GlobalContext';
import { Global } from '@emotion/react';

export default function FilteredGenres({ myArray = [], init = Number, finish = Number }) {

    const { mobileWidth } = React.useContext(GlobalContext)

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    return (
        <section className="filtered-genres-container ">
            {myArray.slice(init, finish).map(filter => (
                filter.movies.length >= 5 &&
                <div className="filtered-genres-content mb-10" key={filter.title}>
                    <h2 className='filtered-genres-title text-4xl font-bold my-6'>{filter.title}</h2>
                    <div className='flex items-center grow-1 gap-2 sm:gap-5 overflow-x-auto overflow-y-hidden pb-8'>
                        {filter.movies.slice(0, 10).map(e =>
                            <Card key={e.id} type='movie' item={e} image={path_img + e.poster_path} language={true} stars={true} styleCard={mobileWidth ? 'w-[150px]' : 'w-[200px]'} styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-[200px] h-[300px]'} />
                        )}
                    </div>
                </div>
            ))}
        </section>
    )
}