import * as React from 'react'
import GlobalContext from '../../context/GlobalContext'

export default function MediaPerson() {

    // Path Image
    const path_img = 'https://image.tmdb.org/t/p/w500'

    const { fetchSectionID } = React.useContext(GlobalContext)

    const [img, setImg] = React.useState({ profiles: [] }) // Set Person Credits

    const { id } = useParams() // get ID

    React.useEffect(() => {
        fetchSectionID('person', id, 'images', () => { }, setImg)
    }, [id])

    return (
        <>
            {img.profiles.map(e =>
                <img src={path_img + e.file_path} alt="" />
            )}
        </>
    )
}