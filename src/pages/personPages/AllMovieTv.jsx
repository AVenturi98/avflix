import * as React from 'react'
import Card from '../../components/Card'
// Context 
import GlobalContext from '../../context/GlobalContext'
import { useParams } from 'react-router'

// Components
import BtnSwitchWord from '../../components/BtnSwitchWord'

// Placeholder
import imagePlaceholder from '../../assets/ImagePlaceholder.jpg'

// Icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function AllMovieTv() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { mobileWidth, fetchSectionID, fetchPersonId, person, loading } = React.useContext(GlobalContext)

    const [allShows, setAllShows] = React.useState({ cast: [], crew: [] }) // get All Shows for Person
    const [viewModeImg, setViewModeImg] = React.useState('apparizioni') // set View Mode

    const [mediaTypeSelected, setMediaTypeSelected] = React.useState('') // set Media Type Selected

    const { id } = useParams()
    console.log(person.name)

    React.useEffect(() => {
        fetchPersonId(id)
        fetchSectionID('person', id, 'combined_credits', () => { }, setAllShows)
    }, [id])

    // get Unique Media Type
    const uniqueType = allShows.cast.filter((v, i, a) => a.findIndex(t => (t.media_type === v.media_type)) === i)

    return (
        <section className='container mx-auto px-4 py-8'>
            <h1 className="text-4xl font-bold text-center mb-8">{person.name}</h1>

            <div className='flex justify-center items-baseline gap-7'>
                {/* BTN SWITCH */}
                <div className="flex justify-center mb-8">
                    <BtnSwitchWord text1={'apparizioni'}
                        length1={mediaTypeSelected ? allShows.cast.filter(t => t.media_type === mediaTypeSelected).length : allShows.cast.length}
                        text2={allShows.crew.length > 0 ? 'altro' : ''}
                        length2={allShows.crew.length > 0 ? allShows.crew.length : ''}
                        set1={() => setViewModeImg('apparizioni')}
                        set2={() => setViewModeImg('altro')}
                        styleSelected={'bg-green-500'}
                        styleSelectedText2={allShows.crew.length >= 1 ? '' : 'hidden'}
                        flex={'flex flex-wrap sm:flex-nowrap gap-2'} />
                </div>

                {/* FILTER */}
                {viewModeImg === 'apparizioni' ?
                    <select name="shows" id="shows"
                        onChange={(e) => setMediaTypeSelected(e.target.value)}
                        className='cursor-pointer hover:bg-blue-200 py-1 px-2 rounded-xl border-2 border-emerald-500'>
                        <option value="">Tutto</option>
                        {uniqueType.map(e =>
                            <option key={e.media_type} value={e.media_type}>{e.media_type}</option>
                        )}
                    </select> : ''}
            </div>

            {/* APPARIZIONI */}
            {viewModeImg === 'apparizioni' ?
                <div className='flex justify-center items-center gap-2 flex-wrap'>
                    {allShows.cast.filter(e => !mediaTypeSelected || e.media_type === mediaTypeSelected).map((e, i) =>
                        <Card key={i}
                            type={e.media_type}
                            item={e}
                            image={e.poster_path ? path_img + e.poster_path : imagePlaceholder}
                            language={true}
                            stars={true}
                            overviewSmall={e.overview}
                            styleCard={mobileWidth ? 'w-[150px]' : 'w-[240px]'}
                            styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-xs h-[350px]'} />
                    )}
                </div>
                : ''}

            {/* ALTRO */}
            {viewModeImg === 'altro' ?
                <div className='flex justify-center items-center gap-2 flex-wrap'>
                    {allShows.crew.map((e, i) =>
                        <Card key={i}
                            type={e.media_type}
                            item={e}
                            image={e.poster_path ? path_img + e.poster_path : imagePlaceholder}
                            language={true}
                            stars={true}
                            overviewSmall={e.overview}
                            styleCard={mobileWidth ? 'w-[150px]' : 'w-[240px]'}
                            styleImg={mobileWidth ? 'w-xs h-[220px]' : 'w-xs h-[350px]'} />
                    )}
                </div>
                : viewModeImg === 'altro' && loading ?
                    <div className="flex items-center justify-center">
                        <FontAwesomeIcon icon={faSpinner} />
                    </div> : ''}
        </section >
    )
}