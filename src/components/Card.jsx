import * as React from 'react'
import { Link } from 'react-router'

// Components
import VoteStar from './VoteStar'
import Flags from './Flags'
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CircularProgress } from '@mui/joy'
import { useCountUp } from 'use-count-up'

// Context
import GlobalContext from '../context/GlobalContext'

// Lazy Loader
import LazyLoader from './LazyLoader'

/**
     * FETCH MEDIA
     * 
     * @param {*item for get elements} item  
     * @param {*path_img + poster/backdrop_path} image 
     * @param {* movie / tv} type 
     * @param {*general style} styleCard 
     * @param {*image item style} styleImg 
     * @param {*return overiew slice(0, 10)} overviewSmall
     * @param {*return overiew slice(0, 20)} overviewLong
     * @param {*visibility vote average (true / false)} votes
     * @param {*visibiilty orginal language (true / false)} language
     * @param {*visibiilty stars average vote (true / false)} stars 
     * @param {*callback for overlay content card / view image background} onMouseEnter 
     * 
     */
export default function Card({
    item,
    image,
    type,
    styleCard,
    styleImg,
    overviewSmall,
    overviewLong,
    votes = false,
    language = Boolean,
    stars = Boolean,
    onMouseEnter,
    media_name = false,
    media_type,
    titled }) {

    const { id, title, name, original_language, vote_average } = item

    const { mobileWidth, titleSlug } = React.useContext(GlobalContext)


    function overTextSmall(text) {
        const textLimited = text.split(' ')
        if (textLimited.length > 10) {
            return textLimited.slice(0, 10).join(' ') + '...'
        }
        return text
    }

    function overTextLong(text) {
        const textLimited = text.split(' ')
        if (textLimited.length > 20) {
            return textLimited.slice(0, 20).join(' ') + '...'
        }
        return text
    }


    const { value: value2, reset } = useCountUp({
        isCounting: true,
        duration: 1,
        start: 0,
        end: parseInt(vote_average * 10),
    });



    const showLanguage = (title && title.length > 35) || (name && name.length > 35) ? language === false : language === true
    const showVote = (title && title.length > 60) || (name && name.length > 60) ? stars === false : stars === true

    return (
        <Link to={`/${type}/${id}` + '-' + titleSlug(title || name)} onMouseEnter={onMouseEnter}>
            <div className='img_popular_card'>
                <div className={`${styleCard} shadow-card rounded-2xl`}>
                    <LazyLoader image={image !== null ? image : '/placeholder/ImagePlaceholder.jpg'} style={`${styleImg} rounded-2xl relative`} />

                    {!mobileWidth ?
                        <div className='hover_el_popular_card flex justify-center items-start flex-col gap-5 p-3 rounded-2xl' >
                            <h2 className='text-3xl'>{title || name}</h2>
                            {showLanguage &&
                                <div className='flex justify-center items-center gap-5'>
                                    <div className='font-semibold'>Lingua Originale:</div>
                                    <span>
                                        <Flags lang={original_language} />
                                    </span>
                                </div>}
                            <div>{overviewSmall ? overTextSmall(overviewSmall) : ''}</div>
                            <div>{overviewLong ? overTextLong(overviewLong) : ''}</div>
                            {showVote &&
                                <div className='flex justify-center items-center gap-3'>
                                    <VoteStar vote={vote_average} />
                                    <span className='opacity-70'>
                                        ({vote_average.toFixed(1)})
                                    </span>
                                </div>}
                        </div> : ''}
                    {votes === true &&
                        <div className='absolute progressVote' >
                            <Stack spacing={2} onMouseOver={votes ? () => reset() : null}>
                                <CircularProgress size="lg" determinate value={Number(value2)} variant='solid'>
                                    <Typography level='h4' color='primary'>{value2}%</Typography>
                                </CircularProgress>
                            </Stack>
                        </div>}
                    {media_name === true && media_type === 'film' || media_type === 'serie tv' && mobileWidth ?
                        <div className='absolute progressVote' >
                            <p className='italic font-bold'>{titled ? overTextSmall(titled) : ''}</p>
                        </div>
                        : media_name === true && media_type === 'personaggio' && mobileWidth ?
                            <div className='absolute progressVote' >
                                <p className='italic font-bold'>{name}</p>
                            </div> : ''}

                    {image === '/placeholder/ImagePlaceholder.jpg' && mobileWidth && !media_name ?
                        <div className='absolute top-5 bg-green-500 w-full rounded-xs p-2'>{title || name}</div>
                        : ''}

                </div>
            </div>
        </Link >
    )
}