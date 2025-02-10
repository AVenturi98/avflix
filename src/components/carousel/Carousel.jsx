import React, { useState } from "react";
import "./Carousel.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ images }) => {
    // Stato per gestire l'indice dell'immagine corrente
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funzione per spostarsi avanti nel carosello
    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 3));
    };

    // Funzione per spostarsi indietro nel carosello
    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1));
    };

    return (
        <div className="carousel-container">
            <button type="button" disabled={currentIndex == 0} className={`prev button ${currentIndex == 0 ? 'hidden' : ''}`} id='prev' onClick={prev}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
            <div className="carousel-wrapper">
                <div
                    className="carousel-images"
                    style={{ transform: `translateX(-${currentIndex * 220}px)` }} // sposta le immagini in base all'indice
                >
                    {images.map((image, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={`https://image.tmdb.org/t/p/w200${image.profile_path}`} alt={image.name} className="cast-img rounded-br-full rounded-bl-full rounded-tl-full" />
                            <div className="cast-info">
                                <h3 className="font-bold">{image.name}</h3>
                                <p className="font-medium italic">Popularity:
                                    <span
                                        className={image.popularity > 100 ? 'text-green-500' : '' ||
                                            image.popularity < 100 ? 'text-blue-500' : '' ||
                                                image.popularity < 80 ? 'text-orange-400' : '' ||
                                                    image.popularity <= 50 ? 'text-orange-700' : ''}>{image.popularity}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button type="button" disabled={currentIndex === 6} className={`next button ${currentIndex === 6 ? 'hidden' : ''}`} onClick={next}>
                <FontAwesomeIcon icon={faCircleArrowRight} />
            </button>
        </div>
    );
};

export default Carousel;
