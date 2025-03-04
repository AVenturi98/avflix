import * as React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
const KEY = import.meta.env.VITE_API_KEY
import Modal from "react-modal";

// Lazy Loader
import LazyLoader from '../../components/LazyLoader';

// Components
import BtnSwitchWord from '../../components/BtnSwitchWord'
import AllMedia from '../../components/AllMedia'

//Context
import GlobalContext from '../../context/GlobalContext'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";

export default function MediasPage({ type }) {

    // Path Img
    const path_img = `https://image.tmdb.org/t/p/original`

    const { fetchMedia, loading } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([])
    const [viewModeImg, setViewModeImg] = React.useState('sfondi') // set View Mode
    const [backdrops, setBackdrops] = React.useState([]) // set Images Backdrop
    const [posters, setPosters] = React.useState([]) // set Images Poster
    const [logos, setLogos] = React.useState([]) // set Images Logo


    const { id } = useParams()

    // Globla fetch
    function fetchMovieId() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}`,
            params: { language: 'it-IT' },
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmE5NDkyYjA4MDczODYzN2Y1M2RmNmJmZmE2YjhjMyIsIm5iZiI6MTczNDAwMTk5My42MzkwMDAyLCJzdWIiOiI2NzVhYzU0OTlhZTUyNmQ1MDhhOWNmOGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5QxtZmHBD5OWY4MsxJKFi1Me51dzgXlbXp0-CsDINX8'
            }
        };

        axios
            .request(options)
            .then(res => {
                setPost(res.data)
                // console.log(res.data)
            })
            .catch(err => console.error('Error fetch movie to Medias Page', err));
    }

    React.useEffect(() => {
        fetchMovieId() // global fetch
        fetchMedia(id, type, () => { }, setBackdrops) // handle images backdrop
        fetchMedia(id, type, () => { }, () => { }, setPosters) // handle images poster
        fetchMedia(id, type, () => { }, () => { }, () => { }, setLogos) // handle images logo

        document.documentElement.scrollTop = 0

    }, [])



    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const openModal = (index) => {
        setSelectedIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedIndex(null);
    };

    const nextImage = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % backdrops.length);
    };

    const prevImage = () => {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + backdrops.length) % backdrops.length);
    }


    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">{post.title || post.name}</h1>

                {/* IMAGES */}
                <div className="flex justify-center mb-8">
                    <BtnSwitchWord text1={'sfondi'}
                        length1={backdrops.length}
                        text2={'poster'}
                        length2={posters.length}
                        text3={'logo'}
                        length3={logos.length}
                        set1={() => setViewModeImg('sfondi')}
                        set2={() => setViewModeImg('poster')}
                        set3={() => setViewModeImg('logo')}
                        styleSelected={'bg-green-500'}
                        flex={'flex flex-wrap sm:flex-nowrap gap-2'} />
                </div>

                {/* SFONDI */}
                {viewModeImg === 'sfondi' && backdrops.length > 0 ?
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {backdrops.map((e, i) =>
                            <div key={i} className="relative cursor-pointer" onClick={() => openModal(i)} >
                                <LazyLoader image={e.file_path ? path_img + e.file_path : path_img + e}
                                    style={"w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"} />
                            </div>
                        )}
                    </div>
                    : !backdrops.length > 0 && viewModeImg === 'sfondi' ?
                        <div className='flex justify-center'>Nessun sfondo disponibile</div> : ''}

                {/* POSTER */}
                {viewModeImg === 'poster' && posters.length > 0 ?
                    <AllMedia myArray={posters} />
                    : !posters.length > 0 && viewModeImg === 'poster' ?
                        <div className='flex justify-center'>Nessun poster disponibile</div> : ''}

                {/* LOGO */}
                {viewModeImg === 'logo' && logos.length > 0 ?
                    <AllMedia myArray={logos} />
                    : !logos.length > 0 && viewModeImg === 'logo' ?
                        <div className='flex justify-center'>Nessun logo disponibile</div> : ''}
            </div>

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
                    {(selectedIndex + 1) + ' / ' + backdrops.length}
                </div>
                {selectedIndex !== null && (
                    <div className='relative w-full h-full flex items-center justify-center'>
                        <button type='button' onClick={prevImage} className="absolute left-[10px] z-50 text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <div className='absolute top-[50%] left-[50%] w-full' style={{ transform: 'translate(-50%, -50%)' }}>
                            <LazyLoader image={path_img + backdrops[selectedIndex].file_path} style={'max-w-full max-h-full object-contain border-md'} />
                        </div>
                        <button type='button' onClick={nextImage} className="absolute right-[10px] text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button type='button' onClick={closeModal} className="hover:text-gray-300 p-3">
                            <FontAwesomeIcon icon={faX} className="absolute top-2 right-2" />
                        </button>
                    </div>
                )}
            </Modal>
        </>
    )
} 