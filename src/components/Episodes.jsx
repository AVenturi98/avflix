import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
const KEY = import.meta.env.VITE_API_KEY

// Context
import GlobalContext from '../context/GlobalContext'

export default function Episodes({ id, type, episodeFiltered, seasonNumber, selectedSeason, idWatch, theme }) {

    const { mobileWidth, overTextLong, readMore, setReadMore } = React.useContext(GlobalContext)

    const [episode, setEpisode] = React.useState([]) // set Show Episode
    const [selectedEpisode, setSelectedEpisode] = React.useState(() => {
        // Inizializza lo stato dal localStorage
        return localStorage.getItem(`selectedEpisode_${id}_${seasonNumber}`) || ''
    }) // set Show Selected Episode



    // Seasons-Episodes fetch (only tv)
    function fetchEpisodes() {
        axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber || 1}${KEY}`, {
            params: {
                language: 'it-IT'
            }
        })
            .then(res => {
                setEpisode(res.data.episodes)
                // console.log('Episodi', res.data)
            })
            .catch(err => {
                console.log('Error fetch episodes to Show Page', err)
            })
    };


    // effettuo la chiamata solo se il type è relativo a tv

    React.useEffect(() => {
        {
            type === 'tv' &&
                fetchEpisodes()
        }

    }, [selectedSeason]);

    // Salva l'episodio selezionato nel localStorage
    React.useEffect(() => {
        if (selectedEpisode) {
            localStorage.setItem(`selectedEpisode_${id}_${seasonNumber}`, selectedEpisode)
        }
    }, [selectedEpisode, id, seasonNumber]);

    // Resetta l'episodio quando cambia la stagione
    React.useEffect(() => {
        const savedEpisode = localStorage.getItem(`selectedEpisode_${id}_${seasonNumber}`)
        setSelectedEpisode(savedEpisode || '')
    }, [seasonNumber, id]);


    return (
        <>
            {/* EPISODES */}
            {episode &&
                <div className='w-[100%] p-2'>
                    <h2 className='font-extrabold text-3xl my-2'>Episodi</h2>
                    <div className={`flex items-${selectedEpisode ? 'start' : 'center'} gap-6`}>
                        <select disabled={!selectedSeason} name="episodes" id="episodes"
                            value={selectedEpisode}
                            onChange={(e) => setSelectedEpisode(e.target.value)}
                            className='mt-4 mb-6 cursor-pointer hover:bg-blue-200 p-0.5 rounded-xl border-2 border-emerald-500'>
                            <option>{selectedSeason ? 'Episodi'
                                : !selectedSeason ? 'Scegli prima una stagione'
                                    : episode.length = 0 ? 'Nessun episodio disponibile' : ''}</option>
                            {episodeFiltered.map((e, i) =>
                                <option key={i} value={i + 1}>{'Episodio ' + (i + 1)}</option>
                            ) ||
                                episodeFiltered[0].map((e, i) =>
                                    <option key={i} value={i + 1}>{'Episodio ' + (i + 1)}</option>
                                )}
                        </select>
                        <label htmlFor="episodes" className='grow-9'>
                            {selectedEpisode ?
                                <div className={`${theme === 'dark' ? 'contain-btn-dettails-dark' : 'contain-btn-dettails'} w-[47%] sm:w-[30%] text-center my-3`}>
                                    <Link to={`https://vixsrc.to/tv/${idWatch}/${seasonNumber}/${selectedEpisode}`} >
                                        <p>guarda ora </p>
                                    </Link>
                                </div>
                                : <p className='opacity-30 px-2'>scegli l'episodio</p>
                            }
                        </label>
                    </div>

                    <div className='text-white'>
                        {episodeFiltered.filter((e, i) => (i + 1) == selectedEpisode).map(e =>
                            <div key={e.id} className='flex gap-5 rounded-xl' style={{
                                backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.6), rgba(1, 1, 22, ${readMore && !mobileWidth ? '1' : '0.8'})), url(${'https://image.tmdb.org/t/p/w500' + e.still_path})`,
                                backgroundPosition: 'center center', backgroundSize: 'cover'
                            }}>
                                <div className='p-5 px-4 lg:py-8 sm:py-6 grow-1'>
                                    {e.episode_number &&
                                        <div>
                                            <h3 className='font-extrabold'>Episodio
                                                <span>{' ' + e.episode_number}</span>
                                            </h3>
                                        </div>}
                                    <div className='flex items-center justify-between'>
                                        {e.name &&
                                            <div>
                                                <h3 className='font-extrabold'>Titolo</h3>
                                                <p className='border-2 border-green-500 py-1 px-3 rounded-4xl'>{e.name}</p>
                                            </div>}
                                        {e.runtime &&
                                            <div className='grow-1 text-center max-w-[20%]'>
                                                <h3 className='font-extrabold'>Durata</h3>
                                                <div className='text-center border-2 border-green-500 p-1 rounded-4xl flex gap-0.5 flex-wrap'>
                                                    <p>{e.runtime}</p>
                                                    <p>{mobileWidth ? "'" : 'minuti'}</p>
                                                </div>
                                            </div>}
                                    </div>
                                    {e.air_date ?
                                        <div>
                                            <h3 className='font-extrabold'>Data d'uscita</h3>
                                            <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{new Date(e.air_date).toLocaleDateString()}</p>
                                        </div> : ''}
                                    {e.overview &&
                                        <div>
                                            <h3 className='font-extrabold'>Trama</h3>
                                            <p className='text-center border-2 border-green-500 p-2 rounded-4xl'>{!mobileWidth ? overTextLong(e.overview, 50) + '...' : e.overview}
                                                {!mobileWidth &&
                                                    <span className='text-green-400'>
                                                        <button type="button" onClick={() => setReadMore(true)}> leggi tutto</button>
                                                    </span>}
                                            </p>

                                            {readMore && !mobileWidth &&
                                                <div className='center_position bg-amber-400 w-[80%] h-[80%] rounded-md flex justify-center items-center'>
                                                    <button type="button" onClick={() => setReadMore(false)} className='absolute top-2 right-2 text-red-500'>X</button>
                                                    <div className='flex flex-col gap-3 p-3'>
                                                        <h1 className='text-center font-bold'>Trama: {e.name}</h1>
                                                        <hr />
                                                        <p>{e.overview}</p>
                                                    </div>
                                                </div>}
                                        </div>}
                                </div>

                            </div>
                        )}
                        {episode.slice(0, 1).map(e =>
                            <div key={e.id} className={`flex gap-5 rounded-xl sm:h-[350px] ${selectedEpisode ? 'hidden' : ''}`} style={{
                                backgroundImage: `linear-gradient(rgba( ${readMore && !mobileWidth ? '20, 20, 20, 1' : '1, 1, 22, 0.65'}), rgba( ${readMore && !mobileWidth ? '20, 20, 20, 1' : '1, 1, 22, 0.8'})), url(${'https://image.tmdb.org/t/p/w500' + e.still_path})`,
                                backgroundPosition: 'center center', backgroundSize: 'cover'
                            }}>
                                <div className='p-5 px-4 lg:py-8 sm:py-6 grow-1'>
                                    {e.episode_number &&
                                        <div>
                                            <h3 className='font-extrabold'>Episodio
                                                <span>{' ' + e.episode_number}</span>
                                            </h3>
                                        </div>}
                                    <div className='flex items-center justify-between'>
                                        {e.name &&
                                            <div>
                                                <h3 className='font-extrabold'>Titolo</h3>
                                                <p className='border-2 border-green-500 py-1 px-3 rounded-4xl'>{e.name}</p>
                                            </div>}
                                        {e.runtime &&
                                            <div className='grow-1 text-center max-w-[20%]'>
                                                <h3 className='font-extrabold'>Durata</h3>
                                                <div className='text-center border-2 border-green-500 p-1 rounded-4xl flex gap-0.5'>
                                                    <p>{e.runtime}</p>
                                                    <p>{mobileWidth ? "'" : 'minuti'}</p>
                                                </div>
                                            </div>}
                                    </div>
                                    {e.air_date &&
                                        <div>
                                            <h3 className='font-extrabold'>Data d'uscita</h3>
                                            <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{new Date(e.air_date).toLocaleDateString()}</p>
                                        </div>}
                                    {e.overview &&
                                        <div>
                                            <h3 className='font-extrabold'>Trama</h3>
                                            <p className='text-center border-2 border-green-500 p-2 rounded-4xl'>{!mobileWidth ? overTextLong(e.overview, 50) + ' ' : e.overview}
                                                {!mobileWidth &&
                                                    <span className='text-green-400'>
                                                        <button type="button" onClick={() => setReadMore(true)}> leggi tutto</button>
                                                    </span>}
                                            </p>

                                            {readMore && !mobileWidth &&
                                                <div className='center_position bg-amber-400 w-[80%] h-[80%] rounded-md flex justify-center items-center'>
                                                    <button type="button" onClick={() => setReadMore(false)} className='absolute top-2 right-2 text-red-500'>X</button>
                                                    <div className='flex flex-col gap-3 p-3'>
                                                        <h1 className='text-center font-bold'>Trama: {e.name}</h1>
                                                        <hr />
                                                        <p>{e.overview}</p>
                                                    </div>
                                                </div>}
                                        </div>}
                                </div>

                            </div>
                        )}

                    </div>
                </div>}
        </>
    )
}