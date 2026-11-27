export const SITE = {
  name: 'IMPLANMED C.A.',
  shortName: 'IMPLANMED',
  legalName: 'Implantes Médicos Quirúrgicos, C.A.',
  rif: 'J-406078964',
  description:
    'Implantes de columna, traumatología y maxilofacial, insumos de pabellón e instrumentación quirúrgica en Maracaibo, Venezuela.',
  phoneDisplay: '+58 424-6434299',
  phone: '+584246434299',
  whatsapp: '584246434299',
  email: 'implanmed.ca@gmail.com',
  address: {
    street: 'Av. 4 Bella Vista con Calle 82, Edificio Benka, Local PB 4',
    city: 'Maracaibo',
    region: 'Zulia',
    country: 'VE',
    full: 'Av. 4 Bella Vista con Calle 82, Edificio Benka, Local PB 4. Maracaibo, Zulia, Venezuela.',
  },
  geo: { lat: 10.6611042, lng: -71.6063254 },
  mapsUrl:
    'https://www.google.com/maps/place/Implantes+M%C3%A9dicos+Quir%C3%BArgicos+c.a/@10.6611042,-71.6063254,17z',
  mapsEmbed: 'https://www.google.com/maps?q=10.6611042,-71.6063254&hl=es&z=16&output=embed',
  social: {
    instagram: 'https://www.instagram.com/implanmedonline',
    instagramHandle: '@implanmedonline',
    facebook: 'https://www.facebook.com/p/Implanmedonline-100067800814955/',
  },
} as const;

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/productos', label: 'Productos' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export function waLink(text?: string) {
  return `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
