import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    // Git worktrees live under .claude/worktrees/. Their test files import
    // via the `@` alias, which resolves against THIS project root rather
    // than the worktree's, so a branch that adds a new module fails to
    // resolve and turns the whole run red. Spread the defaults rather than
    // replacing them - `exclude` overwrites node_modules/dist otherwise.
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
