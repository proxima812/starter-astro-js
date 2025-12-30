// src/pages/llms.txt.ts
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { llmsIndex } from "@/utils/llms"

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection("posts")
	const pages = await getCollection("pages")

	return llmsIndex(
		site!.toString(),
		"Site content index",
		"Posts and pages available for LLMs",
		[
			...posts.map(p => ({
				title: p.data.title,
				description: p.data.description ?? "",
				link: `posts/${p.id}.txt`,
			})),
			...pages.map(p => ({
				title: p.data.title,
				description: p.data.description ?? "",
				link: `pages/${p.id}.txt`,
			})),
		],
	)
}
