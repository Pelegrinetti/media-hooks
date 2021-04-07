import { useState, useEffect } from 'react';
import objectToQuery from '../utils/objectToQuery';
import IPatternObject from '../interfaces/patternObject';

interface ICustomMediaConfig {
  default: boolean | undefined;
}

const useCustomMedia = (query: string | IPatternObject, config?: ICustomMediaConfig): boolean | undefined => {
  const [matches, setMatches] = useState(config?.default);
  const setMatchesValue = () => {
    if (typeof window.matchMedia === 'function') {
      if (typeof query === 'string') {
        setMatches(window.matchMedia(query).matches);

        return;
      }

      const queryAsString = objectToQuery(query);

      setMatches(window.matchMedia(queryAsString).matches);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    setMatchesValue();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', setMatchesValue);

      return () => window.removeEventListener('resize', setMatchesValue);
    }
  }, []);

  return matches;
};

export default useCustomMedia;
