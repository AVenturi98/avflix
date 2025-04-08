import * as React from 'react';

// Lazy Loader
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyLoader({ image, style }) {
    const [loaded, setLoaded] = React.useState(false);

    return (
        <div className='relative'>
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <LazyLoadImage
                alt={image.alt}
                effect="blur"
                wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "0.3s" },
                }}
                src={image}
                className={`${style}`}
                onLoad={() => setLoaded(true)} />
        </div>
    )
}