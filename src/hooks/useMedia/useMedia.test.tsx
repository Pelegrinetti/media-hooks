import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import setupMatchMedia from '../../__tests__/setupMatchMedia';
import MediaProvider from '../../MediaProvider';
import useMedia from './useMedia';

afterEach(() => {
  window.matchMedia = undefined;
});

describe('useMedia()', () => {
  it('should matches with mobile', () => {
    const mobileQuery = '(maxWidth: 768px)';
    setupMatchMedia(mobileQuery);

    const wrapper = ({ children }) => (
      <MediaProvider
        patterns={{
          mobile: mobileQuery,
          desktop: '(minWidth: 1024px)'
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

    setupMatchMedia('(maxWidth: 1024px)', { force: defaultMatch });

    const wrapper = ({ children }) => (
      <MediaProvider
        patterns={{
          mobile: '(maxWidth: 768px)',
          desktop: '(minWidth: 1200px)'
        }}
        defaultMatch={defaultMatch}
      >
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should return undefined when pattern and default is not provided', () => {
    setupMatchMedia('(minWidth: 768px)');

    const wrapper = ({ children }) => (
      <MediaProvider
        patterns={{
          mobile: '(minWidth: 768px)'
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
      <MediaProvider patterns={{ mobile: '(minWidth: 768px)' }} defaultMatch>
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should return undefined when matchMedia API is unavailable and default is not provided', () => {
    const wrapper = ({ children }) => (
      <MediaProvider patterns={{ mobile: '(minWidth: 768px)' }}>
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop'), { wrapper });

    expect(result.current).toBe(undefined);
  });
});
