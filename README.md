# starter Astro for site

## Components

- Menu.astro
- Layout.astro
- SEO.astro
- Link.astro
- Header.astro
- Footer.astro
- Container

## Pages

- [...pages].astro
- [slug].astro

## src

- rss.xml.ts
- robots.txt.ts
- Tailwind v4
- config.ts
- utils/cn.ts
- data/links.ts

## Tailwind settings

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-display: font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

@layer base {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply text-balance;
  }

  p {
    @apply text-pretty;
  }

  a {
    @apply underline text-blue-500 underline-offset-4;
  }
}

@layer components {
  .heading-h1 {
    @apply text-5xl text-zinc-800 font-black tracking-tight;
  }

  .heading-h2 {
    @apply text-2xl text-zinc-700 font-bold;
  }

  .heading-h3 {
    @apply text-xl text-zinc-600 font-medium;
  }
}
```

## TS settings

```ts
"paths": {
	"@/*": ["src/*"]
},
```
