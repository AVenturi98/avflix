import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'

// Context
import GlobalContext from '../context/GlobalContext'

export default function Episodes({ id, type, episodeFiltered, seasonNumber, selectedSeason }) {

    const { mobileWidth } = React.useContext(GlobalContext)

    const [episode, setEpisode] = React.useState([]) // set Show Episode
    const [selectedEpisode, setSelectedEpisode] = React.useState('') // set Show Selected Episode



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
    }


    // effettuo la chiamata solo se il type è relativo a tv

    React.useEffect(() => {
        {
            type === 'tv' &&
                fetchEpisodes()
        }

    }, [selectedSeason])

    return (
        <>
            {/* EPISODES */}
            {episode &&
                <div className='w-[100%] p-5'>
                    <h2 className='font-extrabold text-4xl my-2'>Episodi</h2>
                    <select disabled={!selectedSeason} name="episodes" id="episodes"
                        value={selectedEpisode}
                        onChange={(e) => setSelectedEpisode(e.target.value)}
                        className='mt-4 mb-6 cursor-pointer hover:bg-blue-200 p-0.5 rounded-xl border-2 border-emerald-500'>
                        <option>{selectedSeason ? 'Episodi'
                            : !selectedSeason ? 'Scegli una stagione per selzionare gli episodi'
                                : episode.length = 0 ? 'Nessun episodio disponibile' : ''}</option>
                        {episodeFiltered.map((e, i) =>
                            <option key={i} value={i + 1}>{'Episodio ' + (i + 1)}</option>
                        ) ||
                            episodeFiltered[0].map((e, i) =>
                                <option key={i} value={i + 1}>{'Episodio ' + (i + 1)}</option>
                            )}
                    </select>
                    <label htmlFor="episodes" className='opacity-30 px-2'>scegli l'episodio</label>

                    <div className='text-white'>
                        {episodeFiltered.filter((e, i) => (i + 1) == selectedEpisode).map(e =>
                            <div key={e.id} id='episodes' className='flex gap-5 rounded-2xl' style={{ backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.6), rgba(1, 1, 22, 0.8)), url(${'https://image.tmdb.org/t/p/original' + e.still_path})` }}>
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
                                            <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{e.air_date}</p>
                                        </div> : ''}
                                    {e.overview &&
                                        <div>
                                            <h3 className='font-extrabold'>Trama</h3>
                                            <p className='text-center border-2 border-green-500 p-2 rounded-4xl'>{e.overview}</p>
                                        </div>}
                                </div>

                            </div>
                        )}
                        {episode.slice(0, 1).map(e =>
                            <div key={e.id} id='episodes' className={`flex gap-5 rounded-2xl ${selectedEpisode ? 'hidden' : ''}`} style={{ backgroundImage: `linear-gradient(rgba(1, 1, 22, 0.65), rgba(1, 1, 22, 0.8)), url(${'https://image.tmdb.org/t/p/original' + e.still_path})` }}>
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
                                            <p className='text-center border-2 border-green-500 p-1 rounded-4xl'>{e.air_date}</p>
                                        </div>}
                                    {e.overview &&
                                        <div>
                                            <h3 className='font-extrabold'>Trama</h3>
                                            <p className='text-center border-2 border-green-500 p-2 rounded-4xl'>{e.overview}</p>
                                        </div>}
                                </div>

                            </div>
                        )}

                    </div>
                </div>}
        </>
    )
}