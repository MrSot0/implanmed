import { getCollection } from 'astro:content';

export const BLOG_CATEGORIAS = {
  postoperatorio: { label: 'Postoperatorio', class: 'bg-azul' },
  productos: { label: 'Productos', class: 'bg-verde' },
  articulo: { label: 'Artículo médico', class: 'bg-morado' },
} as const;

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
