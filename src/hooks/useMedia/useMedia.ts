import { useContext } from 'react';
import { MediaContext } from '../../MediaProvider';

const useMedia = (pattern: string): boolean | null => {
  const context = useContext(MediaContext);

  if (Object.keys(context).includes(pattern)) return context[pattern];

  return context.default;
};

export default useMedia;
