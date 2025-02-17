import * as React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import KEY from '../../KEY'
import Modal from "react-modal";


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

    const { fetchMedia } = React.useContext(GlobalContext)

    const [post, setPost] = React.useState([])
    const [viewModeImg, setViewModeImg] = React.useState('sfondi') // set View Mode
    const [backdrops, setBackdrops] = React.useState([]) // set Images Backdrop
    const [posters, setPosters] = React.useState([]) // set Images Poster

    const { id } = useParams()

    // Globla fetch
    function fetchMovieId() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${type}/${id}${KEY}`,
            params: { language: 'it-IT' },
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
            <div className="container mx-auto px-4 py-8" style={{
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 1%, rgba(0,0,0,1) 99.5%, rgba(0,0,0,0) 100%)',
            }}>
                <h1 className="text-4xl font-bold text-center mb-8">{post.title || post.name}</h1>

                {/* IMAGES */}
                <div className="flex justify-center mb-8">
                    <BtnSwitchWord text1={'sfondi'}
                        length1={backdrops.length}
                        text2={'poster'}
                        length2={posters.length}
                        set1={() => setViewModeImg('sfondi')}
                        set2={() => setViewModeImg('poster')}
                        styleSelected={'bg-green-500'} />
                </div>

                {viewModeImg === 'sfondi' ?
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {backdrops.map((e, i) =>
                            <div key={i} className="relative cursor-pointer" onClick={() => openModal(i)} >
                                <img src={e.file_path ? path_img + e.file_path : path_img + e} alt={e.name} className="w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" />
                            </div>
                        )}
                    </div>
                    : !backdrops.length > 0 ?
                        <div className='flex justify-center'>Nessun poster disponibile</div> : ''}
                {viewModeImg === 'poster' ?
                    <AllMedia myArray={posters} />
                    : !posters.length > 0 ?
                        <div className='flex justify-center'>Nessun poster disponibile</div> : ''}
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
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button type='button' onClick={prevImage} style={{ position: "absolute", left: "10px", zIndex: 100 }} className="text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <div className='absolute top-[50%] left-[50%]' style={{ transform: 'translate(-50%, -50%)', width: '100%' }}>
                            <img src={path_img + backdrops[selectedIndex].file_path} alt="Selected" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }} />
                        </div>
                        <button type='button' onClick={nextImage} style={{ position: "absolute", right: "10px" }} className="text-3xl bg-[rgba(4,45,73,0.3)] hover:bg-gray-300 p-5 rounded-xl">
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