import * as React from 'react'
import Card from './Card'

import GlobalContext from '../context/GlobalContext'

export default function HeroPage({ type, check, myArray = [] }) {

    const { mobileWidth, showMoreMovies, setShowMoreMovies, showMoreSeries, setShowMoreSeries } = React.useContext(GlobalContext)

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    // Toggle elements
    function open(set) {
        set(true)
    }
    function close(set) {
        set(false)
    }

    // Back top after click
    function BackTop() {
        document.documentElement.scrollTop = 0
    }

    return (
        <>
            {type === 'Film' ?
                <section className='flex justify-center'>
                    <div className='container py-6 sm:py-15'>
                        <h1 className='text-4xl font-bold mb-5 px-5 sm:px-10'>{type} Popolari</h1>
                        {!showMoreMovies &&
                            <button type='button' onClick={() => open(setShowMoreMovies)} className="cta flex justify-center items-center">
                                <span>Mostra di più</span>
                                <svg width="15px" height="10px" viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>}
                        <div className={!showMoreMovies ? 'px-15 flex items-center gap-5 overflow-x-auto overflow-y-hidden pb-5' : 'flex justify-center items-center gap-2 flex-wrap'}>
                            {!showMoreMovies ?
                                myArray.slice(0, 10).map(e =>
                                    <Card key={e.id}
                                        type={check}
                                        item={e}
                                        image={e.poster_path ? path_img + e.poster_path : '/public/placeholder/ImagePlaceholder.jpg'}
                                        language={true}
                                        stars={true}
                                        overviewSmall={e.overview}
                                        styleCard={'w-[240px]'}
                                        styleImg={'w-xs h-[350px]'} />
                                )
                                :
                                myArray.map(e =>
                                    <Card key={e.id}
                                        type={check}
                                        item={e}
                                        image={e.poster_path ? path_img + e.poster_path : '/public/placeholder/ImagePlaceholder.jpg'}
                                        language={true}
                                        stars={true}
                                        overviewSmall={e.overview}
                                        styleCard={mobileWidth ? 'w-[150px]' : 'w-[240px]'}
                                        styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-xs h-[350px]'} />
                                )}
                        </div>
                        <div className='flex justify-center items-center mt-9' >
                            {showMoreMovies &&
                                <button type='button' onClick={() => { close(setShowMoreMovies), BackTop() }} className="cta cta-back flex justify-center items-center">
                                    <span>Mostra di meno</span>
                                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>}
                        </div>
                    </div >
                </section> : ''}

            {type === 'Serie' ?
                <section className='flex justify-center'>
                    <div className='container py-6 sm:py-15'>
                        <h1 className='text-4xl font-bold mb-5 px-5 sm:px-10'>{type} Popolari</h1>
                        {!showMoreSeries &&
                            <button type='button' onClick={() => open(setShowMoreSeries)} className="cta flex justify-center items-center">
                                <span>Mostra di più</span>
                                <svg width="15px" height="10px" viewBox="0 0 13 10">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>}
                        <div className={!showMoreSeries ? 'px-15 flex items-center gap-5 overflow-x-auto overflow-y-hidden pb-5' : 'flex justify-center items-center gap-2 flex-wrap'}>
                            {!showMoreSeries ?
                                myArray.slice(0, 10).map(e =>
                                    <Card key={e.id}
                                        type={check}
                                        item={e}
                                        image={e.poster_path ? path_img + e.poster_path : '/public/placeholder/ImagePlaceholder.jpg'}
                                        language={true}
                                        stars={true}
                                        overviewSmall={e.overview}
                                        styleCard={'w-[240px]'}
                                        styleImg={'w-xs h-[350px]'} />
                                )
                                :
                                myArray.map(e =>
                                    <Card key={e.id}
                                        type={check}
                                        item={e}
                                        image={e.poster_path ? path_img + e.poster_path : '/public/placeholder/ImagePlaceholder.jpg'}
                                        language={true}
                                        stars={true}
                                        overviewSmall={e.overview}
                                        styleCard={mobileWidth ? 'w-[150px]' : 'w-[240px]'}
                                        styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-xs h-[350px]'} />
                                )}
                        </div>
                        <div className='flex justify-center items-center mt-9' >
                            {showMoreSeries &&
                                <button type='button' onClick={() => { close(setShowMoreSeries), BackTop() }} className="cta cta-back flex justify-center items-center">
                                    <span>Mostra di meno</span>
                                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>}
                        </div>
                    </div >
                </section> : ''}
        </>
    )
}