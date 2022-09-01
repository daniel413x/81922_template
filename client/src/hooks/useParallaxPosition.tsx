import { useState, useEffect, RefObject } from 'react';
import useWindowSize from './useWindowSize';

interface ParallaxPositionProps {
  parallaxPosition: number;
}

const useParallaxPosition = (ref: RefObject<HTMLDivElement>): ParallaxPositionProps => {
  const [clientScrollPositionInSpan, setClientScrollPositionInSpan] = useState<number>(0);
  const [parallaxPosition, setParallaxPosition] = useState<number>(0);
  const { height } = useWindowSize();
  useEffect(() => {
    const refreshScroll = () => {
      setParallaxPosition(((clientScrollPositionInSpan / height)) * 150);
      setClientScrollPositionInSpan((window.pageYOffset + 200) - (ref.current?.offsetTop! - height));
    };
    window.addEventListener('scroll', refreshScroll);
    return () => {
      window.removeEventListener('scroll', refreshScroll);
    };
  }, [window.pageYOffset, ref.current?.offsetTop, height]);
  return { parallaxPosition };
};

export default useParallaxPosition;
