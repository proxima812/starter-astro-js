import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import metaTags from "astro-meta-tags"
import { defineConfig } from "astro/config"
import { config } from "./src/config"

export default defineConfig({
  site: `${config.site.url}`,
  svg: {
    namespace: "svg",
  },
	vite: {
		plugins: [tailwindcss()],
	},
	prefetch: {
		defaultStrategy: "viewport",
		prefetchAll: true,
	},
	integrations: [mdx(), sitemap(), icon(), metaTags(), react()],
	output: "static",
})
