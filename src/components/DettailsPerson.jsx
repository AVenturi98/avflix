import * as React from 'react';
import { Link } from 'react-router';
import GlobalContext from '../context/GlobalContext';

export default function DettailsPerson({ item, agePers }) {
    const { birthday, deathday, place_of_birth } = item;
    const { mobileWidth } = React.useContext(GlobalContext);

    return (
        <>
            <div>
                <h4 className='text-xl font-bold italic'>{birthday || place_of_birth ? 'Quando e dove' : ''}</h4>
                <div>
                    {birthday && deathday ?
                        `${new Date(birthday).toLocaleDateString()}/${new Date(deathday).toLocaleDateString()}, `
                        : birthday && !deathday ? new Date(birthday).toLocaleDateString() + `, (${agePers}),`
                            : ''}
                </div>
                <div>{place_of_birth}</div>
            </div>
            <div className={`sm:w-[50%] lg:w-[60%] italic border-4 border-sky-950 rounded-full text-center hover:bg-sky-950 hover:text-white ${mobileWidth && 'my-5'}`}>
                <Link to='dettails/media/person'>
                    <p className='border-2 border-white rounded-full uppercase'>
                        tutte le immagini
                    </p>
                </Link>
            </div>
        </>
    )
}