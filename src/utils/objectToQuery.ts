import IPatternObject from '../interfaces/patternObject';

const objectToQuery = (object: IPatternObject): string =>
  Object.entries(object)
    .reduce((previous, current) => {
      const objectKey = current[0].replace(/[A-Z]/, (letter) => `-${letter.toLowerCase()}`);
      let result = previous;

      if (objectKey === 'operator') {
        result += `${current[1]} `;
      } else {
        result += `(${objectKey}: ${current[1]}px) `;
      }

      return result;
    }, '')
    .trim();

export default objectToQuery;
