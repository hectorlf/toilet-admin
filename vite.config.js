import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pageList: resolve(__dirname, 'page-list.html'),
        postEditor: resolve(__dirname, 'post-editor.html'),
        tagEdit: resolve(__dirname, 'tag-edit.html'),
        tagList: resolve(__dirname, 'tag-list.html'),
        tagNew: resolve(__dirname, 'tag-new.html')
      }
    }
  }
})
