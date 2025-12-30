import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import metaTags from "astro-meta-tags"
import { defineConfig } from "astro/config"
import { config } from "./src/config"
import indexNow from "./src/integrations/indexNow"

export default defineConfig({
	site: config.site.url,

	output: "static",

	svg: {
		namespace: "svg",
	},

	/**
	 * ⭐ NEW Astro 5.16
	 * Оптимизация SVG на этапе билда
	 */
	experimental: {
		svgo: {
			plugins: [
				"preset-default",
				"removeDimensions",
				{
					name: "removeViewBox",
					active: false, // ❗ важно для responsive SVG
				},
			],
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},

	prefetch: {
		defaultStrategy: "viewport",
		prefetchAll: true,
	},

	integrations: [
		mdx(),
		sitemap(),
		icon(),
		metaTags(),
		react(),
		indexNow({
			key: "abcd1234efgh",
			collections: ["posts", "pages"], // 🔥 astro:content
			sitemapFile: "sitemap.xml",
			maxUrls: 10000,
			dryRun: false,
		}),
	],
})
