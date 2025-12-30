import type { AstroIntegration } from "astro"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { fileURLToPath } from "url"

export interface IndexNowOptions {
	key?: string
	siteUrl?: string
	enabled?: boolean
	dryRun?: boolean
	maxUrls?: number

	/**
	 * Коллекции astro:content
	 * Пример:
	 * collections: ["posts", "docs"]
	 * → /posts/**, /docs/**
	 */
	collections?: string[]

	/**
	 * Sitemap filename
	 * По умолчанию: sitemap.xml
	 */
	sitemapFile?: string
}

type Cache = Record<string, string>

export default function indexNow(options: IndexNowOptions = {}): AstroIntegration {
	let site: string | null = null

	return {
		name: "astro-indexnow-sitemap",

		hooks: {
			"astro:config:setup": ({ config }) => {
				site = options.siteUrl ?? (config.site ? config.site.replace(/\/$/, "") : null)
			},

			"astro:build:done": async ({ dir, logger }) => {
				if (options.enabled === false) {
					logger.info("[indexnow] disabled")
					return
				}

				if (!options.key) {
					throw new Error("[indexnow] Missing IndexNow key")
				}

				if (!site) {
					throw new Error("[indexnow] Missing site URL")
				}

				const outDir = fileURLToPath(dir)
				const sitemapPath = path.join(outDir, options.sitemapFile ?? "sitemap.xml")

				if (!fs.existsSync(sitemapPath)) {
					logger.warn("[indexnow] sitemap.xml not found, skipping")
					return
				}

				const sitemap = fs.readFileSync(sitemapPath, "utf-8")

				/**
				 * Достаём все <loc>URL</loc>
				 */
				const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])

				if (urls.length === 0) {
					logger.warn("[indexnow] sitemap empty")
					return
				}

				/**
				 * Фильтрация по коллекциям
				 */
				const filteredUrls = options.collections?.length
					? urls.filter(url =>
							options.collections!.some(
								col => url.startsWith(`${site}/${col}/`) || url === `${site}/${col}/`,
							),
					  )
					: urls

				if (filteredUrls.length === 0) {
					logger.info("[indexnow] no URLs after collection filter")
					return
				}

				const cacheFile = path.join(outDir, ".indexnow-cache.json")

				const previousCache: Cache = fs.existsSync(cacheFile)
					? JSON.parse(fs.readFileSync(cacheFile, "utf-8"))
					: {}

				const nextCache: Cache = {}
				const changedUrls: string[] = []

				/**
				 * Hash URL как строку
				 * (sitemap уже отражает реальные изменения)
				 */
				function hashUrl(url: string) {
					return crypto.createHash("sha1").update(url).digest("hex")
				}

				for (const url of filteredUrls) {
					if (url.includes("/404") || url.includes("/draft")) continue

					const hash = hashUrl(url)
					nextCache[url] = hash

					if (previousCache[url] !== hash) {
						changedUrls.push(url)
					}
				}

				if (changedUrls.length === 0) {
					logger.info("[indexnow] no changes detected")
					return
				}

				const finalUrls = changedUrls.slice(0, options.maxUrls ?? 10000)

				logger.info(`[indexnow] ${finalUrls.length} changed URLs detected`)

				for (const url of finalUrls) {
					logger.info(` + ${url}`)
				}

				fs.writeFileSync(cacheFile, JSON.stringify(nextCache, null, 2))

				if (options.dryRun) {
					logger.info("[indexnow] dryRun enabled, skipping submit")
					return
				}

				try {
					const response = await fetch("https://api.indexnow.org/indexnow", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							host: new URL(site).host,
							key: options.key,
							keyLocation: `${site}/${options.key}.txt`,
							urlList: finalUrls,
						}),
					})

					if (!response.ok) {
						logger.warn(`[indexnow] request failed (${response.status})`)
						return
					}

					logger.info(`[indexnow] submitted ${finalUrls.length} URLs`)
				} catch {
					logger.warn("[indexnow] network error")
				}
			},
		},
	}
}
