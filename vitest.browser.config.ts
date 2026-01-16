/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular'
import { playwright } from '@vitest/browser-playwright'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const workspaceRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: workspaceRoot,
  plugins: [
    angular({
      tsconfig: resolve(workspaceRoot, 'projects/quang/tsconfig.spec.json'),
    }),
    viteTsConfigPaths(),
  ],
  test: {
    root: workspaceRoot,
    globals: true,
    setupFiles: ['projects/quang/test-setup.ts'],
    include: ['projects/quang/**/*.browser.spec.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
})
