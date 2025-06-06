import * as React from 'react'
import Carousel from "./carousel/Carousel";

export default function TopCast({ myArray, title }) {
    return (
        <section id='contain-top-cast'>
            <h2 className='text-4xl font-bold my-6 text-center'>{title}</h2>
            <div className='flex justify-center items-center gap-2 sm:gap-8 overflow-y-hidden'>
                <Carousel images={myArray} />
            </div>
        </section>
    )
}