import React, { useState, useContext } from "react";
import Modal from "react-modal";

// Lazy Loader
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";

//Context
import GlobalContext from "../../context/GlobalContext";

// Definiamo l'elemento principale dell'app per evitare il warning
Modal.setAppElement("#root");

const CollageGallery = ({ images = [] }) => {
    const { mobileWidth } = useContext(GlobalContext)
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (index) => {
        setSelectedIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedIndex(null);
    };

    const nextImage = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const visibleImages = images.slice(0, 4);
    const extraImagesCount = images.length - visibleImages.length;


    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "5px", maxWidth: "600px" }} >
            {visibleImages.map((img, index) => (
                <div key={index} style={{ position: "relative", cursor: "pointer" }} onClick={() => openModal(index)}>
                    <LazyLoadImage
                        alt={img.title || img.name}
                        effect="blur"
                        wrapperProps={{
                            // If you need to, you can tweak the effect transition using the wrapper style.
                            style: { transitionDelay: "1s" },
                        }}
                        src={img.src}
                        className="w-full h-auto rounded-md" />
                    {index === 3 && extraImagesCount > 0 && (
                        <div style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "24px",
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}>
                            +{extraImagesCount}
                        </div>
                    )}
                </div>
            ))}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" },
                    content: {
                        width: "80%",
                        height: mobileWidth ? "60vh" : "80vh",
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        padding: "10px",
                        textAlign: "center",
                        overflowX: "hidden"
                    }
                }}
            >
                <div className="absolute text-black lg:text-white top-5 left-5 z-50">
                    {(selectedIndex + 1) + ' / ' + images.length}
                </div>
                {selectedIndex !== null && (
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button onClick={prevImage} style={{ zIndex: 100, position: "absolute", left: "10px" }} className="text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <div className="absolute top-[50%] left-[50%]" style={{ transform: 'translate(-50%, -50%)', width: '100%' }}>
                            <img src={images[selectedIndex].src} alt="Selected" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }} />

                        </div>
                        <button onClick={nextImage} style={{ position: "absolute", right: "10px" }} className="text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button onClick={closeModal} className="hover:text-gray-300 text-black lg:text-white p-3">
                            <FontAwesomeIcon icon={faX} className="absolute top-2 right-2" />
                        </button>
                    </div>
                )}
            </Modal>

        </div>
    )
}

export default CollageGallery;
