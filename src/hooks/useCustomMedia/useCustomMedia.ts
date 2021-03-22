interface ICustomMediaConfig {
  default: boolean | undefined;
}

const useCustomMedia = (
  query: string,
  config?: ICustomMediaConfig
): boolean | undefined => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia(query).matches;
  }

  return config?.default;
};

export default useCustomMedia;
