import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import mdx from '@astrojs/mdx'

import react from '@astrojs/react'

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
		react(),
	],
	output: 'server',
	adapter: vercel(),
})
