import columna from '../assets/img/columna2.webp';
import trauma from '../assets/img/osteo2.webp';
import craneo from '../assets/img/craneo2.jpg';
import insumos from '../assets/img/insumos2.webp';

export type Tono = 'azul' | 'verde' | 'coral' | 'amarillo';

export const CATEGORIAS = [
  {
    slug: 'columna',
    nombre: 'Columna y Neurocirugía',
    tono: 'azul' as Tono,
    badge: 'Alta demanda',
    badgeClass: 'badge-alta-demanda',
    imagen: columna,
    resumen:
      'Sistemas cervicales, lumbares y torácicos de titanio grado médico. Cajas de fusión intersomáticas, mallas de titanio y fijación pedicular.',
  },
  {
    slug: 'traumatologia',
    nombre: 'Traumatología y Osteosíntesis',
    tono: 'verde' as Tono,
    badge: 'Disponible',
    badgeClass: 'badge-disponible',
    imagen: trauma,
    resumen:
      'Mini y pequeños fragmentos, placas DCP, LC-DCP, L y T, placas LCP de grandes fragmentos, clavos intramedulares y fijadores externos.',
  },
  {
    slug: 'maxilofacial',
    nombre: 'Cráneo Buco Maxilofacial',
    tono: 'coral' as Tono,
    badge: 'Especializado',
    badgeClass: 'badge-especializado',
    imagen: craneo,
    resumen:
      'Placas, mallas y sistemas de reconstrucción orbital, mandibular y craneal, incluidos casos planificados a la medida del paciente.',
  },
  {
    slug: 'insumos',
    nombre: 'Insumos Médicos',
    tono: 'amarillo' as Tono,
    badge: 'Stock permanente',
    badgeClass: 'badge-stock',
    imagen: insumos,
    resumen:
      'Vestimenta quirúrgica estéril, campos operatorios, suturas y material descartable para pabellón.',
  },
] as const;

export type CategoriaSlug = (typeof CATEGORIAS)[number]['slug'];
export const CATEGORIA_SLUGS = CATEGORIAS.map((c) => c.slug) as [CategoriaSlug, ...CategoriaSlug[]];

export function getCategoria(slug: string) {
  return CATEGORIAS.find((c) => c.slug === slug);
}
