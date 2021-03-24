import React from 'react';

interface IPatterns {
  [key: string]: string;
}
interface Props {
  patterns: IPatterns;
}

export const MediaContext = React.createContext<IPatterns>({});

const MediaProvider: React.FC<Props> = ({ children, patterns }) => (
  <MediaContext.Provider value={patterns}>{children}</MediaContext.Provider>
);

export default MediaProvider;
