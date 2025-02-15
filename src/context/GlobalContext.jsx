import React, { createContext } from 'react';
import axios from 'axios';
import KEY from '../KEY';
import { useWindowWidth } from './WindowContext';



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




    // fetch Movies
    function fetchMovies(type, indexPage, set, setTotalPage = () => { }, setCast = () => { }) {
        axios.get(`https://api.themoviedb.org/3/${type}/popular${KEY}`, {
            params: {
                language: 'it-IT',
                page: indexPage
            },
        })
            .then(res => {
                set(res.data.results);
                setTotalPage(new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'))
                // console.log(res)
                res.data.results.forEach(movie => setCast(movie.id));// Pass movie id to setCast
            })
            .catch(err => {
                setTotalPage([])
                console.log(err)
            })
    }

    /**
     * 
     * @param {*id} id 
     * @param {*movies / tv} type 
     * @param {*images / videos} section 
     * @param {*for background img} setFirstImg 
     * @param {*foe all images} setImgs 
     */

    // Handle images
    function fetchMedia(id, type, setFirstImg = () => { }, setImgs = () => { }, setPoster = () => { }) {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/images${KEY}`)
            .then(res => {
                if (res.data.backdrops.length > 0) {
                    setFirstImg(`https://image.tmdb.org/t/p/original` + res.data.backdrops[0].file_path)
                    setImgs(res.data.backdrops)
                    setPoster(res.data.posters)
                    // console.log('Media', res.data)
                }
            })
            .catch(err => {
                console.log('Error fetch media Global Context', err)
            });
    }

    // Videos fetch
    function fetchVideos(type, id, setAllVideos) {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos${KEY}`)
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
                console.log('Error fetch video Global Context', err)
            })
    }

    // Handle For Section
    function fetchSections(typeSection, section, set, page) {
        axios.get(`https://api.themoviedb.org/3/${typeSection}/${section}${KEY}`, {
            params: {
                language: 'it-IT',
                page: page
            },
        })
            .then(res => {
                set(prev => [...prev, ...res.data.results])
                console.log('Fetch Section', res)
            })
            .catch(err => {
                console.log('Fetch section Global Context', err)
            })
    }

    // Credits fetch (cast, crew)
    function fetchCreditsId(type, id) {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}/credits${KEY}`,
            params: { language: 'it-IT' },
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

    const currentDate = new Date().toISOString().split('T')[0];

    //fetch Up Coming
    function fetchUpComing({ init, fin, type }) {
        let allUpComing = [];
        for (let i = 1; i <= 10; i++) {
            axios.get(`https://api.themoviedb.org/3/${type}/upcoming${KEY}`, {
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
                    console.log('Error fetching upcoming movies:', err)
                })
        }
    }

    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640
    return (
        <GlobalContext.Provider value={{
            fetchSections, fetchMovies, fetchMedia, fetchVideos, fetchCreditsId, fetchUpComing, mobileWidth,
            showMoreMovies, setShowMoreMovies,
            showMoreSeries, setShowMoreSeries,
            cast, setCast,
            crew, setCrew,
            videos, setVideos,
            videoPrev, setVideoPrev,
            upComing
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext