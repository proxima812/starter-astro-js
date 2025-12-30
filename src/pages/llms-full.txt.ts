// src/pages/llms-full.txt.ts
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { llmsFull } from "@/utils/llms"

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection("posts")

	return llmsFull(
		site!.toString(),
		"Full posts content",
		posts.map(post => ({
			title: post.data.title,
			description: post.data.description ?? "",
			link: `posts/${post.id}`,
			pubDate:
				post.data.pubDate instanceof Date
					? post.data.pubDate.toISOString().slice(0, 10)
					: post.data.pubDate,
			body: post.body ?? "",
		})),
	)
}
