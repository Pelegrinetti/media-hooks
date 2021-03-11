import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import MediaProvider from '../../MediaProvider';
import useMedia from './useMedia';

describe('useMedia()', () => {
  it('should matches with mobile', () => {
    window.matchMedia = (query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    });

    const wrapper = ({ children }) => (
      <MediaProvider patterns={{ mobile: '(minWidth: 768px)' }}>
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('mobile'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should return default value', () => {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    });

    const wrapper = ({ children }) => (
      <MediaProvider patterns={{ mobile: '(minWidth: 768px)' }} defaultMatch>
        {children}
      </MediaProvider>
    );

    const { result } = renderHook(() => useMedia('desktop'), { wrapper });

    expect(result.current).toBe(true);
  });

  it('should return undefined when pattern and default is not provided', () => {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    });

    const wrapper = ({ children }) => (
      <MediaProvider patterns={{ mobile: '(minWidth: 768px)' }}>
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
