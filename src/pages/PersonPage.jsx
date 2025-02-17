import * as React from 'react'
import axios from 'axios'
import KEY from '../KEY'
import { useParams } from 'react-router'

// Context
import GlobalContext from '../context/GlobalContext'

// Components
import FilteredSection from '../components/FilteredSection'

export default function PersonPage() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { fetchSectionID } = React.useContext(GlobalContext)

    const [person, setPerson] = React.useState([]) // Set Person
    const [credits, setCredits] = React.useState({ cast: [], crew: [] }) // Set Person Credits
    const [img, setImg] = React.useState({ profiles: [] }) // Set Person Credits



    const { id } = useParams() // get ID

    // fetch Global Person
    function fetchPersonId(credits) {

        axios.get(`https://api.themoviedb.org/3/person/${id}${credits ? '/' + credits : ''}${KEY}`, {
            params: {
                language: 'en-US'
            }
        })
            .then(res => {
                setPerson(res.data)
                // console.log('Person Id Person Page', res.data)

            })
            .catch(err => {
                console.error('Error Person Page', err)
            })
    }


    React.useEffect(() => {
        fetchPersonId()
        fetchSectionID('person', id, 'combined_credits', () => { }, setCredits)

    }, [id])

    const otherRole = credits.crew.map(e => e.job).filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

    return (
        <div className='my-16 p-5'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='flex gap-2'>
                    <img src={path_img + person.profile_path} alt={person.name}
                        className='w-[180px] sm:w-[200px] rounded-xl' />
                    <div className='flex flex-col gap-15' >
                        <div className='flex flex-wrap items-baseline gap-5'>
                            <div className='text-2xl font-semibold mt-3'>{person.name}</div>
                            <div className='italic text-gray-500'>{person.known_for_department + ', ' + otherRole}</div>
                        </div>
                        <div>
                            <h4 className='text-lg font-semibold italic'>Quando e dove</h4>
                            <div>{person.birthday},</div>
                            <div>{person.place_of_birth}</div>
                        </div>
                    </div>
                </div>
                <div className=' sm:w-[50%]'>
                    <div className='flex justify-center'>
                        <h4 className='text-lg sm:text-2xl font-semibold italic'>Biografia</h4>
                        <div className='grow-1 text-center text-gray-500 italic'>Popolarità {person.popularity}</div>
                    </div>
                    <div className='sm:text-lg'>{person.biography}</div>
                </div>
            </div>


            <div className='my-16'>
                <FilteredSection myArray={credits.cast} title={'Conosciuto per'} init={0} fin={12} viewmore={true} />
            </div>
        </div >
    )
}