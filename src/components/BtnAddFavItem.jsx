import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heart } from "@fortawesome/free-regular-svg-icons";



export default function BtnAddFavItem({ post }) {
    const { favorites, handleAddFavorite } = useContext(GlobalContext); // Access favorites and handleAddFavorite from context

    const type = post.title ? 'movie' : 'tv';
    const isFavorite = favorites.some(fav => fav.id === post.id && fav.type === type);

    console.log(favorites, 'button') // Log favorites to check if it's working

    return (
        <button
            className={`px-4 py-2 rounded flex items-center gap-2 border-2 w-[50%] ${isFavorite ? 'bg-red-500 text-white border-red-300' : 'bg-white text-black border-white'}`}
            onClick={() => handleAddFavorite(post)}
        >
            <FontAwesomeIcon icon={isFavorite ? faHeart : heart} />
            {isFavorite ? 'Rimuovi dai Preferiti' : 'Aggiungi ai Preferiti'}
        </button>
    );
}