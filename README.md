# IMPLANMED: sitio web

Sitio de IMPLANMED C.A. (Maracaibo, Venezuela) construido con [Astro](https://astro.build), con Tailwind CSS v4, catálogo, solicitud de pedido por WhatsApp, blog y CMS.

## Desarrollo

Requiere Node 22.23 o superior.

```bash
npm install
npm run dev        # http://localhost:4321/
npm run build      # verifica tipos (astro check) y genera dist/
npm run preview
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/pages/` | Páginas: inicio, productos, categoría, ficha, carrito, checkout, pedido, servicios, nosotros, contacto, blog, legales, `admin` |
| `src/content/productos/*.md` | Catálogo (una ficha por archivo, editable desde el CMS) |
| `src/content/blog/*.md` | Artículos del blog (editables desde el CMS) |
| `src/content.config.ts` | Esquema de ambas colecciones |
| `src/data/site.ts` | Teléfono, WhatsApp, dirección, redes, menú |
| `src/data/categorias.ts` | Las 4 líneas de producto |
| `src/scripts/cart.ts` | Carrito en `localStorage` y armado del mensaje del pedido |
| `src/styles/global.css` | Tailwind: paleta de la marca (`@theme`), estilos base y dos utilidades propias |
| `src/data/tonos.ts` | Clases de Tailwind por color de línea (azul, verde, coral, amarillo) |
| `src/data/ui.ts` | Recetas de clases repetidas: botones, campos de formulario, títulos, texto largo |
| `public/admin/config.yml` | Configuración del CMS |

## Estilos

Todo el estilo está escrito con utilidades de Tailwind en los componentes. Los colores de la marca son tokens del tema (`bg-morado`, `text-azul-texto`, `border-l-verde`…), definidos en `src/styles/global.css`. Para cambiar un color basta con editarlo ahí.

Las clases que dependen de la línea de producto están completas en `src/data/tonos.ts` para que Tailwind las detecte; no armes clases con plantillas (`bg-${color}`), porque no se generan.

## Cómo funciona la tienda

El sitio es estático. El cliente arma una **solicitud de pedido** (productos, opciones y cantidades), completa sus datos en `/checkout` y el sitio abre WhatsApp con el pedido escrito y un código `IMP-AAAAMMDD-XXXX`. No hay cobros en línea: el asesor responde con el presupuesto formal. Si un producto tiene `price`, se muestra como precio de referencia.

## CMS (blog y catálogo)

El panel está en `/admin` y usa [Sveltia CMS](https://github.com/sveltia/sveltia-cms) con backend de GitHub. Cada cambio guardado es un commit en `main`, y Vercel vuelve a publicar el sitio en uno o dos minutos.

Para entrar:

- **Con token** (sin configurar nada más): crear un *fine-grained personal access token* en GitHub con acceso a este repositorio y permiso *Contents: Read and write*, y usar "Sign In Using Access Token".
- **Con botón de GitHub** (recomendado para varios editores): desplegar el proxy OAuth [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) en Cloudflare Workers (gratis), crear una OAuth App en GitHub y poner su URL en `backend.base_url` de `public/admin/config.yml`.

Las imágenes subidas desde el CMS quedan en `src/assets/uploads/` y Astro las optimiza al compilar.

## Despliegue

El sitio se publica en **Vercel**, que detecta Astro y ejecuta `npm run build` con salida en `dist/`. Cada push a `main` genera un despliegue de producción y cada rama, una vista previa.

El dominio para canonical, sitemap y Open Graph se toma de `VERCEL_PROJECT_PRODUCTION_URL`. Si se usa un dominio propio, definir `SITE_URL=https://dominio.com` en las variables de entorno del proyecto en Vercel.

Plan de trabajo por fases: [docs/PLAN.md](docs/PLAN.md).
