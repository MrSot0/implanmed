/** Recetas de clases que se repiten en varias páginas. */

/** Ancho y márgenes laterales de las secciones (8% como el diseño original). */
export const section = 'w-full px-4 sm:px-[8%]';

export const btn = {
  /** Botón morado principal (tarjetas, ver catálogo). */
  primary:
    'inline-flex items-center justify-center gap-2 rounded-lg bg-morado px-4 py-2.5 text-[0.85rem] font-bold text-white transition-colors hover:bg-morado-oscuro',
  /** Botón morado ancho de formularios. */
  submit:
    'flex w-full items-center justify-center gap-2.5 rounded-xl bg-morado px-6 py-4 text-[0.9rem] font-bold tracking-[0.04em] text-white transition-colors hover:bg-morado-oscuro',
  /** Botón morado mediano (servicios, mapa). */
  medium:
    'inline-block rounded-[10px] bg-morado-claro px-6 py-3 text-center text-[0.9rem] font-bold text-white transition-colors hover:bg-morado',
  whatsapp:
    'inline-flex items-center gap-2.5 rounded-xl bg-whatsapp px-7 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgb(37_211_102/0.35)] transition hover:-translate-y-0.5 hover:bg-[#1fb956]',
  /** Enlace de texto morado en negrita ("Ver todos", "Conocer al equipo"). */
  link: 'text-[0.9rem] font-bold whitespace-nowrap text-morado transition-colors hover:text-morado-oscuro hover:underline',
};

export const link = 'text-morado-claro underline underline-offset-[3px] hover:text-morado';

export const form = {
  card: 'rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(15_23_42/0.06)] sm:p-10',
  title: 'mb-7 text-[1.4rem] font-bold text-slate-900',
  field: 'flex flex-col gap-2',
  label: 'text-sm font-semibold text-slate-700',
  input:
    'w-full rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-[0.9rem] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-morado-claro focus:ring-3 focus:ring-morado-claro/15 aria-[invalid=true]:border-red-600',
  row: 'grid grid-cols-1 gap-4 sm:grid-cols-2',
  disclaimer: 'text-center text-[0.78rem] leading-normal text-slate-400',
  error: 'text-[0.85rem] font-semibold text-red-700',
};

/** Lista con viñetas de color (agregar el marker del tono). */
export const bullets = 'list-disc space-y-2 pl-4 text-[0.85rem] font-semibold text-slate-700';

/** Título grande de sección sobre fondo claro. */
export const h2 = 'text-[2rem] leading-[1.2] font-extrabold tracking-[-0.02em] text-slate-900 sm:text-[2.4rem]';

/** Texto largo en Markdown (blog, fichas, legales). */
export const prose =
  'prose prose-slate max-w-none prose-headings:tracking-[-0.01em] prose-headings:text-slate-900 prose-a:text-morado prose-a:underline-offset-[3px] prose-li:marker:text-morado prose-img:rounded-xl';
