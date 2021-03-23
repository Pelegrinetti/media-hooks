[![Media Hooks CI/CD](https://github.com/Pelegrinetti/media-hooks/actions/workflows/publish.yml/badge.svg)](https://github.com/Pelegrinetti/media-hooks/actions/workflows/publish.yml)

<div align="center">
  <img src="https://github.com/Pelegrinetti/media-hooks/blob/master/logo.svg" alt="Logo do aplicativo" />

  <h1>Media Hooks</h1>
  <p>Use Media API with Hooks</p>
</div>

## Installation:

You can install using:
```bash
yarn add media-hooks

// or

npm install media-hooks
```

## Definition:

### `<MediaProvider />`

|Prop     | Description           | Example                                                                               |
|:-------:|-----------------------|---------------------------------------------------------------------------------------| 
|patterns | `object` patterns. | ```<MediaProvider patterns={{ mobile: '(min-width: 768px)' }}>...</MediaProvider>```  | 

### `useMedia()`

|Param    | Description          | Example                                                                               |
|:-------:|----------------------|---------------------------------------------------------------------------------------| 
|pattern  | `string` pattern key in patterns. | ```const isMobile = useMedia('mobile')```  | 
| config  | `object` configuration object | ```const isMobile = useMedia('mobile', { default: true })``` |
|config.default | `bool` fallback used when Media API is unavailable |  ```const isMobile = useMedia('mobile', { default: true })``` |

### `useCustomMedia()`

|Param    | Description          | Example                                                                               |
|:-------:|----------------------|---------------------------------------------------------------------------------------| 
|query  | `string` CSS Media Query. | ```const isMobile = useCustomMedia('max-width: 768px')```  | 
| config  | `object` configuration object | ```const isMobile = useCustomMedia('max-width: 768px', { default: true })``` |
|config.default | `bool` fallback used when Media API is unavailable |  ```const isMobile = useCustomMedia('max-width: 768px', { default: true })``` |

P.S: If Media API is unavailable and default value is not provided the hooks will return `undefined`;

## How to use:
Media hooks provides two ways to use.

### First way:
Use provider with patterns.

_App.js_
```js
import MediaProvider from 'media-hooks';

const App = () => {
  const patterns = {
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px)'
  }
  
  return (
    <MediaProvider patterns={patterns}>
      <Component />
    </MediaProvider>
  );
}

export default App;
```

_Component.js_
```js
import { useMedia } from 'media-hooks';

const Component = () => {
  const isMobile = useMedia('mobile');
  const isTablet = useMedia('tablet');
  const isDesktop = useMedia('desktop');
  
  return (
    <>
      {isMobile && <MobileComponent />}
      {isTablet && <TabletComponent />}
      {isDesktop && <DesktopComponent />}
    </>
  );
}

export default Component;
```

### Second way:
Use custom CSS Media Query.

_Component.js_
```js
import { useCustomMedia } from 'media-hooks';

const Component = () => {
  const isMobile = useCustomMedia('(max-width: 768px)');
  const isTablet = useCustomMedia('(min-width: 769px) and (max-width: 1023px)');
  const isDesktop = useCustomMedia('(min-width: 1024px)');
  
  return (
    <>
      {isMobile && <MobileComponent />}
      {isTablet && <TabletComponent />}
      {isDesktop && <DesktopComponent />}
    </>
  );
}

export default Component;
```

<hr />

MIT License

Copyright (c) 2021 Matheus Pelegrinetti