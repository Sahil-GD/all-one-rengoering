/**
 * Formatting is intentionally boring. The only decisions:
 *
 * - singleQuote: matches the dominant TS ecosystem convention.
 * - prettier-plugin-tailwindcss: canonical class order — ends class-order
 *   discussions in review permanently. It must be listed last if other
 *   plugins are ever added.
 *
 * `tailwindStylesheet` points the plugin at the v4 CSS-first entry point so
 * it can resolve custom theme tokens when sorting.
 */

/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/globals.css',
};

export default config;