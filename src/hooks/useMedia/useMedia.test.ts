// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';
import useMedia from './useMedia';

describe('useMedia()', () => {
  it('should render log "test"', () => {
    const spy = jest.spyOn(console, 'log');

    renderHook(() => useMedia());

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Test');
  });
});
