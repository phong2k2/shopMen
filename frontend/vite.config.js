import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Đường dẫn tới thư mục src của dự án
    },
  },
  plugins: [react()],
})
