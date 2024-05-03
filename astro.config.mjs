import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	server: {
		port: 5253,
		host: true,
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
			nesting: true,
		}),
		mdx(),
	],
	output: 'server',
	adapter: vercel(),
})
