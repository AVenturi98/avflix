import React, { createContext } from 'react';
import axios from 'axios';
import KEY from '../KEY';
import { useWindowWidth } from './WindowContext';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    // Set Buttons
    const [showMoreMovies, setShowMoreMovies] = React.useState(false) //set Show More Movies
    const [showMoreSeries, setShowMoreSeries] = React.useState(false) //set Show More Series


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

    // Handle images
    function fetchImages(movie_id, type, section, setImg) {
        axios.get(`https://api.themoviedb.org/3/${type}/${movie_id}/${section}${KEY}`)
            .then(res => {
                if (res.data.backdrops.length > 0) {
                    setImg(`https://image.tmdb.org/t/p/original${res.data.backdrops[0].file_path}`)
                }
            })
            .catch(err => {
                console.log(err)
            });
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
            })
            .catch(err => {
                console.log(err)
            })
    }


    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640
    return (
        <GlobalContext.Provider value={{
            fetchSections, fetchMovies, fetchImages, mobileWidth,
            showMoreMovies, setShowMoreMovies,
            showMoreSeries, setShowMoreSeries
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext