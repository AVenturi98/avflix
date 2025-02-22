// Lazy Loader
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyLoader({ image, style }) {
    return (
        <LazyLoadImage
            alt={image.alt}
            effect="blur"
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "0.3s" },
            }}
            src={image}
            className={`${style}`} />
    )
}