/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  plugins: [
    angular({
      tsconfig: 'projects/quang/tsconfig.spec.json',
    }),
    viteTsConfigPaths(),
  ],
  test: {
    globals: true,
    setupFiles: ['projects/quang/test-setup.ts'],
    environment: 'jsdom',
    include: ['projects/quang/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true,
      include: ['projects/quang/**/*.ts'],
      exclude: [
        'projects/quang/**/*.spec.ts',
        'projects/quang/**/*.test.ts',
        'projects/quang/**/index.ts',
        'projects/quang/**/ng-package.json',
        'projects/quang/test-setup.ts',
        'projects/quang/**/*.d.ts',
      ],
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}))
