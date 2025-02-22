import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'
// Components
import TopCast from '../components/TopCast'
import FilteredSection from '../components/FilteredSection'
// Context
import GlobalContext from '../context/GlobalContext'
// Lazy Loeader
import LazyLoader from '../components/LazyLoader'
export default function Home() {

    // Path Image Original
    const path_img_or = 'https://image.tmdb.org/t/p/original'
    // Path Image W500
    const path_img_5 = 'https://image.tmdb.org/t/p/w500'

    const { mobileWidth, fetchSections, fetchUpComing,
        upComing
    } = React.useContext(GlobalContext)

    const [trendImgWeek, setTrendImgWeek] = React.useState({}) // Get Trend Image for Week
    const [trendWeek, setTrendWeek] = React.useState([]) // Get Trend Week
    const [logo, setLogo] = React.useState([]) // Get Trend Image for Logo

    const [trendDay, setTrendDay] = React.useState([]) // Get Trend Day

    const [trendPeople, setTrendPeople] = React.useState([]) // Get Trend People



    React.useEffect(() => {
        fetchTrend('week', setTrendWeek, setTrendImgWeek) // get Treding Week
        fetchTrend('day', setTrendDay) // get Trending Day
        fetchSections('person', 'popular', setTrendPeople) // get Trending People
        fetchUpComing({ init: 0, fin: 10, type: 'movie' }) // get Up Coming

    }, [])

    // Handle For Section
    function fetchTrend(time_window, set = () => { }, setTrendImg = () => { }) {
        axios.get(`https://api.themoviedb.org/3/trending/all/${time_window}${KEY}`, {
            params: {
                language: 'it-IT',
            },
        })
            .then(res => {
                setTrendImg(res.data.results[0])
                set(res.data.results)

                // console.log('Fetch Trend', res.data.results[0])
            })
            .catch(err => {
                console.log('Fetch Trend', err)
            })
    }

    // Handle images
    function fetchMedia() {
        if (trendImgWeek.media_type && trendImgWeek.id) {
            axios.get(`https://api.themoviedb.org/3/${trendImgWeek.media_type}/${trendImgWeek.id}/images${KEY}`)
                .then(res => {
                    const logoEn = res.data.logos.find(logo => logo.iso_639_1 === 'it')
                    if (logoEn) {
                        setLogo(logoEn)
                    }
                    // console.log('Media', res.data.logos)
                })
                .catch(err => {
                    console.log('Error fetch Media Home', err)
                });
        }
    }




    React.useEffect(() => {
        fetchMedia()
    }, [trendImgWeek])

    return (
        <>
            <h1 className='text-3xl text-center my-4 title-home'>Scopri le tendenze del momento</h1>
            <div style={{
                backgroundImage: `linear-gradient(rgba(21, 26, 102, 0.5), rgba(21, 26, 102, 0.6)), url(${path_img_or + trendImgWeek.backdrop_path})`,
            }}
                className='h-[500px] bg-cover bg-center flex justify-center items-center hero_home'>
                <LazyLoader image={path_img_5 + logo.file_path} style={'opacity-80 px-2'} />

            </div >
            <FilteredSection myArray={trendWeek} title={'Questa settimana'} type={trendWeek.map(e => e.media_type)} />

            <FilteredSection myArray={trendDay} title={'Selezione di oggi'} type={trendWeek.map(e => e.media_type)} />

            <div className='my-12'>
                <TopCast myArray={trendPeople} title={'Personaggi popolari'} />
            </div>

            <FilteredSection myArray={upComing} title={'Prossimamente'} type={'movie'} />

        </>
    )
}
