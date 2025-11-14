import { config as reactConfig } from '@t8pro/eslint-config/react';

export default [
  ...reactConfig,
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.d.ts', 'coverage/**', '**/*.bundled_*.mjs'],
  },
];
