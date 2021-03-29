## Definition:

### `<MediaProvider />`

|   Prop   | Description        | Example                                                                              |
| :------: | ------------------ | ------------------------------------------------------------------------------------ |
| patterns | `object` patterns. | ```<MediaProvider patterns={{ mobile: '(min-width: 768px)' }}>...</MediaProvider>``` |
| patterns | `object` patterns. | ```<MediaProvider patterns={{ mobile: { minWidth: 768 } }}>...</MediaProvider>```    |

### `useMedia()`

|     Param      | Description                                        | Example                                                      |
| :------------: | -------------------------------------------------- | ------------------------------------------------------------ |
|    pattern     | `string` pattern key in patterns.                  | ```const isMobile = useMedia('mobile')```                    |
|     config     | `object` configuration object                      | ```const isMobile = useMedia('mobile', { default: true })``` |
| config.default | `bool` fallback used when Media API is unavailable | ```const isMobile = useMedia('mobile', { default: true })``` |

### `useCustomMedia()`

|     Param      | Description                                        | Example                                                                      |
| :------------: | -------------------------------------------------- | ---------------------------------------------------------------------------- |
|     query      | `string` CSS Media Query.                          | ```const isMobile = useCustomMedia('max-width: 768px')```                    |
|     config     | `object` configuration object                      | ```const isMobile = useCustomMedia('max-width: 768px', { default: true })``` |
| config.default | `bool` fallback used when Media API is unavailable | ```const isMobile = useCustomMedia('max-width: 768px', { default: true })``` |

P.S: If Media API is unavailable and default value is not provided the hooks will return `undefined`;