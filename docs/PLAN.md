# Plan del sitio empresarial con e-commerce

## Fase 1: migración a Astro y tienda por cotización (hecha)

- Migración del sitio de HTML/CSS/JS a Astro 7, conservando el diseño (navbar blanca, hero oscuro con carrusel, tarjetas por línea con su color, servicios, academia, formulario, blog, footer).
- Páginas nuevas: catálogo con búsqueda, filtros y orden; página por categoría; ficha de producto con opciones (lado, forma, talla) y cantidad; carrito; checkout; confirmación con código de pedido; servicios; nosotros; contacto; blog con artículo individual; términos, devoluciones y privacidad; 404.
- Carrito persistente en el navegador. El pedido se envía por WhatsApp con todos los datos.
- CMS para blog y catálogo en `/admin` (Sveltia CMS sobre GitHub).
- SEO: un `h1` por página, títulos y descripciones propios, canonical, Open Graph, sitemap, robots, datos estructurados (MedicalBusiness, Product, Article, BreadcrumbList).
- Rendimiento: imágenes convertidas a WebP con `srcset`, carga diferida, sin JavaScript de terceros.
- Accesibilidad: enlace para saltar al contenido, foco visible, carrusel operable con teclado y que se pausa con foco o hover, respeto de `prefers-reduced-motion`, contraste AA en textos de color.
- Correcciones del sitio anterior: popup y footer fuera de `<body>`, `meta description` duplicada, cuatro `h1`, flechas del teclado capturadas en toda la página, enlaces `href="#"`, botón con un enlace adentro, popup "en construcción" en el login y el carrito.
- Contenido: textos reescritos sin frases genéricas, títulos en tipo oración, se quitó la referencia no verificable al NEJM y se agregaron las fotos reales del equipo y del evento académico.

### Pendiente de la empresa

- [ ] Activar GitHub Pages con origen "GitHub Actions".
- [ ] Revisar con un abogado los textos legales (`src/pages/legal/`).
- [ ] Revisar con el equipo médico los artículos del blog.
- [ ] Confirmar fichas del catálogo (medidas, marcas, disponibilidad) y fotos propias de cada producto.
- [ ] Configurar el acceso al CMS (token o proxy OAuth; ver README).

## Fase 2: cuentas y pedidos en servidor

Objetivo: que los pedidos no dependan solo de WhatsApp y que los clientes recurrentes (clínicas, cirujanos) vean su historial.

- Backend con Supabase (Postgres + Auth): tablas `customers`, `orders`, `order_items`, `quotes`.
- Registro e inicio de sesión (correo o enlace mágico) para médicos e instituciones.
- Al enviar el checkout se guarda el pedido en la base de datos y además se abre WhatsApp.
- Panel interno para el equipo: estados del pedido (recibido, cotizado, aprobado por el seguro, programado, entregado, facturado).
- Correo de confirmación al cliente.
- Cambio necesario: modo híbrido de Astro con adaptador (Netlify, Vercel o Cloudflare) para las rutas de servidor, o funciones de Supabase manteniendo el sitio estático.

## Fase 3: precios y pagos en línea

- Lista de precios por tipo de cliente (paciente, clínica, aseguradora) visible solo con sesión iniciada.
- Pagos: pago móvil y transferencia con conciliación manual primero; luego pasarela (según opciones disponibles en Venezuela) y Zelle/Binance con comprobante.
- Facturación con número de control y datos fiscales.
- Inventario y lotes para trazabilidad de implantes.

## Fase 4: crecimiento

- Analítica respetuosa de la privacidad (Plausible o Umami) y eventos de conversión: "agregar a la solicitud", "enviar pedido", clic en WhatsApp.
- Perfil de Google Business y páginas por especialidad para búsquedas locales.
- Calendario de la academia con inscripción a talleres.
- Versión en inglés si se atienden pacientes del exterior.
