import * as React from 'react'
import { Link } from 'react-router'

// Components
import VoteStar from './VoteStar'
import Flags from '../Flags'
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { CircularProgress } from '@mui/joy'
import { useCountUp } from 'use-count-up'

export default function Card({ item, image, type, styleCard, styleImg, overviewSmall, overviewLong, votes = false, language = false, stars = false, videos = false, onMouseEnter }) {

    const { id, title, name, original_language, vote_average } = item


    function overTextSmall(text) {
        const textLimited = text.split(' ')
        if (textLimited.length > 20) {
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

    return (
        <Link to={`/${type}/${id}`} onMouseEnter={onMouseEnter}>
            <div className='img_popular_card'>
                <div className={`${styleCard} shadow-card rounded-2xl`}>
                    <img src={image} alt={title} className={`${styleImg} rounded-2xl relative`} />

                    <div className='hover_el_popular_card flex justify-center items-start flex-col gap-5 p-3 rounded-2xl' >
                        <h2 className='text-3xl'>{title || name}</h2>
                        {language &&
                            <div className='flex justify-center items-center gap-5'>
                                <div className='font-semibold'>Lingua Originale:</div>
                                <span>
                                    <Flags lang={original_language} />
                                </span>
                            </div>}
                        <div>{overviewSmall ? overTextSmall(overviewSmall) : ''}</div>
                        <div>{overviewLong ? overTextLong(overviewLong) : ''}</div>
                        {stars &&
                            <div className='flex justify-center items-center gap-3'>
                                <VoteStar vote={vote_average} />
                                <span className='opacity-70'>
                                    ({vote_average.toFixed(1)})
                                </span>
                            </div>}
                    </div>
                    {votes === true &&
                        <div className='absolute progressVote' >
                            <Stack spacing={2} onMouseOver={votes ? () => reset() : null}>
                                <CircularProgress size="lg" determinate value={Number(value2)} variant='solid'>
                                    <Typography level='h4' color='primary'>{value2}%</Typography>
                                </CircularProgress>
                            </Stack>
                        </div>}

                </div>
            </div>
        </Link >
    )
}