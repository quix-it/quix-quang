/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    angular({
      tsconfig: 'projects/quang/tsconfig.spec.json',
    }),
    viteTsConfigPaths(),
  ],
  test: {
    globals: true,
    include: ['projects/quang/**/*.browser.spec.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
