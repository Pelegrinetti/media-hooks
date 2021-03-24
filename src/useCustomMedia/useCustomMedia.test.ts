import { renderHook } from '@testing-library/react-hooks';
import setupMatchMedia from '../__tests__/setupMatchMedia';
import useCustomMedia from './index';

afterEach(() => {
  window.matchMedia = undefined;
});

describe('useCustomMedia()', () => {
  it('should match with query', () => {
    setupMatchMedia('(min-width: 768px)');

    const { result } = renderHook(() => useCustomMedia('(min-width: 768px)'));

    expect(result.current).toBe(true);
  });

  it('should not match with query', () => {
    setupMatchMedia('(max-width: 1023px)');

    const { result } = renderHook(() => useCustomMedia('(min-width: 768px)'));

    expect(result.current).toBe(false);
  });

  it('should return undefined when matchMedia API is unavailable and default option is not provided', () => {
    const { result } = renderHook(() => useCustomMedia('(min-width: 768px)'));

    expect(result.current).toBe(undefined);
  });

  it('should return default value when is provided and matchMedia API in unavailable', () => {
    const { result } = renderHook(() => useCustomMedia('(min-width: 768px)', {
      default: true
    }));

    expect(result.current).toBe(true);
  });
});
