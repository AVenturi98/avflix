import React, { useState, useContext } from "react";
import { Link } from "react-router";
import "./Carousel.css";


// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

// Context
import { useWindowWidth } from "../../context/WindowContext";
import GlobalContext from "../../context/GlobalContext";

const Carousel = ({ images }) => {

    const { titleSlug, theme } = useContext(GlobalContext)

    // Stato per gestire l'indice dell'immagine corrente
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funzione per spostarsi avanti nel carosello
    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - (mobileWidth ? 0.9 : 3)));
    };

    // Funzione per spostarsi indietro nel carosello
    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1));
    };

    // Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth <= 640

    return (
        <div className='carousel-container'>
            <button type="button" disabled={currentIndex == 0} className={`prev button ${currentIndex == 0 ? 'hidden' : ''}`} id='prev' onClick={prev}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
            <div className="carousel-wrapper">
                <div
                    className="carousel-images"
                    style={{ transform: `translateX(-${!mobileWidth ? currentIndex * 220 : currentIndex * 170}px)` }} // sposta le immagini in base all'indice
                >
                    {images.map((image, index) => (
                        <Link to={`/person/${image.id}` + '-' + titleSlug(image.name)} key={index}>
                            <div className="carousel-item" >
                                <img src={image.profile_path ? `https://image.tmdb.org/t/p/w500${image.profile_path}` : '/placeholder/PersonPlaceholder.png'} alt={image.name} className="cast-img rounded-br-full rounded-bl-full rounded-tl-full" />
                                <div className="cast-info">
                                    <h3 className="font-bold">{image.name}</h3>
                                    <p className="font-medium italic">Popularity:
                                        <span
                                            className={image.popularity > 100 ? 'text-green-500' : '' ||
                                                image.popularity < 100 ? 'text-blue-500' : '' ||
                                                    image.popularity < 80 ? 'text-orange-400' : '' ||
                                                        image.popularity <= 50 ? 'text-orange-700' : ''}>{image.popularity}</span></p>
                                </div>
                            </div></Link>
                    ))}
                </div>
            </div>
            <button type="button" disabled={currentIndex === 6 && !mobileWidth} className={`next button ${currentIndex === 6 && !mobileWidth ? 'hidden' : ''} ${currentIndex === 9 && mobileWidth ? 'hidden' : ''}`} onClick={next}>
                <FontAwesomeIcon icon={faCircleArrowRight} style={{ color: theme === 'dark' ? '#ffffff' : '' }} />
            </button>
        </div>
    );
};

export default Carousel;
