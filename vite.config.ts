import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Подключаем postcss напрямую, если конфиг лежит рядом
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'Dockerfile', dest: '' },
      ],
    }),
  ]
});
