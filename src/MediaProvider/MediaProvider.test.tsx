import React from 'react';
import { render, screen } from '@testing-library/react';
import MediaProvider, { MediaContext } from './MediaProvider';

const Component = () => {
  const contextValue = React.useContext(MediaContext);

  return (
    <>
      {contextValue.mobile && <h1>Match mobile</h1>}
      {contextValue.desktop && <h1>Match desktop</h1>}
      {contextValue.default && <h1>Match default</h1>}
    </>
  );
};

describe('<MediaProvider />', () => {
  it('should render children', () => {
    render(
      <MediaProvider patterns={{}}>
        <h1>Hello World</h1>
      </MediaProvider>
    );

    expect(screen.getByRole('heading', { name: /Hello World/ }));
  });

  it('should match mobile', () => {
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

    render(
      <MediaProvider
        patterns={{
          mobile: '(maxWidth: 768px)'
        }}
      >
        <Component />
      </MediaProvider>
    );

    expect(
      screen.getByRole('heading', { name: /Match mobile/ })
    ).toBeInTheDocument();
  });

  it('should match desktop', () => {
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

    render(
      <MediaProvider
        patterns={{
          desktop: '(maxWidth: 768px)'
        }}
      >
        <Component />
      </MediaProvider>
    );

    expect(
      screen.getByRole('heading', { name: /Match desktop/ })
    ).toBeInTheDocument();
  });
});
