## How to use:
Media hooks provides two ways to use.

### First way:
Use provider with patterns. Current support one operator (AND | OR).

_App.js_
```js
import MediaProvider from 'media-hooks';

const App = () => {
  const patterns = {
    mobile: '(max-width: 768px)', // or { minWidth: 768 }
    tablet: '(min-width: 769px) and (max-width: 1023px)', // or { minWidth: 769, operator: 'and', maxWidth: 1023 }
    desktop: '(min-width: 1024px)' // or { maxWidth: 1024 }
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