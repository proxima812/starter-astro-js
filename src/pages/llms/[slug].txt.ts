// src/pages/llms/[id].txt.ts
import type { APIRoute, GetStaticPaths } from "astro"
import { getCollection } from "astro:content"
import { llmsPost } from "@/utils/llms"

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection("posts")
	return posts.map(post => ({
		params: { slug: post.id },
	}))
}

export const GET: APIRoute = async ({ params, site }) => {
	const posts = await getCollection("posts")
	const post = posts.find(p => p.id === params.id)

	if (!post) {
		return new Response("Not found", { status: 404 })
	}

	return llmsPost(site!.toString(), post, `posts/${post.id}`)
}
