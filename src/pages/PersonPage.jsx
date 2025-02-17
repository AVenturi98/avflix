import * as React from 'react'
import { Link, useParams } from 'react-router'

// Placeholder 
import personPlaceholder from '../assets/PersonPlaceholder.png'
// Context
import GlobalContext from '../context/GlobalContext'

// Components
import FilteredSection from '../components/FilteredSection'

export default function PersonPage() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { fetchPersonId, person, fetchSectionID, mobileWidth } = React.useContext(GlobalContext)

    const [credits, setCredits] = React.useState({ cast: [], crew: [] }) // Set Person Credits


    const { id } = useParams() // get ID


    React.useEffect(() => {
        fetchPersonId(id)
        fetchSectionID('person', id, 'combined_credits', () => { }, setCredits)

        document.documentElement.scrollTop = 0
    }, [id])

    const otherRole = credits.crew.map(e => e.job).filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

    return (
        <div className='sm:my-16 p-5'>
            <div className='flex flex-col justify-center items-center gap-10 sm:gap-18'>
                <div className='flex gap-2'>
                    <img src={person.profile_path ? path_img + person.profile_path : personPlaceholder} alt={person.name}
                        className='w-[200px] h-[300px] rounded-xl' />
                    <div className='flex flex-col gap-5 sm:gap-15' >
                        <div className='flex flex-wrap items-baseline gap-5'>
                            <div className='text-2xl font-semibold mt-3'>{person.name ? person.name : 'Sconosciuto'}</div>
                            <div className='italic text-gray-500'>{person.known_for_department + ', ' + otherRole}</div>
                        </div>
                        <div>
                            <h4 className='text-lg font-semibold italic'>{person.birthday || person.place_of_birth ? 'Quando e dove' : ''}</h4>
                            <div>{person.birthday ? person.birthday + ', ' : ''}</div>
                            <div>{person.place_of_birth}</div>
                        </div>
                        <div className='sm:w-[50%] italic hover:text-gray-500 bg-blue-500 p-1 text-white rounded-lg'>
                            <Link to='dettails/media/person'>
                                tutti i contenuti
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=' sm:w-[50%]'>
                    <div className='flex justify-center'>
                        <h4 className='text-lg sm:text-2xl font-semibold italic'>Biografia</h4>
                        <div className='grow-1 text-center text-gray-500 italic'>Popolarità {person.popularity}</div>
                    </div>
                    {person.biography ?
                        <div className='sm:text-lg'>{person.biography}</div>
                        : <div className='text-gray-500'>Nessuna Biografia disponibile</div>
                    }
                </div>
            </div>


            <div className='my-6 sm:my-16'>
                <FilteredSection myArray={credits.cast} title={'Conosciuto per'} type='person' init={0} fin={12} viewmorePerson={true} id={id} />
            </div>
        </div >
    )
}