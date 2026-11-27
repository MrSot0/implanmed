import { getCollection } from 'astro:content';
import { CATEGORIAS } from './categorias';

export async function getProducts() {
  const items = await getCollection('productos', ({ data }) => import.meta.env.DEV || !data.draft);
  const catOrder = (c: string) => CATEGORIAS.findIndex((x) => x.slug === c);
  return items.sort(
    (a, b) => catOrder(a.data.category) - catOrder(b.data.category) || a.data.order - b.data.order,
  );
}
