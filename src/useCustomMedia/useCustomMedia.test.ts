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

  it('should accept an object in pattern', () => {
    setupMatchMedia('(min-width: 768px)');

    const { result } = renderHook(() => useCustomMedia({
      minWidth: 768
    }));

    expect(result.current).toBe(true);
  });

  it('should match query with operator', () => {
    setupMatchMedia('(min-width: 769px) and (max-width: 1023px)');

    const { result } = renderHook(() => useCustomMedia({
      minWidth: 769,
      operator: 'and',
      maxWidth: 1023
    }));

    expect(result.current).toBe(true);
  });

  it('should not match when pattern is an object and query is wrong', () => {
    setupMatchMedia('(min-width: 769px) and (max-width: 1023px)');

    const { result } = renderHook(() => useCustomMedia({
      minWidth: 1000,
      operator: 'or',
      maxWidth: 2000
    }));

    expect(result.current).toBe(false);
  });
});
