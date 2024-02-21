import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'lib/main.js'),
            name: 'PointsOfInterestMap',
            // the proper extensions will be added
            fileName: 'points-of-interest-map',
        },
        rollupOptions: {
            output: {
                assetFileNames: "points-of-interest-map.[ext]",
            },
        },
        sourcemap: true
    },
})