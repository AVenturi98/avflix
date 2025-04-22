import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
const KEY = import.meta.env.VITE_API_KEY;

// Components
import TopCast from '../components/TopCast';
import FilteredSection from '../components/FilteredSection';
import Spinner from '../components/Spinner';

// Context
import GlobalContext from '../context/GlobalContext';

// Lazy Loeader
import LazyLoader from '../components/LazyLoader';

export default function Home() {
    const { theme, titleSlug } = React.useContext(GlobalContext); // Access theme state

    // Path Image Original
    const path_img_or = 'https://image.tmdb.org/t/p/original'
    // Path Image W500
    const path_img_5 = 'https://image.tmdb.org/t/p/w500'

    const { fetchSections, fetchUpComing, upComing } = React.useContext(GlobalContext)

    const [trendImgWeek, setTrendImgWeek] = React.useState({}) // Get Trend Image for Week
    const [trendWeek, setTrendWeek] = React.useState([]) // Get Trend Week
    const [logo, setLogo] = React.useState([]) // Get Trend Image for Logo
    const [trendDay, setTrendDay] = React.useState([]) // Get Trend Day
    const [trendPeople, setTrendPeople] = React.useState([]) // Get Trend People
    const [loading, setLoading] = React.useState(true) // Add loading state
    const [currentSlide, setCurrentSlide] = React.useState(0); // Stato per il carosello
    const [fade, setFade] = React.useState(false); // Stato per la dissolvenza

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500) // Set loading to false after 500ms

        fetchTrend('week', setTrendWeek, setTrendImgWeek) // get Treding Week
        fetchTrend('day', setTrendDay) // get Trending Day
        fetchSections('person', 'popular', setTrendPeople) // get Trending People
        fetchUpComing({ init: 0, fin: 10, type: 'movie' }) // get Up Coming

        return () => clearTimeout(timer) // Clear timeout if component unmounts
    }, [])

    React.useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Attiva la dissolvenza
            setTimeout(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % 5); // Cambia slide
                setFade(false); // Disattiva la dissolvenza
            }, 500); // Durata della dissolvenza
        }, 7000);

        return () => clearInterval(interval) // Pulisci l'intervallo quando il componente viene smontato
    }, []);

    const currentContent = trendDay[currentSlide] || {}; // Ottieni il contenuto corrente del carosello

    // Handle For Section
    function fetchTrend(time_window, set = () => { }, setTrendImg = () => { }) {
        axios.get(`https://api.themoviedb.org/3/trending/all/${time_window}?api_key=dba9492b080738637f53df6bffa6b8c3`, {
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
                console.error('Fetch Trend', err)
            })
    }

    // Aggiorna fetchMedia per ottenere i loghi per tutti i contenuti del carosello
    function fetchMedia() {
        trendDay.slice(0, 5).forEach((content, index) => {
            if (content.media_type && content.id) {
                axios.get(`https://api.themoviedb.org/3/${content.media_type}/${content.id}/images?api_key=dba9492b080738637f53df6bffa6b8c3`)
                    .then(res => {
                        const logoOriginal = res.data.logos.find(logo => logo.iso_639_1 === content.original_language); // Trova il logo con la lingua originale
                        const logoEn = res.data.logos.find(logo => logo.iso_639_1 === 'en');
                        const logoIt = res.data.logos.find(logo => logo.iso_639_1 === 'it');

                        setLogo(prevLogos => {
                            const updatedLogos = [...prevLogos];
                            updatedLogos[index] = logoIt || logoEn || logoOriginal; // Usa il logo originale, altrimenti fallback su italiano o inglese
                            return updatedLogos;
                        });
                    })
                    .catch(err => {
                        console.error('Error fetch Media Home page', err);
                    });
            }
        });
    }

    React.useEffect(() => {
        if (trendDay.length > 0) {
            fetchMedia(); // Fetch media per i primi 5 contenuti
        }
    }, [trendDay]);

    if (loading) {
        return <Spinner /> // Show spinner while loading
    }

    function redirectToSearch() {
        // Funzione per reindirizzare alla pagina di ricerca
        window.location.href = '/search'; // Cambia l'URL della pagina corrente
    }


    return (
        <div className={`relative ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
            <div className={theme === 'dark' ? 'bg-[rgb(20,20,20)]' : 'bg-gray-300'}>
                <h1 className='text-3xl text-center py-4 title-home'>Scopri le tendenze del momento</h1>
            </div>

            {/* INPUT */}
            <div className='absolute top-22 left-0 sm:top-15 w-full flex justify-center z-10'>
                <input
                    type="text"
                    placeholder='Cerca film, serie tv o personaggi...'
                    onClick={redirectToSearch}
                    className='w-[90%] bg-[#ffffff] rounded-full p-2 text-black shadow-md'
                />
            </div>

            {/* HERO */}
            <Link to={`/${currentContent.media_type}/${currentContent.id}-${titleSlug(currentContent.title || currentContent.name)}`}>
                <div
                    style={{
                        backgroundImage: `linear-gradient(rgba(21, 26, 102, 0.5), rgba(21, 26, 102, 0.6)), url(${path_img_or + currentContent.backdrop_path})`,
                        transition: 'opacity 0.5s ease-in-out', // Transizione per la dissolvenza
                        opacity: fade ? 0 : 1, // Cambia opacità durante la dissolvenza
                    }}
                    className='h-[500px] bg-cover bg-center flex justify-center items-center hero_home text-center relative'>
                    <LazyLoader
                        image={path_img_5 + (logo[currentSlide]?.file_path || '')}
                        style={`opacity-80 px-2 transition-opacity duration-500 max-h-[400px] ${fade ? 'opacity-0' : 'opacity-100'}`} // Transizione per il logo
                    />
                </div>
            </Link>

            <FilteredSection myArray={trendWeek} title={'Questa settimana'} type={trendWeek.map(e => e.media_type)} />
            <FilteredSection myArray={trendDay} title={'Selezione di oggi'} type={trendWeek.map(e => e.media_type)} />
            <div className='mt-12'>
                <TopCast myArray={trendPeople} title={'Personaggi popolari'} />
            </div>
            <FilteredSection myArray={upComing} title={'Prossimamente'} type={'movie'} />
        </div>
    )
}
