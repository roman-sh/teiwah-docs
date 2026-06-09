// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.teiwah.cloud',
	integrations: [
		// Must come before starlight so it can process Markdown/MDX code blocks.
		mermaid({ autoTheme: true }),
		starlight({
			title: 'Teiwah Docs',
			description:
				'WhatsApp automation API. Send messages, receive webhooks, and handle media through a simple session-based API.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			social: [
				{
					icon: 'external',
					label: 'Dashboard',
					href: 'https://teiwah.cloud/dashboard',
				},
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', link: '/' },
						{ label: 'Quickstart', slug: 'guides/quickstart' },
						{ label: 'Authentication', slug: 'guides/authentication' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Send a message', slug: 'guides/send-message' },
						{ label: 'Receive webhooks', slug: 'guides/webhooks' },
						{ label: 'Working with media', slug: 'guides/media' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'API Reference', link: '/api-reference/' },
						{ label: 'Message types', slug: 'reference/message-types' },
						{ label: 'Errors & limits', slug: 'reference/errors' },
					],
				},
			],
		}),
	],
});
