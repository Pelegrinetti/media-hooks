interface ISetupMatchMediaConfig {
  force?: boolean;
}

const setupMatchMedia = (matchQuery: string, config?: ISetupMatchMediaConfig) => {
  window.matchMedia = (query: string) => ({
    matches: typeof config?.force === 'undefined' ? query === matchQuery : config.force,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  });
};

export default setupMatchMedia;
