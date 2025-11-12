import { nextJsConfig } from '@t8pro/eslint-config/next';

export default [
  ...nextJsConfig,
  {
    ignores: [
      '.next/**',
      '.openapi-tmp/**',
      'node_modules/**',
      'dist/**',
      '**/*.d.ts',
      'public/**',
      '.env*',
      'coverage/**',
    ],
  },
];
