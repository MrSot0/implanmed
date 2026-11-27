// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages sirve el sitio en https://mrsot0.github.io/implanmed/.
// Con dominio propio: SITE_URL=https://implanmed.com BASE_PATH=/ npm run build
const site = process.env.SITE_URL ?? 'https://mrsot0.github.io';
const base = process.env.BASE_PATH ?? '/implanmed';

/** Prefija con `base` los enlaces absolutos escritos en Markdown (p. ej. desde el CMS). */
function rehypeBaseLinks() {
  const prefix = base.replace(/\/$/, '');
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(prefix + '/')) {
        node.properties.href = prefix + href;
      }
    }
    node.children?.forEach(walk);
  };
  return walk;
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !/\/(admin|carrito|checkout|pedido)\b/.test(page),
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
  image: {
    layout: 'constrained',
  },
});
