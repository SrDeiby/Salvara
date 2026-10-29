// Catálogo y datos de contacto. Todo lo editable (productos, precios, fotos, textos) vive aquí.
// Precios y condiciones tomados de las publicaciones de @salvaracr (octubre 2026).

export const contacto = {
  telefono: "7017-2606",
  whatsappNumero: "50670172606",
  instagram: "https://www.instagram.com/salvaracr/",
  ubicacion: "Cañas, Guanacaste",
};

export const anuncios = [
  "Marcas originales garantizadas",
  "Envíos a todo Costa Rica",
  "Pedí con la mitad · Apartado 30 días",
  "Entregas en Guanacaste",
  `WhatsApp ${contacto.telefono}`,
];

export type Categoria = "botas" | "bolsos" | "ropa" | "gorras";

export const categorias: { id: Categoria | "todo"; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "botas", label: "Botas" },
  { id: "bolsos", label: "Bolsos y carteras" },
  { id: "ropa", label: "Ropa" },
  { id: "gorras", label: "Gorras" },
];

export type Producto = {
  id: string;
  nombre: string;
  marca: string;
  categoria: Categoria;
  para: "Dama" | "Caballero" | "Unisex";
  foto: string;
  // null = "consultar precio"
  precio: number | null;
  desde?: boolean;
  // Monto para apartar / pedir (la mitad, según su política)
  reserva?: number;
  entrega: "inmediata" | "pedido";
  detalle: string;
  tallas?: string[];
  opciones?: { label: string; valores: string[] };
  nuevo?: boolean;
};

const tallasDama = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"];
const tallasCaballero = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"];

export const productos: Producto[] = [
  {
    id: "ariat-circuit",
    nombre: "Botas Circuit · Cactus",
    marca: "Ariat",
    categoria: "botas",
    para: "Dama",
    foto: "/productos/ariat-circuit.jpg",
    precio: 72900,
    reserva: 36450,
    entrega: "inmediata",
    detalle: "Caña bordada con cactus y ribete rosado, punta cuadrada. Últimas en talla 37 (24 cm).",
    tallas: ["37 (24 cm)"],
  },
  {
    id: "ariat-dama-azul",
    nombre: "Botas de dama · Caña turquesa",
    marca: "Ariat",
    categoria: "botas",
    para: "Dama",
    foto: "/productos/ariat-entrega-inmediata.jpg",
    precio: 95000,
    reserva: 47500,
    entrega: "inmediata",
    detalle: "Cuero cognac con caña turquesa bordada y suela liviana. Disponible en talla 7B (37.5).",
    tallas: ["7B (37.5)"],
  },
  {
    id: "ariat-dama-pedido",
    nombre: "Botas de dama · Línea completa",
    marca: "Ariat",
    categoria: "botas",
    para: "Dama",
    foto: "/productos/ariat-dama.jpg",
    precio: 90000,
    reserva: 45000,
    entrega: "pedido",
    detalle: "Todos los modelos y tallas de Ariat para dama. Llegan en 10 días. Para Navidad, pedidos hasta el 15 de diciembre.",
    tallas: tallasDama,
    nuevo: true,
  },
  {
    id: "ariat-patriot",
    nombre: "Botas Patriot",
    marca: "Ariat",
    categoria: "botas",
    para: "Caballero",
    foto: "/productos/ariat-patriot.jpg",
    precio: null,
    reserva: 45000,
    entrega: "pedido",
    detalle: "Toda la línea Ariat para caballero bajo pedido. 10 días en llegar y 30 días para cancelar.",
    tallas: tallasCaballero,
  },
  {
    id: "bolso-wrangler",
    nombre: "Bolso western",
    marca: "Wrangler",
    categoria: "bolsos",
    para: "Dama",
    foto: "/productos/bolso-wrangler.jpg",
    precio: 44900,
    reserva: 22450,
    entrega: "pedido",
    detalle: "Bolso de mano estilo western. Pedí con la mitad, sistema de apartado.",
    nuevo: true,
  },
  {
    id: "set-wrangler",
    nombre: "Set bolso + cartera + llavero",
    marca: "Wrangler",
    categoria: "bolsos",
    para: "Dama",
    foto: "/productos/set-wrangler.jpg",
    precio: null,
    entrega: "pedido",
    detalle: "Armá tu set personalizado con la línea de bolsos y carteras Wrangler. Ideal para regalo.",
    nuevo: true,
  },
  {
    id: "cartera-wrangler",
    nombre: "Cartera de mano",
    marca: "Wrangler",
    categoria: "bolsos",
    para: "Dama",
    foto: "/productos/cartera-wrangler.jpg",
    precio: 21900,
    reserva: 10950,
    entrega: "pedido",
    detalle: "Cartera de cuero repujado con llavero. Pedila en tu color favorito.",
    opciones: { label: "Color", valores: ["Café", "Negro", "Beige", "Rosado"] },
  },
  {
    id: "jeans-wrangler",
    nombre: "Jeans Five Star · Regular Fit",
    marca: "Wrangler",
    categoria: "ropa",
    para: "Caballero",
    foto: "/productos/wrangler-clasico.jpg",
    precio: 22000,
    reserva: 11000,
    entrega: "pedido",
    detalle: "El clásico vaquero, auténtico y atemporal. 10 días en llegar.",
    tallas: ["28", "30", "32", "34", "36", "38", "40"],
  },
  {
    id: "camisas-tommy",
    nombre: "Camisas a cuadros",
    marca: "Tommy Hilfiger",
    categoria: "ropa",
    para: "Caballero",
    foto: "/productos/cinch-tommy.jpg",
    precio: null,
    entrega: "pedido",
    detalle: "Camisas de todos los estilos, 100 % originales. También pantalones Cinch.",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "gorras-ariat",
    nombre: "Gorras trucker",
    marca: "Ariat",
    categoria: "gorras",
    para: "Unisex",
    foto: "/productos/gorras-ariat.jpg",
    precio: 19900,
    desde: true,
    entrega: "pedido",
    detalle: "Toda la línea de gorras Ariat bajo pedido. Entrega en Guanacaste, envíos a todo el país.",
  },
];

export const pasos = [
  { n: "01", titulo: "Escogé", desc: "Elegí tu producto, talla y color en el catálogo." },
  { n: "02", titulo: "Escribinos", desc: "Tu pedido nos llega por WhatsApp con todos los datos." },
  { n: "03", titulo: "Apartá con la mitad", desc: "Pagás el 50 % y tenés 30 días para cancelar." },
  { n: "04", titulo: "Recibí", desc: "Pedidos en 10 días. Entregas en Guanacaste y envíos a todo CR." },
];

export const marcas = ["Ariat", "Wrangler", "Cinch", "Levi's", "Tommy Hilfiger"];

export function colones(n: number) {
  return "₡" + n.toLocaleString("es-CR").replace(/\s/g, ".");
}

// Arma el enlace de WhatsApp con el mensaje ya escrito
export function enlaceWhatsApp(texto: string) {
  return `https://wa.me/${contacto.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}
