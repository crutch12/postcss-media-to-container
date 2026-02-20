# postcss-media-to-container

```bash
npm install postcss-media-to-container --save-dev
```

[postcss-media-to-container] plugin replaces all found [@media](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media) queries with supported [@container](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container) queries.

```css
/* this @media query */
@media (min-width: 600px) {
}

/* will be replaced with this @container query */
@container (min-width: 600px) {
}
```

## Usage

Add [postcss-media-to-container] plugin to your project:

```bash
npm install postcss postcss-media-to-container --save-dev
```

Use it as a [postcss-media-to-container] plugin:

```js
const postcss = require("postcss");
const postcssMediaToContainer = require("postcss-media-to-container");

postcss([postcssMediaToContainer(/* pluginOptions */)]).process(
  YOUR_CSS /*, processOptions */,
);
```

## Options

```ts
interface PostcssMediaToContainerOptions {
  /**
   * Adds provided containerName to container query:
   * "@container app (min-width: 600px) {}"
   * @example "app"
   */
  containerName?: string;
  /**
   * Log results
   */
  verbose?: boolean;
  /**
   * Processes css file only if it's path matches provided filter
   * @example (path) => Boolean(path.match(/styles[\\/]index\.css/))
   * @param path - found css file full path
   */
  filter?: (path: string) => boolean;
  /**
   * Replaces only provided rules
   */
  rules?: Array<(typeof SUPPORTED_RULES)[number]>;
}
```

## References

- https://github.com/csstools/postcss-plugins/issues/1035
- https://github.com/csstools/postcss-plugins/issues/1367
