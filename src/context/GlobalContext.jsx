import React, { createContext } from 'react';
import axios from 'axios';
const KEY = import.meta.env.VITE_API_KEY
const HEADER_KEY = import.meta.env.VITE_API_KEY_OPTION
import { useWindowWidth } from './WindowContext';


import BtnBackTop from '../components/BtnBackTop';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    // Set Buttons
    const [showMoreMovies, setShowMoreMovies] = React.useState(false) //set Show More Movies
    const [showMoreSeries, setShowMoreSeries] = React.useState(false) //set Show More Series

    const [cast, setCast] = React.useState([]) // set Cast
    const [crew, setCrew] = React.useState([]) // set Crew

    const [videos, setVideos] = React.useState([]) // set Videos
    const [videoPrev, setVideoPrev] = React.useState([]) // set Videos
    const [upComing, setUpComing] = React.useState([]) // set Up Coming

    const [person, setPerson] = React.useState([]) // set Person ID

    const [theme, setTheme] = React.useState('light'); // Add theme state

    React.useEffect(() => {
        document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme'; // Apply theme class to body
    }, [theme]);

    // SLUG
    const titleSlug = (title) => (title).toLowerCase().replace(/ /g, '_');

    // Loader
    const [loader, setLoader] = React.useState(false)

    const [loading, setLoading] = React.useState(false)


    // fetch Popular Movies
    function fetchMovies(type, indexPage, set, setTotalPage = () => { }, setCast = () => { }) {


        axios.get(`https://api.themoviedb.org/3/${type}/popular?api_key=dba9492b080738637f53df6bffa6b8c3`, {
            params: {
                language: 'it-IT',
                page: indexPage
            },
        })
            .then(res => {
                set(res.data.results);
                setTotalPage(new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'))
                // console.log('Posts Context', res)
                res.data.results.forEach(movie => setCast(movie.id));// Pass movie id to setCast
            })
            .catch(err => {
                setTotalPage([])
                console.error('Error fetchMovies to GlobalContext', err)
            })
    }

    /**
     * FETCH MEDIA
     * 
     * @param {*id} id 
     * @param {*movies / tv} type 
     * @param {*images / videos} section 
     * @param {*for background img} setFirstImg 
     * @param {*foe all images} setImgs 
     */

    // Fetch images
    function fetchMedia(id, type,
        setFirstImg = () => { },
        setImgs = () => { },
        setPoster = () => { },
        setLogo = () => { }) {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=dba9492b080738637f53df6bffa6b8c3`)
            .then(res => {
                if (res.data.backdrops.length > 0 ||
                    res.data.posters.length > 0 ||
                    res.data.logos.length > 0) {
                    setFirstImg(res.data.backdrops[0].file_path ? `https://image.tmdb.org/t/p/original` + res.data.backdrops[0].file_path : null)
                    setImgs(res.data.backdrops)
                    setPoster(res.data.posters)
                    setLogo(res.data.logos)
                    // console.log('Media Global Context', res.data.logos)
                }
            })
            .catch(err => {
                console.error('Error fetch media Global Context', err)
            });
    }

    // Videos fetch
    function fetchVideos(type, id, setAllVideos) {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=dba9492b080738637f53df6bffa6b8c3`)
            .then(res => {
                setVideos(res.data.results[0])
                setAllVideos(res.data.results)
                setVideoPrev(prevVideos => {

                    const newVideos = [...prevVideos, ...res.data.results.map(video => ({ ...video, movie_id: res.data.id }))]
                    // Remove duplicates
                    const uniqueVideos = newVideos.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
                    return uniqueVideos;
                })
                // console.log('videos', res.data.results)
            })
            .catch(err => {
                console.error('Error fetch video Global Context', err)
            })
    }

    /**
     * FECTH SECTIONS   
     * 
     * @param {movie, tv, person, ect. (String)} typeSection 
     * @param {popular, credits, ect. (String)} section 
     * @param {function to iterable} set 
     * @param {page to get content} page 
     * @param {id} id 
     */

    // Fetch For Section
    function fetchSections(typeSection, section, set, page, id) {
        axios.get(`https://api.themoviedb.org/3/${typeSection}/${id ? id + '/' : ''}${section}?api_key=dba9492b080738637f53df6bffa6b8c3`, {
            params: {
                language: 'it-IT',
                page
            },
        })
            .then(res => {
                set(prev => [...prev, ...res.data.results])
                // console.log('Fetch Section', res)
            })
            .catch(err => {
                console.error('Fetch section Global Context', err)
            })
    }


    // Fetch Section whit ID
    function fetchSectionID(type, id, section, setResults = () => { }, setData = () => { }) {

        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/${section}?api_key=dba9492b080738637f53df6bffa6b8c3`, {
            params: {
                language: 'it-IT'
            },
        })
            .then(res => {
                setResults(res.data.results)
                setData(res.data)
                setLoading(false)
                // console.log('Section ID Global Context', res.data)
            })
            .catch(err => {
                console.error('Fetch Section ID GLobal Context', err)
            })
    }

    // Fetch Credits (cast, crew)
    function fetchCreditsId(type, id) {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=dba9492b080738637f53df6bffa6b8c3`,
            params: { language: 'it-IT' }
        };

        axios
            .request(options)
            .then(res => {
                setCast(res.data.cast.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
                setCrew(res.data.crew.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
                // console.log('Cast', res.data)
            })
            .catch(err => console.error('Error fetch credits Global Context', err))
    }


    const currentDate = new Date().toISOString().split('T')[0] //get current date

    //Fetch Up Coming
    function fetchUpComing({ init, fin, type }) {
        let allUpComing = [];
        for (let i = 1; i <= 10; i++) {
            axios.get(`https://api.themoviedb.org/3/${type}/upcoming?api_key=dba9492b080738637f53df6bffa6b8c3`, {
                params: {
                    language: 'it-IT',
                    page: i
                },
            })
                .then(res => {
                    const filtered = res.data.results.filter(movie => movie.release_date > currentDate);
                    allUpComing = [...allUpComing, ...filtered];
                    // Remove duplicates
                    allUpComing = allUpComing.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                    if (allUpComing.length >= 5) {
                        setUpComing(allUpComing.slice(init, fin));
                        allUpComing.forEach(movie => fetchVideos('movie', movie.id, () => { })); // Fetch videos for each upcoming movie
                        return;
                    }
                })
                .catch(err => {
                    console.error('Error fetching upcoming movies:', err)
                })
        }
    }


    // Fetch Global Person Id
    function fetchPersonId(id) {

        setLoading(true)

        axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=dba9492b080738637f53df6bffa6b8c3`, {
            params: {
                language: 'en-US'
            },
        })
            .then(res => {
                setPerson(res.data)
                setLoading(false)
                // console.log('Person Id Person Page', res.data)

            })
            .catch(err => {
                console.error('Error Person Page', err)
            })
    }

    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640
    return (
        <GlobalContext.Provider value={{
            fetchSections, fetchMovies, fetchMedia, fetchVideos, fetchCreditsId, fetchUpComing, fetchSectionID, fetchPersonId, mobileWidth,
            showMoreMovies, setShowMoreMovies,
            showMoreSeries, setShowMoreSeries,
            cast, setCast,
            crew, setCrew,
            videos, setVideos,
            videoPrev, setVideoPrev,
            upComing,
            currentDate,
            person, setPerson,
            titleSlug,
            loader, setLoader,
            loading, setLoading,
            theme, setTheme, // Expose theme and setTheme
        }}>
            {children}
            <BtnBackTop />
        </GlobalContext.Provider>
    )
}

export default GlobalContext