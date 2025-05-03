import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ["src/tests/**/*.test.{js,jsx,ts,tsx}"],
  },
});
