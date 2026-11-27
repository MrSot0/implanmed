/**
 * Carrito de solicitud de pedido. Vive en localStorage del navegador; no hay
 * servidor todavía (ver docs/PLAN.md, fase 2). Emite `cart:change` en window.
 */
export interface CartItem {
  key: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  url: string;
  variant: Record<string, string>;
  qty: number;
  price?: number;
}

export interface Order {
  code: string;
  createdAt: string;
  items: CartItem[];
  customer: Record<string, string>;
}

const CART_KEY = 'implanmed:cart:v1';
const ORDERS_KEY = 'implanmed:orders:v1';
export const MAX_QTY = 999;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento bloqueado: el carrito dura solo esta página */
  }
}

let memory: CartItem[] | null = null;

export function getCart(): CartItem[] {
  if (memory) return memory;
  memory = read<CartItem[]>(CART_KEY, []).filter((i) => i && i.slug && i.qty > 0);
  return memory;
}

function save(items: CartItem[]) {
  memory = items;
  write(CART_KEY, items);
  window.dispatchEvent(new CustomEvent('cart:change', { detail: items }));
}

export function itemKey(slug: string, variant: Record<string, string>) {
  const v = Object.entries(variant)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, val]) => `${k}=${val}`)
    .join('&');
  return v ? `${slug}?${v}` : slug;
}

export function addItem(item: Omit<CartItem, 'key' | 'qty'>, qty = 1) {
  const key = itemKey(item.slug, item.variant);
  const items = [...getCart()];
  const found = items.find((i) => i.key === key);
  if (found) found.qty = Math.min(MAX_QTY, found.qty + qty);
  else items.push({ ...item, key, qty: Math.min(MAX_QTY, Math.max(1, qty)) });
  save(items);
}

export function setQty(key: string, qty: number) {
  const n = Math.floor(qty);
  const items = getCart()
    .map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, n) } : i))
    .filter((i) => i.qty > 0);
  save(items);
}

export function removeItem(key: string) {
  save(getCart().filter((i) => i.key !== key));
}

export function clearCart() {
  save([]);
}

export function cartCount() {
  return getCart().reduce((n, i) => n + i.qty, 0);
}

export function variantLabel(variant: Record<string, string>) {
  return Object.entries(variant)
    .map(([k, v]) => `${k}: ${v}`)
    .join(' · ');
}

export function newOrderCode(date = new Date()) {
  const d = date.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IMP-${d}-${rand}`;
}

export function saveOrder(order: Order) {
  const orders = read<Order[]>(ORDERS_KEY, []);
  orders.unshift(order);
  write(ORDERS_KEY, orders.slice(0, 20));
}

export function getOrders(): Order[] {
  return read<Order[]>(ORDERS_KEY, []);
}

export function getOrder(code: string) {
  return getOrders().find((o) => o.code === code);
}

window.addEventListener('storage', (e) => {
  if (e.key === CART_KEY) {
    memory = null;
    window.dispatchEvent(new CustomEvent('cart:change', { detail: getCart() }));
  }
});

export function orderMessage(order: Pick<Order, 'code' | 'items' | 'customer'>) {
  return [
    `*Solicitud de pedido ${order.code}*`,
    '',
    ...order.items.map((i, n) => {
      const v = variantLabel(i.variant);
      return `${n + 1}. ${i.title} x${i.qty}${v ? ` (${v})` : ''}`;
    }),
    '',
    ...Object.entries(order.customer).map(([k, v]) => `*${k}:* ${v}`),
  ].join('\n');
}
