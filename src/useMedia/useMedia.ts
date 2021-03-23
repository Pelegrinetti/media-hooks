import { useContext, useState, useEffect } from 'react';
import { MediaContext } from '../MediaProvider';

interface IMediaConfig {
  default: boolean;
}

const useMedia = (pattern: string, config?: IMediaConfig): boolean | undefined => {
  const [matches, setMatches] = useState(config?.default);
  const patterns = useContext(MediaContext);
  const setMatchesValue = () => {
    if (typeof window.matchMedia === 'function' && Object.keys(patterns).includes(pattern)) {
      setMatches(window.matchMedia(patterns[pattern]).matches);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setMatchesValue();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', setMatchesValue);

      return window.removeEventListener('resize', setMatchesValue);
    }
  }, []);

  return matches;
};

export default useMedia;
