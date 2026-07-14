/**
 * Tailwind CSS v4 is the only PostCSS plugin required.
 * Nesting and vendor prefixing are handled internally by Tailwind v4 —
 * adding autoprefixer or postcss-nesting here would be redundant.
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;