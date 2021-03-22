import React from 'react';

interface IMediaContext {
  [key: string]: boolean;
  default?: boolean | undefined;
}
interface Props {
  patterns: {
    [key: string]: string;
  };
  defaultMatch?: boolean | undefined;
}

export const MediaContext = React.createContext<IMediaContext>({});

const MediaProvider: React.FC<Props> = ({
  children,
  patterns,
  defaultMatch
}) => {
  const matchesWithPatterns: IMediaContext = {
    default: defaultMatch
  };

  if (typeof window !== 'undefined' && window.matchMedia) {
    Object.keys(patterns).forEach((pattern) => {
      matchesWithPatterns[pattern] = window.matchMedia(
        patterns[pattern]
      ).matches;
    });
  }

  const memoizedMatches = React.useMemo(() => matchesWithPatterns, [patterns]);

  return (
    <MediaContext.Provider value={memoizedMatches}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
