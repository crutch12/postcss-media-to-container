import { describe, it, expect } from "vitest";
import postcss from "postcss";
import * as fs from "node:fs";
import * as path from "node:path";
import postcssMediaToContainer from "../src/index";

const baseExample = fs.readFileSync(
  path.resolve(__dirname, "./examples/base.css"),
);

function formatCss(content: string) {
  return content.trim().replaceAll("\n", "").replaceAll("\r", "");
}

describe("postcssMediaToContainer", () => {
  it("no options", () => {
    const result = postcss([postcssMediaToContainer()]).process(
      baseExample,
    ).content;

    const expected = `@container (min-width: 600px) {}
@container (400px <= width <= 700px) {}
@media print {}`;

    expect(formatCss(result)).toBe(formatCss(expected));
  });

  it("with containerName", () => {
    const result = postcss([
      postcssMediaToContainer({
        containerName: "app",
      }),
    ]).process(baseExample).content;

    const expected = `@container app (min-width: 600px) {}
@container app (400px <= width <= 700px) {}
@media print {}`;

    expect(formatCss(result)).toBe(formatCss(expected));
  });

  it("with rules: ['width']", () => {
    const result = postcss([
      postcssMediaToContainer({
        rules: ["width"],
      }),
    ]).process(baseExample).content;

    const expected = `@media screen and (min-width: 600px) {}
@container (400px <= width <= 700px) {}
@media print {}`;

    expect(formatCss(result)).toBe(formatCss(expected));
  });
});
