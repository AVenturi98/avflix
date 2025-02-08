import * as React from 'react'
import { FlagIcon } from 'react-flag-kit'

// Components
import VoteStar from './VoteStar'
import Flags from '../Flags'

// Context 
import { useWindowWidth } from '../context/WindowContext'

export default function Card({ item }) {

    const { title, name, poster_path, backdrop_path, original_language, overview, vote_average } = item

    const [hoverStyle, setHoverStyle] = React.useState(false)

    function upMouseCard() {
        setHoverStyle(true)
    }

    function downMouseCard() {
        setHoverStyle(false)
    }

    function overTextLimit(text) {
        const textLimited = text.split(' ')
        if (textLimited.length > 20) {
            return textLimited.slice(0, 20).join(' ') + '...'
        }
        return text
    }

    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640

    return (
        <div onMouseOver={upMouseCard} onMouseOut={downMouseCard} className='w-2xs'>
            <img src={`${mobileWidth ? 'https://image.tmdb.org/t/p/w200' + backdrop_path : 'https://image.tmdb.org/t/p/w200' + poster_path}`} alt={title} className='w-md sm:h-[450px] rounded-md' />
            {hoverStyle &&
                <div className='hover_el_popular_card flex justify-center items-start flex-col gap-5 p-3 rounded-md' >
                    <h2 className='text-3xl'>{title || name}</h2>
                    <div>
                        <Flags lang={original_language} />
                    </div>
                    <div>{overview ? overTextLimit(overview) : '...'}</div>
                    <div>{vote_average.toFixed(1)}</div>
                    <VoteStar vote={vote_average} />
                </div>
            }
        </div>
    )
}