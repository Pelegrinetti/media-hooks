import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import setupMatchMedia from '../__tests__/setupMatchMedia';
import MediaProvider from '../MediaProvider';
import useMedia from './index';

type MatchMedia = (query: string) => MediaQueryList;

afterEach(() => {
  window.matchMedia = undefined as unknown as MatchMedia;
});

describe('useMedia()', () => {
  it('should matches with mobile', () => {
    const mobileQuery = '(max-width: 768px)';
    setupMatchMedia(mobileQuery);

    const wrapper = ({ children }) => (
      <MediaProvider
        patterns={{
          mobile: mobileQuery,
          desktop: '(min-width: 1024px)'
        }}
      >
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('mobile'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should return default value', () => {
    const defaultMatch = true;

    setupMatchMedia('(max-width: 1024px)', { force: defaultMatch });

    const wrapper = ({ children }) => (
      <MediaProvider
        patterns={{
          mobile: '(max-width: 768px)',
          desktop: '(min-width: 1200px)'
        }}
      >
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should return undefined when pattern and default is not provided', () => {
    setupMatchMedia('(min-width: 768px)');

    const wrapper = ({ children }) => (
      <MediaProvider
        patterns={{
          mobile: '(min-width: 768px)'
        }}
      >
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop'), { wrapper });

    expect(result.current).toBe(undefined);
  });

  it('should return default when matchMedia API is unavailable', () => {
    const wrapper = ({ children }) => (
      <MediaProvider patterns={{ mobile: '(min-width: 768px)' }}>{children}</MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop', { default: true }), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should return undefined when matchMedia API is unavailable and default is not provided', () => {
    const wrapper = ({ children }) => (
      <MediaProvider patterns={{ mobile: '(min-width: 768px)' }}>{children}</MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop'), { wrapper });

    expect(result.current).toBe(undefined);
  });

  it('should accept an object in pattern', () => {
    setupMatchMedia('(min-width: 768px)');

    const wrapper = ({ children }) => (
      <MediaProvider patterns={{
        mobile: {
          minWidth: 768
        }
      }}
      >
        {children}

      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('mobile'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should match query with operator', () => {
    setupMatchMedia('(min-width: 769px) and (max-width: 1023px)');

    const wrapper = ({ children }) => (
      <MediaProvider patterns={{
        tablet: {
          minWidth: 769,
          operator: 'and',
          maxWidth: 1023
        }
      }}
      >
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('tablet'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should not match when pattern is an object and query is wrong', () => {
    setupMatchMedia('(min-width: 769px) and (max-width: 1023px)');

    const wrapper = ({ children }) => (
      <MediaProvider patterns={{
        tablet: {
          minWidth: 1000,
          operator: 'or',
          maxWidth: 2000
        }
      }}
      >
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('tablet'), { wrapper });

    expect(result.current).toBe(false);
  });
});
