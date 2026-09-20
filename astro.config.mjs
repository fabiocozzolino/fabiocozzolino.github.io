import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://www.fabiocozzolino.eu';

export default defineConfig({
  site,
  output: 'static',
  compressHTML: true,
  trailingSlash: 'ignore',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-dark' },
  },
  integrations: [mdx(), sitemap()],
});