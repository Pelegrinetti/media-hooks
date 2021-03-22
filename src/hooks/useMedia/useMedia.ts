import { useContext } from 'react';
import { MediaContext } from '../../MediaProvider';

interface IMediaConfig {
  default: boolean;
}

const useMedia = (
  pattern: string,
  config?: IMediaConfig
): boolean | undefined => {
  const patterns = useContext(MediaContext);

  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    Object.keys(patterns).includes(pattern)
  ) {
    return window.matchMedia(patterns[pattern]).matches;
  }

  if (typeof config?.default !== 'undefined') return config.default;

  return undefined;
};

export default useMedia;
