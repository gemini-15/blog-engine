import { defineConfig } from 'vitest/config'
import { transformWithEsbuild } from 'vite'
import path from "path";
import dotenv from "dotenv"; 
import tailwindcss from "@tailwindcss/vite";

dotenv.config(); 


import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  optimizeDeps: {
    esbuildOptions: {
     loader: {
      '.js': 'jsx'
     }
    }
   },
  server: {
  port: 8080,
  },
  plugins: [
  {
    name: 'treat-js-files-as-jsx',
    async transform(code, id) {
    if (!id.match(/src\/.*\.js$/)) return null; // include ts or tsx for TypeScript support 
    // Use the exposed transform from vite, instead of directly
    // transforming with esbuild
    return transformWithEsbuild(code, id, {
      loader: 'jsx',
      jsx: 'automatic',
    });
    },
  },
  react(), 
  tailwindcss()
  ].filter(Boolean),
  resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  },
  define: {
    'process.env': {}, 
    "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    }}
})
