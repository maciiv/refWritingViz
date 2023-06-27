import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, 'src/main.ts'),
			name: 'rwv',
			// the proper extensions will be added
			fileName: 'rwv',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['d3'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					d3: 'd3',
				},
			},
		},
	},
})
