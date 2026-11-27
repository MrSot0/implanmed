// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';

// El sitio se publica en Vercel, en la raíz del dominio.
// SITE_URL fija el dominio de producción (canonical, sitemap, Open Graph). Si no está
// definida, se usa el dominio de producción que Vercel expone al compilar.
// BASE_PATH solo hace falta si el sitio se sirve en una subcarpeta (p. ej. /implanmed).
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL ?? (vercelHost ? `https://${vercelHost}` : 'http://localhost:4321');
const base = process.env.BASE_PATH ?? '/';

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
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeBaseLinks] }),
  },
  image: {
    layout: 'constrained',
  },
});
