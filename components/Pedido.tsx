"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { colones, enlaceWhatsApp, type Producto } from "@/data/catalogo";
import { CloseIcon, WhatsAppIcon } from "./icons";

export type Linea = { key: string; producto: Producto; talla?: string; opcion?: string; cantidad: number };

type Ctx = {
  lineas: Linea[];
  agregar: (l: Omit<Linea, "key">) => void;
  quitar: (key: string) => void;
  cambiar: (key: string, delta: number) => void;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
};

const PedidoCtx = createContext<Ctx | null>(null);

export function usePedido() {
  const c = useContext(PedidoCtx);
  if (!c) throw new Error("usePedido fuera de PedidoProvider");
  return c;
}

function precioTexto(p: Producto) {
  if (p.precio === null) return "Consultar precio";
  return (p.desde ? "desde " : "") + colones(p.precio);
}

function lineaTexto(l: Linea) {
  const extras = [l.talla && `Talla ${l.talla}`, l.opcion && `${l.producto.opciones?.label} ${l.opcion}`]
    .filter(Boolean)
    .join(" · ");
  const entrega = l.producto.entrega === "inmediata" ? "Entrega inmediata" : "Bajo pedido";
  return `• ${l.cantidad} × ${l.producto.marca} ${l.producto.nombre}${extras ? ` (${extras})` : ""}\n   ${precioTexto(l.producto)} · ${entrega}`;
}

export function mensajeProducto(l: Omit<Linea, "key">) {
  return `¡Hola Salvara! 🤠 Me interesa este producto:\n\n${lineaTexto({ ...l, key: "" })}\n\n¿Está disponible?`;
}

function mensajePedido(lineas: Linea[], nombre: string, entrega: string, lugar: string) {
  const total = lineas.reduce((s, l) => s + (l.producto.precio ?? 0) * l.cantidad, 0);
  const consultar = lineas.some((l) => l.producto.precio === null);
  return [
    "¡Hola Salvara! 🤠 Quiero hacer este pedido:",
    "",
    ...lineas.map(lineaTexto),
    "",
    `Total estimado: ${colones(total)}${consultar ? " + productos por consultar" : ""}`,
    `Para apartar (50 %): ${colones(Math.round(total / 2))}`,
    "",
    ...(nombre ? [`Nombre: ${nombre}`] : []),
    `Entrega: ${entrega}${lugar ? ` · ${lugar}` : ""}`,
  ].join("\n");
}

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [abierto, setAbierto] = useState(false);

  const agregar: Ctx["agregar"] = (l) => {
    const key = [l.producto.id, l.talla, l.opcion].join("|");
    setLineas((prev) =>
      prev.some((x) => x.key === key)
        ? prev.map((x) => (x.key === key ? { ...x, cantidad: x.cantidad + l.cantidad } : x))
        : [...prev, { ...l, key }],
    );
  };
  const quitar = (key: string) => setLineas((prev) => prev.filter((x) => x.key !== key));
  const cambiar = (key: string, delta: number) =>
    setLineas((prev) => prev.map((x) => (x.key === key ? { ...x, cantidad: Math.max(1, x.cantidad + delta) } : x)));

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
  }, [abierto]);

  return (
    <PedidoCtx.Provider value={{ lineas, agregar, quitar, cambiar, abierto, setAbierto }}>
      {children}
      <PedidoDrawer />
    </PedidoCtx.Provider>
  );
}

function PedidoDrawer() {
  const { lineas, quitar, cambiar, abierto, setAbierto } = usePedido();
  const [nombre, setNombre] = useState("");
  const [entrega, setEntrega] = useState("Envío por Correos de CR");
  const [lugar, setLugar] = useState("");
  const total = lineas.reduce((s, l) => s + (l.producto.precio ?? 0) * l.cantidad, 0);

  return (
    <div className={`drawer-wrap${abierto ? " open" : ""}`} aria-hidden={!abierto}>
      <div className="drawer-bg" onClick={() => setAbierto(false)} />
      <aside className="drawer" role="dialog" aria-label="Tu pedido">
        <div className="drawer-head">
          <h3>Tu pedido</h3>
          <button className="x" onClick={() => setAbierto(false)} aria-label="Cerrar"><CloseIcon /></button>
        </div>

        {lineas.length === 0 ? (
          <div className="drawer-empty">
            <p>Todavía no has agregado productos.</p>
            <button className="btn btn-dark" onClick={() => setAbierto(false)}>Ver catálogo</button>
          </div>
        ) : (
          <>
            <ul className="lineas">
              {lineas.map((l) => (
                <li key={l.key}>
                  <div className="th"><Image src={l.producto.foto} alt="" fill sizes="72px" /></div>
                  <div className="info">
                    <small>{l.producto.marca}</small>
                    <b>{l.producto.nombre}</b>
                    <span className="meta">
                      {[l.talla && `Talla ${l.talla}`, l.opcion].filter(Boolean).join(" · ") ||
                        (l.producto.entrega === "inmediata" ? "Entrega inmediata" : "Bajo pedido")}
                    </span>
                    <div className="qty">
                      <button onClick={() => cambiar(l.key, -1)} aria-label="Menos">−</button>
                      <span>{l.cantidad}</span>
                      <button onClick={() => cambiar(l.key, 1)} aria-label="Más">+</button>
                    </div>
                  </div>
                  <div className="right">
                    <b>{l.producto.precio === null ? "Consultar" : colones(l.producto.precio * l.cantidad)}</b>
                    <button className="rm" onClick={() => quitar(l.key)}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer-form">
              <label>
                Tu nombre
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. María Rodríguez" />
              </label>
              <label>
                Entrega
                <select value={entrega} onChange={(e) => setEntrega(e.target.value)}>
                  <option>Envío por Correos de CR</option>
                  <option>Entrega en Guanacaste</option>
                  <option>Retiro en Cañas</option>
                </select>
              </label>
              <label>
                Provincia / cantón
                <input value={lugar} onChange={(e) => setLugar(e.target.value)} placeholder="Ej. Liberia, Guanacaste" />
              </label>
            </div>

            <div className="drawer-foot">
              <div className="tot"><span>Total estimado</span><b>{colones(total)}</b></div>
              <div className="tot sub"><span>Apartás con el 50 %</span><b>{colones(Math.round(total / 2))}</b></div>
              <a
                className="btn btn-wa"
                href={enlaceWhatsApp(mensajePedido(lineas, nombre, entrega, lugar))}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon /> Enviar pedido por WhatsApp
              </a>
              <p className="fine">Te confirmamos disponibilidad y forma de pago (SINPE Móvil o transferencia) por WhatsApp.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
