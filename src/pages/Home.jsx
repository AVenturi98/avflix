import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'
// Components
import Card from '../components/Card'
import FilteredSection from '../components/FilteredSection'
// Context
import GlobalContext from '../context/GlobalContext'
export default function Home() {

    // Path Image Original
    const path_img_or = 'https://image.tmdb.org/t/p/original'
    // Path Image W500
    const path_img_5 = 'https://image.tmdb.org/t/p/w500'

    const { mobileWidth } = React.useContext(GlobalContext)

    const [trendImgWeek, setTrendImgWeek] = React.useState({}) // Get Trend Image for Week
    const [trendWeek, setTrendWeek] = React.useState([]) // Get Trend Image for Week
    const [logo, setLogo] = React.useState([]) // Get Trend Image for Logo



    // Handle For Section
    function fetchTrend() {
        axios.get(`https://api.themoviedb.org/3/trending/all/week${KEY}`, {
            params: {
                language: 'it-IT',
            },
        })
            .then(res => {
                setTrendImgWeek(res.data.results[0])
                setTrendWeek(res.data.results)

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
                    const logoEn = res.data.logos.find(logo => {
                        if (logo.iso_639_1 === 'it') {
                            logo.iso_639_1 === 'it'
                        } else logo.iso_639_1 === 'en'
                    })
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
        fetchTrend()
    }, [])

    React.useEffect(() => {
        fetchMedia()
    }, [trendImgWeek])

    return (
        <>
            <div style={{
                backgroundImage: `linear-gradient(rgba(21, 26, 102, 0.5), rgba(21, 26, 102, 0.6)), url(${path_img_or + trendImgWeek.backdrop_path})`,
            }}
                className='h-[500px] bg-cover bg-center flex justify-center items-center hero_home'>
                <img src={path_img_5 + logo.file_path} className='opacity-80 px-2' />

            </div >
            <h1>Copertina di questa settimana</h1>
            <FilteredSection myArray={trendWeek} type={trendWeek.map(e => e.media_type)} />
        </>
    )
}
