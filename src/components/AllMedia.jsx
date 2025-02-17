export default function AllMedia({ myArray, callback = () => { } }) {
    // Path Img
    const path_img = `https://image.tmdb.org/t/p/original`
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {myArray.map((e, i) =>
                    <div key={i} className="relative cursor-pointer" onClick={() => callback(i)} >
                        <img src={e.file_path ? path_img + e.file_path : path_img + e} alt={e.title || e.name} className="w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" />
                    </div>
                )}
            </div>
        </>
    )
}