import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MediaProvider, { MediaContext } from './MediaProvider';

describe('<MediaProvider />', () => {
  it('should render children', () => {
    render(
      <MediaProvider patterns={{}}>
        <h1>Hello World</h1>
      </MediaProvider>
    );

    expect(screen.getByRole('heading', { name: /Hello World/ }));
  });

  it('should forward patterns to children', async () => {
    const spy = jest.spyOn(React, 'useContext');
    const Component: React.FC = () => {
      React.useContext(MediaContext);

      return <p>Testing...</p>;
    };

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

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });

    expect(spy).toReturnWith(
      expect.objectContaining({
        mobile: '(maxWidth: 768px)',
        desktop: '(minWidth: 1024px)'
      })
    );
  });
});
