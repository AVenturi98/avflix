import * as React from 'react'
import { useParams } from 'react-router'
import GlobalContext from '../../context/GlobalContext'

// Component
import AllMedia from '../../components/AllMedia'

export default function MediaPerson() {

    const { fetchSectionID, fetchPersonId, person } = React.useContext(GlobalContext)
    const [image, setImage] = React.useState({ profiles: [] }) // Set Person Image


    const { id } = useParams() // get ID

    React.useEffect(() => {
        fetchPersonId(id)
        fetchSectionID('person', id, 'images', () => { }, setImage) // get Images Person
    }, [id])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">{person.name}</h1>


            {/* IMAGES PERSON*/}
            {image.profiles.length >= 1 ?
                <AllMedia myArray={image.profiles} />
                : <div className='flex justify-center'>Nessun poster disponibile</div>}

        </div>
    )
}