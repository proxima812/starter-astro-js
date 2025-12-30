export type NavItem = {
	label: string
	href: string
	target?: "_blank" | "_self"
	icon?: string
	style?: string
}

export const navigation: NavItem[] = [
	{
		label: "Ссылка из navigation",
		href: "#",
		// target: "_blank",
		icon: "mdi:progress-pencil",
		style: "",
	},
	{
		label: "Ссылка",
		href: "#",
		// target: "_blank",
		icon: "mdi:progress-pencil",
		style: "",
	},
	{
		label: "Ссылка",
		href: "#",
		style: "",
	},
]
