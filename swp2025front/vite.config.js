// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path, { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  server: {
    host: 'localhost',   // 或 '0.0.0.0'，根据你访问的域名/IP 填写
    port: undefined,          // 默认是 5173，若你改过就填实际端口
    hmr: {
      protocol: 'ws',    // 或 'wss'（如果你用 HTTPS）
      host: 'localhost', // 同上
      port: undefined         // 同上
    }
  }
});
