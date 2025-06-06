import * as React from 'react';
import { Link, useParams } from 'react-router';

// Context
import GlobalContext from '../context/GlobalContext';

// Components
import FilteredSection from '../components/FilteredSection';
import DettailsPerson from '../components/DettailsPerson';

export default function PersonPage() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { fetchPersonId, person, fetchSectionID, mobileWidth } = React.useContext(GlobalContext);;

    const [credits, setCredits] = React.useState({ cast: [], crew: [] });; // Set Person Credits
    const [loading, setLoading] = React.useState(false);;


    const { id } = useParams();; // get ID


    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500) // Set loading to false after 500ms

        fetchPersonId(id)
        fetchSectionID('person', id, 'combined_credits', () => { }, setCredits)

        document.documentElement.scrollTop = 0

        return () => clearTimeout(timer) // Clear timeout if component unmounts
    }, [id]);;

    const otherRole = credits.crew.map(e => e.job).filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i); // non ripete il ruolo

    const agePerson = person.birthday ? new Date().getFullYear() - new Date(person.birthday).getFullYear() : null; // calcola l'età della persona
    const age = agePerson ? `${agePerson} anni` : '';

    return (
        <div className='sm:my-16 p-5'>
            <div className='flex flex-col justify-center items-center gap-10 sm:gap-18'>
                <div className='flex gap-2'>
                    {person.profile_path ?
                        <img src={path_img + person.profile_path} alt={person.name} className='w-[200px] h-[300px] rounded-xl' />
                        : <img src="/placeholder/PersonPlaceholder.png" alt={person.name} className='w-[200px] h-[300px] rounded-xl' />
                    }
                    <div className='flex flex-col gap-5 sm:gap-15' >
                        <div className='flex flex-wrap items-baseline sm:gap-5'>
                            <div className='text-2xl font-semibold mt-3'>{person.name ? person.name : 'Sconosciuto'}</div>
                            <div className='italic text-gray-500'>{person.known_for_department + ', ' + otherRole}</div>
                        </div>
                        {!mobileWidth &&
                            <DettailsPerson item={person} agePers={age} />}
                    </div>
                </div>
                <div className=' sm:w-[50%]'>
                    {mobileWidth &&
                        <DettailsPerson item={person} agePers={age} />}
                    <h4 className='text-xl sm:text-2xl font-bold italic'>Biografia</h4>
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