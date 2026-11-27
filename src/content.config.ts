import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIA_SLUGS } from './data/categorias';

// Ambas colecciones se editan desde /admin (Sveltia CMS). Ver public/admin/config.yml.

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(['postoperatorio', 'productos', 'articulo']),
      image: image(),
      imageAlt: z.string(),
      author: z.string().default('Equipo IMPLANMED'),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(CATEGORIA_SLUGS),
      summary: z.string(),
      image: image(),
      imageAlt: z.string(),
      features: z.array(z.string()).default([]),
      variants: z
        .array(z.object({ name: z.string(), options: z.array(z.string()).min(1) }))
        .default([]),
      /** Precio de referencia en USD. Vacío = se cotiza. */
      price: z.number().positive().optional(),
      availability: z.enum(['disponible', 'bajo-pedido']).default('disponible'),
      brand: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, productos };
