/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./testUtils/setupTest.ts'],
    include: ['./src/**/*.test.tsx'],
    globals: true,
  },
});
