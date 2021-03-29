interface IPatternObject {
  [key: string]: number | string;
  operator?: 'and' | 'or';
}

export default IPatternObject;
