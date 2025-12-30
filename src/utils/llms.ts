import type { CollectionEntry } from "astro:content"

/* ===== TYPES ===== */

export type Post = CollectionEntry<"posts">
export type Page = CollectionEntry<"pages">

export interface LlmsItem {
	title: string
	description: string
	link: string
}

export interface LlmsFullItem extends LlmsItem {
	pubDate?: string
	body: string
}

/* ===== HELPERS ===== */

function txt(content: string) {
	return new Response(content.trim() + "\n", {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"X-Robots-Tag": "noindex, nofollow",
		},
	})
}

/* ===== INDEX ===== */

export function llmsIndex(
	site: string,
	title: string,
	description: string,
	items: LlmsItem[],
) {
	return txt(
		[
			`# ${title}`,
			`> ${description}`,
			"",
			...items.map(
				item =>
					`- [${item.title}](${site}${item.link})${
						item.description ? ` — ${item.description}` : ""
					}`,
			),
		].join("\n"),
	)
}

/* ===== FULL DUMP ===== */

export function llmsFull(site: string, title: string, items: LlmsFullItem[]) {
	const out: string[] = [`# ${title}`, "", "---", ""]

	for (const item of items) {
		out.push(`## ${item.title}`)
		out.push(`URL: ${site}${item.link}`)
		if (item.pubDate) out.push(`Published: ${item.pubDate}`)
		out.push("")
		out.push(item.body)
		out.push("", "---", "")
	}

	return txt(out.join("\n"))
}

/* ===== SINGLE POST ===== */

export function llmsPost(site: string, post: Post, url: string) {
	return txt(
		[
			`# ${post.data.title}`,
			post.data.description ? `> ${post.data.description}` : "",
			"",
			`URL: ${site}${url}`,
			"",
			post.body ?? "",
		].join("\n"),
	)
}
