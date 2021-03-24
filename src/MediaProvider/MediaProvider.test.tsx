import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MediaProvider, { MediaContext } from './index';

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
          mobile: '(max-width: 768px)',
          desktop: '(min-width: 1024px)'
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
        mobile: '(max-width: 768px)',
        desktop: '(min-width: 1024px)'
      })
    );
  });
});
