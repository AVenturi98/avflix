import * as React from 'react';
import GlobalContext from '../context/GlobalContext';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default function Favorites() {
    const { favorites, fetchItemDetails, handleAddFavorite } = React.useContext(GlobalContext);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectMode, setSelectMode] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [showSelectButton, setShowSelectButton] = React.useState(false);

    React.useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            const items = [];
            for (const fav of favorites) {
                try {
                    const item = await fetchItemDetails(fav.type, fav.id);
                    items.push(item);
                } catch (error) {
                    console.error('Error fetching favorite item:', error);
                }
            }
            setFavoriteItems(items);
            setLoading(false);
        };

        if (favorites.length > 0) {
            fetchFavorites();
        } else {
            setFavoriteItems([]);
            setLoading(false);
        }
    }, [favorites, fetchItemDetails]);

    const toggleSelectMode = () => {
        setSelectMode(!selectMode);
        setSelectedItems([]);
        if (selectMode) {
            setShowSelectButton(false); // Nasconde il pulsante quando si annulla
        }
    };

    const toggleSelectItem = (item) => {
        if (selectedItems.some(selected => selected.id === item.id)) {
            setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const removeSelected = () => {
        setShowModal(true);
    };

    const confirmRemove = () => {
        selectedItems.forEach(item => {
            handleAddFavorite(item); // This will remove since it's already favorite
        });
        setSelectedItems([]);
        setSelectMode(false);
        setShowSelectButton(false);
    };

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="min-h-screen px-5 md:px-30 bg-gray-100 dark:bg-gray-900 p-4">
            <div className="flex items-center justify-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Preferiti</h1>
                <button
                    onClick={() => {
                        setShowSelectButton(!showSelectButton);
                        setSelectedItems([]);
                        setSelectMode(false);

                    }}
                    className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                    title="Opzioni"
                >
                    <FontAwesomeIcon icon={faCog} className="text-gray-600 dark:text-gray-300" />
                </button>
            </div>
            {showSelectButton && (
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        onClick={toggleSelectMode}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        {selectMode ? 'Annulla Selezione' : 'Seleziona'}
                    </button>
                    {selectMode && selectedItems.length > 0 && (
                        <button
                            onClick={removeSelected}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Rimuovi Selezionati ({selectedItems.length})
                        </button>
                    )}
                </div>
            )}
            {favoriteItems.length === 0 ? (
                <p className="text-lg text-gray-700 dark:text-gray-300 text-center">Non ci sono preferiti. Aggiungi film o serie tv!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoriteItems.map((item) => (
                        <div key={item.id} className="relative">
                            {selectMode && (
                                <input
                                    type="checkbox"
                                    checked={selectedItems.some(selected => selected.id === item.id)}
                                    onChange={() => toggleSelectItem(item)}
                                    className="absolute top-2 right-2 z-10 h-10 w-10"
                                />
                            )}
                            <Card
                                item={item}
                                type={item.title ? 'movie' : 'tv'}
                                image={item.poster_path ? 'https://image.tmdb.org/t/p/w500' + item.poster_path : '/placeholder/moviesPlaceholder.png'}
                            />
                        </div>
                    ))}
                </div>
            )}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmRemove}
                message={`Sei sicuro di voler rimuovere ${selectedItems.length} elemento/i dai preferiti?`}
                confirmText="Rimuovi"
                cancelText="Annulla"
            />
        </div>
    );
}