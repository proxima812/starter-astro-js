import { getCollection } from "astro:content"

export const socials = [
	{
		aria_label: "Youtube",
		title: "@userName2",
		href: "#",
		social: "youtube",
	},
	{
		aria_label: "ВКонтакте",
		title: "ВКонтакте",
		href: "#",
		social: "vk",
	},
	{
		aria_label: "WhatsApp",
		title: "+7 (000) 000-00-00",
		href: "#",
		social: "ws",
	},
	{
		aria_label: "Telegram",
		title: "@telegram",
		href: "#",
		social: "tg",
	},
	{
		aria_label: "Instagram",
		title: "@man9",
		href: "#",
		social: "inst",
	},
	{
		aria_label: "GitHub",
		title: "@Kamil12",
		href: "#",
		social: "github",
	},
	// {
	// 	aria_label: "",
	// 	href: "#",
	// 	social: "",
	// },
]

const posts = await getCollection("posts")

export const navigation = [
	{
		label: "Ссылка",
		href: "#",
		target: "_blank",
		icon: "mdi:progress-pencil",
		style: "",
	},
	{
		label: "Ссылка",
		href: "#",
		target: "_blank",
		icon: "mdi:progress-pencil",
		style: "",
	},
	{
		label: "Ссылка",
		href: "#",
		style: "",
	},
	// {
	// 	label: "",
	// 	href: "#",
	// 	target: "",
	// 	icon: "",
	// 	style: "",
	// },
]

export const navigation_footer = [
	{
		category: "Категория 1",
		colunm1: [
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "",
			},
			// {
			// 	label: "Ссылка1",
			// 	href: "#",
			// 	target: "_blank",
			// 	icon: "mdi:progress-pencil",
			// 	style: "",
			// },
		],
	},
	{
		category: "Категория из коллеции",
		colunm1: posts.map(post => ({
			label: post.data.title,
			href: `/posts/${post.id}/`,
			target: "_blank",
			icon: "mdi:progress-pencil",
			style: "",
		})),
	},
	{
		category: "Категория 2",
		colunm2: [
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "",
			},
			{
				label: "Ссылка1",
				href: "#",
				target: "_blank",
				icon: "mdi:progress-pencil",
				style: "underline-offset-4 text-blue-500 underline",
			},
			// {
			// 	label: "Ссылка1",
			// 	href: "#",
			// 	target: "_blank",
			// 	icon: "mdi:progress-pencil",
			// 	style: "",
			// },
		],
	},
]
