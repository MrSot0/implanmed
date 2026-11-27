import type { APIRoute } from 'astro';
import { url } from '../data/url';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(url('/sitemap-index.xml'), site).href;
  const body = [
    'User-agent: *',
    'Allow: /',
    ...['/admin', '/carrito', '/checkout', '/pedido'].map((p) => `Disallow: ${url(p)}`),
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
