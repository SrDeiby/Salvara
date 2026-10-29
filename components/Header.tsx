"use client";

import Logo from "./Logo";
import { usePedido } from "./Pedido";
import { BagIcon } from "./icons";

export default function Header() {
  const { lineas, setAbierto } = usePedido();
  const n = lineas.reduce((s, l) => s + l.cantidad, 0);
  return (
    <header>
      <div className="wrap nav rel">
        <Logo />
        <nav className="menu">
          <a href="#catalogo">Catálogo</a>
          <a href="#como-comprar">Cómo comprar</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
        <button className="btn btn-dark btn-sm" onClick={() => setAbierto(true)}>
          <BagIcon />
          <span className="hide-sm">Mi pedido</span>
          {n > 0 && <span className="badge">{n}</span>}
        </button>
      </div>
    </header>
  );
}
