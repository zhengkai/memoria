import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		minify: false,
		sourcemap: true,
		target: 'esnext',
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				manualChunks: undefined,
			}
		}
	}
})
