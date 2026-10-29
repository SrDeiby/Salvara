"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categorias, colones, enlaceWhatsApp, productos, type Categoria, type Producto } from "@/data/catalogo";
import { mensajeProducto, usePedido } from "./Pedido";
import { CloseIcon, SearchIcon, WhatsAppIcon } from "./icons";
import Note from "./Note";

type Entrega = "todas" | "inmediata" | "pedido";

function Precio({ p }: { p: Producto }) {
  if (p.precio === null) return <span className="precio consultar">Consultar precio</span>;
  return (
    <span className="precio">
      {p.desde && <small>desde </small>}
      {colones(p.precio)}
    </span>
  );
}

export default function Catalogo() {
  const [cat, setCat] = useState<Categoria | "todo">("todo");
  const [entrega, setEntrega] = useState<Entrega>("todas");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Producto | null>(null);
  const cerrar = useCallback(() => setSel(null), []);

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return productos.filter(
      (p) =>
        (cat === "todo" || p.categoria === cat) &&
        (entrega === "todas" || p.entrega === entrega) &&
        (!t || `${p.marca} ${p.nombre} ${p.para}`.toLowerCase().includes(t)),
    );
  }, [cat, entrega, q]);

  return (
    <section id="catalogo" className="catalogo">
      <div className="wrap rel">
        <div className="head">
          <div>
            <span className="eyebrow">El catálogo</span>
            <h2>Escogé lo tuyo, <em>pedilo por WhatsApp.</em></h2>
          </div>
          <p>Botas, bolsos y ropa western de marcas originales. Tocá un producto para ver tallas y pedirlo.</p>
        </div>

        <div className="filtros">
          <div className="chips" role="tablist">
            {categorias.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                className={cat === c.id ? "on" : ""}
                onClick={() => setCat(c.id)}
              >
                {c.label}
                <span>{c.id === "todo" ? productos.length : productos.filter((p) => p.categoria === c.id).length}</span>
              </button>
            ))}
          </div>
          <div className="filtros-der">
            <select value={entrega} onChange={(e) => setEntrega(e.target.value as Entrega)} aria-label="Disponibilidad">
              <option value="todas">Toda disponibilidad</option>
              <option value="inmediata">Entrega inmediata</option>
              <option value="pedido">Bajo pedido</option>
            </select>
            <label className="buscar">
              <SearchIcon />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar" aria-label="Buscar" />
            </label>
          </div>
        </div>

        <div className="grid">
          {lista.map((p) => (
            <button key={p.id} className="card" onClick={() => setSel(p)}>
              <div className="pic">
                <Image src={p.foto} alt={`${p.marca} ${p.nombre}`} fill sizes="(max-width:700px) 50vw, 25vw" />
                <span className={`tag ${p.entrega}`}>{p.entrega === "inmediata" ? "Entrega inmediata" : "Bajo pedido"}</span>
                {p.nuevo && <span className="tag nuevo">Nuevo</span>}
              </div>
              <div className="body">
                <small>{p.marca} · {p.para}</small>
                <h3>{p.nombre}</h3>
                <Precio p={p} />
                {p.reserva && <span className="reserva">Apartá con {colones(p.reserva)}</span>}
              </div>
            </button>
          ))}
          {lista.length === 0 && (
            <p className="vacio">No encontramos productos con esos filtros. Escribinos y te lo conseguimos.</p>
          )}
        </div>

        <Note n={3} style={{ top: 70, right: 0 }}>
          Catálogo con <b>filtros por tipo y disponibilidad</b> (entrega inmediata o bajo pedido). Cada producto muestra
          precio y el monto para apartar.
        </Note>
      </div>
      {sel && <Detalle p={sel} onClose={cerrar} />}
    </section>
  );
}

function Detalle({ p, onClose }: { p: Producto; onClose: () => void }) {
  const { agregar, setAbierto } = usePedido();
  const [talla, setTalla] = useState(p.tallas?.length === 1 ? p.tallas[0] : "");
  const [opcion, setOpcion] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const falta = (p.tallas && !talla) || (p.opciones && !opcion);
  const linea = { producto: p, talla: talla || undefined, opcion: opcion || undefined, cantidad };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal" role="dialog" aria-label={p.nombre} onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Cerrar"><CloseIcon /></button>
        <div className="modal-pic">
          <Image src={p.foto} alt={`${p.marca} ${p.nombre}`} fill sizes="(max-width:800px) 100vw, 420px" />
        </div>
        <div className="modal-txt rel">
          <small className="eyebrow">{p.marca} · {p.para}</small>
          <h3>{p.nombre}</h3>
          <div className="precios">
            <Precio p={p} />
            {p.reserva && <span className="reserva">Apartá con {colones(p.reserva)}</span>}
          </div>
          <p className="det">{p.detalle}</p>
          <ul className="condiciones">
            <li>{p.entrega === "inmediata" ? "✦ Entrega inmediata" : "✦ Bajo pedido · llega en 10 días"}</li>
            <li>✦ Apartado: 30 días para cancelar</li>
            <li>✦ Envíos a todo Costa Rica</li>
          </ul>

          {p.tallas && (
            <div className="opt">
              <span>Talla {p.categoria === "botas" && p.tallas.length > 1 && <em>(US)</em>}</span>
              <div className="pills">
                {p.tallas.map((t) => (
                  <button key={t} className={talla === t ? "on" : ""} onClick={() => setTalla(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}
          {p.opciones && (
            <div className="opt">
              <span>{p.opciones.label}</span>
              <div className="pills">
                {p.opciones.valores.map((v) => (
                  <button key={v} className={opcion === v ? "on" : ""} onClick={() => setOpcion(v)}>{v}</button>
                ))}
              </div>
            </div>
          )}
          <div className="opt">
            <span>Cantidad</span>
            <div className="qty">
              <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Menos">−</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad((c) => c + 1)} aria-label="Más">+</button>
            </div>
          </div>

          <div className="acciones">
            <a
              className={`btn btn-wa${falta ? " off" : ""}`}
              href={falta ? undefined : enlaceWhatsApp(mensajeProducto(linea))}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!!falta}
            >
              <WhatsAppIcon /> Pedir por WhatsApp
            </a>
            <button
              className="btn btn-line"
              disabled={!!falta}
              onClick={() => {
                agregar(linea);
                onClose();
                setAbierto(true);
              }}
            >
              Agregar al pedido
            </button>
          </div>
          {falta && <p className="fine">Escogé {p.tallas && !talla ? "tu talla" : p.opciones?.label.toLowerCase()} para continuar.</p>}

          <Note n={4} style={{ bottom: -10, right: -20 }}>
            El botón abre WhatsApp con un <b>mensaje ya escrito</b>: producto, talla, color, precio y disponibilidad.
          </Note>
        </div>
      </div>
    </div>
  );
}
