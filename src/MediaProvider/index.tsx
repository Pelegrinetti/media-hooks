import React from 'react';
import IPatternObject from '../interfaces/patternObject';

interface IPatterns {
  [key: string]: string | IPatternObject;
}
interface Props {
  patterns: IPatterns;
}

export const MediaContext = React.createContext<IPatterns>({});

const MediaProvider: React.FC<Props> = ({ children, patterns }) => (
  <MediaContext.Provider value={patterns}>{children}</MediaContext.Provider>
);

export default MediaProvider;
