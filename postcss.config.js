const tailwindcss = require('tailwindcss');

const isProduction = process.env.NODE_ENV === 'production';
const plugins = [tailwindcss];

if (isProduction) {
  const purgecss = require('@fullhuman/postcss-purgecss');
  class TailwindExtractor {
    static extract(content) {
      return content.match(/[A-Z0-9:\/]+/g) || [];
    }
  }

  plugins.push(purgecss({
    content: ['src/*.html'],
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ['html'],
      },
    ],
  }));
}

module.exports = {
  plugins,
};
