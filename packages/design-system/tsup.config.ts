/* eslint-disable no-console */
import { defineConfig } from 'tsup';
import { cssModulesPlugin } from './plugins/css-modules-plugin.js';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [cssModulesPlugin()],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess: async () => {
    const { execSync } = await import('child_process');
    try {
      execSync('cp src/tokens.css dist/ && cp src/globals.css dist/', {
        stdio: 'inherit',
      });
    } catch (error) {
      console.warn('Could not copy CSS files:', error.message);
    }
  },
});
