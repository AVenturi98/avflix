import React, { useState } from "react";
import Modal from "react-modal";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";

// Definiamo l'elemento principale dell'app per evitare il warning
Modal.setAppElement("#root");

const CollageGallery = ({ images = [] }) => {
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
                    <img src={img.src} alt={img.alt || "Image"} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
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
                        height: "60vh",
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
                <div className="absolute top-5 left-5 z-50">
                    {(selectedIndex + 1) + ' / ' + images.length}
                </div>
                {selectedIndex !== null && (
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button onClick={prevImage} style={{ position: "absolute", left: "10px" }} className="text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <img src={images[selectedIndex].src} alt="Selected" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }} />
                        <button onClick={nextImage} style={{ position: "absolute", right: "10px" }} className="text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button onClick={closeModal} className="hover:text-gray-300 p-3">
                            <FontAwesomeIcon icon={faX} className="absolute top-2 right-2" />
                        </button>
                    </div>
                )}
            </Modal>

        </div>
    )
}

export default CollageGallery;
