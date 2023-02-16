import { useState, useEffect } from 'react';

type windowSizeType = {
    width: null | number,
    height: null | number,
}

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<windowSizeType>({
        width: null,
        height: null,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
    return windowSize;
}
