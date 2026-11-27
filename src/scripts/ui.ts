import { addItem, cartCount } from './cart';

// --- Contador del carrito en la navbar ---
function renderCount() {
  const n = cartCount();
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.textContent = n > 99 ? '99+' : String(n);
    el.hidden = n === 0;
  });
}
renderCount();
window.addEventListener('cart:change', renderCount);

// --- Aviso breve ---
let toastTimer: number | undefined;
export function toast(message: string) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.dataset.visible = 'true';
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (el.dataset.visible = 'false'), 2600);
}

// --- Botones "agregar" en tarjetas y fichas ---
// <button data-add-to-cart data-slug data-title ...> ; las variantes se leen de
// los <select data-variant="Nombre"> dentro del mismo [data-product-form].
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-add-to-cart]');
  if (!btn) return;
  e.preventDefault();
  const d = btn.dataset;
  const form = btn.closest('[data-product-form]');
  const variant: Record<string, string> = {};
  let qty = 1;
  if (form) {
    for (const sel of form.querySelectorAll<HTMLSelectElement>('select[data-variant]')) {
      if (!sel.value) {
        sel.focus();
        toast(`Elige ${sel.dataset.variant?.toLowerCase()}`);
        return;
      }
      variant[sel.dataset.variant!] = sel.value;
    }
    const q = form.querySelector<HTMLInputElement>('input[data-qty]');
    if (q) qty = Math.max(1, Number(q.value) || 1);
  }
  addItem(
    {
      slug: d.slug!,
      title: d.title!,
      category: d.category ?? '',
      image: d.image ?? '',
      url: d.url ?? '',
      variant,
      price: d.price ? Number(d.price) : undefined,
    },
    qty,
  );
  toast(`Agregado a la solicitud: ${d.title}`);
});

// --- Menú móvil ---
const nav = document.getElementById('navbar');
const toggle = document.getElementById('menu-toggle');
const links = document.getElementById('nav-links');
if (nav && toggle && links) {
  const setOpen = (open: boolean) => {
    nav.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  toggle.addEventListener('click', () => setOpen(nav.dataset.open !== 'true'));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
}

// --- Volver arriba ---
const btnTop = document.getElementById('btn-top');
if (btnTop) {
  const onScroll = () => (btnTop.dataset.visible = String(window.scrollY > 400));
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
