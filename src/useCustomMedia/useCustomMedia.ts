import { useState, useEffect } from 'react';

interface ICustomMediaConfig {
  default: boolean | undefined;
}

const useCustomMedia = (query: string, config?: ICustomMediaConfig): boolean | undefined => {
  const [matches, setMatches] = useState(config?.default);
  const setMatchesValue = () => {
    if (typeof window.matchMedia === 'function') {
      setMatches(window.matchMedia(query).matches);
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

export default useCustomMedia;
