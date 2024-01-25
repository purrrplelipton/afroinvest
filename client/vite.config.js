import svgr from "@svgr/rollup"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { defineConfig } from "vite"

//https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			"@app": resolve(__dirname, "./src/"),
		},
	},
	server: {
		proxy: {
			"/gwy": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
})
