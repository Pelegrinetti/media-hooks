import objectToQuery from './objectToQuery';

describe('objectToQuery()', () => {
  it('should return a query media of one object prop', () => {
    const result = objectToQuery({ minWidth: 768 });

    expect(result).toEqual('(min-width: 768px)');
  });

  it('should format query with operator', () => {
    const result = objectToQuery({ minWidth: 769, operator: 'and', maxWidth: 1023 });

    expect(result).toEqual('(min-width: 769px) and (max-width: 1023px)');
  });
});
