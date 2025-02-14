import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"

export default function BtnsModal({ images }) {
    const { selectedIndex, nextImage, prevImage } = useContext(GlobalContext)
    return (
        <>
            {selectedIndex !== null && (
                <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button onClick={prevImage} style={{ position: "absolute", left: "10px" }}>&lt;</button>
                    <img src={images[selectedIndex]} alt="Selected" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }} />
                    <button onClick={nextImage} style={{ position: "absolute", right: "10px" }}>&gt;</button>
                </div>
            )}
        </>
    )
}