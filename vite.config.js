import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // Only compile files in /src with .js or .jsx extension
    exclude: [],
  },
});
