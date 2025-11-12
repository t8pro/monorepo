import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to find the correct path to reshaped media.css
const possiblePaths = [
  path.resolve(
    __dirname,
    'node_modules/reshaped/dist/themes/reshaped/media.css',
  ),
  path.resolve(
    __dirname,
    '../../node_modules/reshaped/dist/themes/reshaped/media.css',
  ),
  path.resolve(
    __dirname,
    '../../../node_modules/reshaped/dist/themes/reshaped/media.css',
  ),
];

const themeMediaCSSPath =
  possiblePaths.find(p => fs.existsSync(p)) || possiblePaths[0];

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
