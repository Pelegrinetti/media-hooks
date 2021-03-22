import React from 'react';
import { render, screen } from '@testing-library/react';
import setupMatchMedia from '../__tests__/setupMatchMedia';
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
    setupMatchMedia('(maxWidth: 768px)');

    render(
      <MediaProvider
        patterns={{
          mobile: '(maxWidth: 768px)',
          desktop: '(minwidth:  1024px)'
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
    setupMatchMedia('(minWidth: 1024px)');

    render(
      <MediaProvider
        patterns={{
          mobile: '(maxWidth: 768px)',
          desktop: '(minWidth: 1024px)'
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
