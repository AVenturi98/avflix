import * as React from 'react'
import Card from './Card'

// Context
import GlobalContext from '../context/GlobalContext'

export default function TopRated({ myArray = [], check, set = () => { }, backgroundVoteImage, setBackgroundImage = () => { } }) {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { mobileWidth } = React.useContext(GlobalContext)

    // Get the backdrop_path of the first element in top5Votes
    const backdropVotesPath = myArray.length > 0 ? myArray[0].backdrop_path : '';
    const posterVotesPath = myArray.length > 0 ? myArray[0].poster_path : '';

    return (
        <section className='relative mb-17 popular'>
            <div className={`votes relative py-70 sm:py-100`} style={{ backgroundImage: `linear-gradient(rgba(21, 26, 102, 0.78), rgba(21, 26, 102, 0.6)), url(${backgroundVoteImage || `https://image.tmdb.org/t/p/original${mobileWidth ? posterVotesPath : backdropVotesPath}`})` }}></div>
            <div className='contain-top5 absolute'>
                <div className={`flex items-center overflow-y-hidden pb-8 justify-baseline lg:justify-center sm:pl-5 px-3 ${mobileWidth ? 'overflow-x-scroll gap-3 ' : 'gap-4'}`}>
                    {myArray.slice(0, 5).map((e, i) => (
                        <Card key={i}
                            type={check}
                            item={e}
                            image={path_img + e.poster_path}
                            styleCard={mobileWidth ? 'w-[180px]' : 'w-[240px]'}
                            styleImg={mobileWidth ? 'w-[240px]' : 'w-xs h-[350px]'}
                            backdrop={e.backdrop_path}
                            votes={true}
                            onMouseEnter={() => set(e.id, check, setBackgroundImage)} />
                    ))}
                </div>
            </div>
            <div className={mobileWidth ? "flex justify-center" : "title-container-votes"}>
                <h1 className={mobileWidth ? "title-3d-votes-mobile" : "title-3d-votes"}>I più votati</h1>
            </div>
        </section>
    )
}