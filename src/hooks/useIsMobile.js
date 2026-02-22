import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
  const getIsMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  };

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;