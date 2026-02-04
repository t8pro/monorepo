const themeMediaCSSPath =
  '../../node_modules/reshaped/dist/themes/reshaped/media.css';

const postcssConfig = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: [themeMediaCSSPath],
    },
    'postcss-custom-media': {},
    cssnano: { preset: ['default', { calc: false }] },
  },
};

export default postcssConfig;
