import classNames from 'classnames';
import { useState } from 'react';
// import { images } from '@/assets/images';
import styles from './Image.module.scss'

function Images({ src, alt, className, fallBack, ...props }) {
    // const [fallBack, setFallBack] = useState('');

    // const handleError = () => {
    //     setFallBack(customFallBack);
    // };

    return ( 
        <img
            className={classNames(styles.wrapper, className)}
            alt={alt}
            src={fallBack || src}
            {...props}
            // onError={handleError}
        />
     );
}

export default Images;