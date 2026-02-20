import type { PluginCreator } from "postcss";

const SUPPORTED_RULES = [
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  "inline-size",
  "min-inline-size",
  "block-size",
  "min-block-size",
  "aspect-ratio",
  "orientation",
] as const;

export interface PostcssMediaToContainerOptions {
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

const postcssMediaToContainer: PluginCreator<
  PostcssMediaToContainerOptions
> = ({
  containerName = "",
  verbose = false,
  filter = () => true,
  rules = [...SUPPORTED_RULES],
} = {}) => {
  const pluginName = "postcss-media-to-container";

  return {
    postcssPlugin: pluginName,
    OnceExit(root) {
      const filePath = root.source?.input.file || "<unknown>";

      if (!filter(filePath)) return;

      let replacedCounter = 0,
        totalCounter = 0;

      root.walkAtRules("media", (atRule) => {
        totalCounter++;
        const ruleIsSupported = rules.some((rule) =>
          atRule.params.match(new RegExp(`[( ]${rule}[ :)]`)),
        );
        if (!ruleIsSupported) return;
        atRule.name = "container";
        atRule.params = [
          containerName ? containerName.trim() + " " : undefined,
          atRule.params.replace("screen and ", ""),
        ]
          .filter(Boolean)
          .join("");
        replacedCounter++;
      });

      if (verbose) {
        console.log(
          pluginName,
          "-",
          filePath,
          "-",
          `replaced ${replacedCounter} media rules`,
          `(total: ${totalCounter})`,
        );
      }
    },
  };
};

postcssMediaToContainer.postcss = true;

export default postcssMediaToContainer;
export { postcssMediaToContainer as "module.exports" };
