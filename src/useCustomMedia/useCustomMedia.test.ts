import { renderHook } from '@testing-library/react-hooks';
import setupMatchMedia from '../__tests__/setupMatchMedia';
import useCustomMedia from './useCustomMedia';

afterEach(() => {
  window.matchMedia = undefined;
});

describe('useCustomMedia()', () => {
  it('should match with query', () => {
    setupMatchMedia('(minWidth: 768px)');

    const { result } = renderHook(() => useCustomMedia('(minWidth: 768px)'));

    expect(result.current).toBe(true);
  });

  it('should not match with query', () => {
    setupMatchMedia('(maxWidth: 1023px)');

    const { result } = renderHook(() => useCustomMedia('(minWidth: 768px)'));

    expect(result.current).toBe(false);
  });

  it('should return undefined when matchMedia API is unavailable and default option is not provided', () => {
    const { result } = renderHook(() => useCustomMedia('(minWidth: 768px)'));

    expect(result.current).toBe(undefined);
  });

  it('should return default value when is provided and matchMedia API in unavailable', () => {
    const { result } = renderHook(() => useCustomMedia('(minWidth: 768px)', {
      default: true
    }));

    expect(result.current).toBe(true);
  });
});
