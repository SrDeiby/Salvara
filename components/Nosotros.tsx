import Image from "next/image";
import { contacto, marcas } from "@/data/catalogo";
import { PinIcon } from "./icons";

export default function Nosotros() {
  return (
    <section id="nosotros" className="nosotros">
      <div className="wrap nos-grid">
        <div className="nos-pic">
          <Image src="/productos/ariat-entrega-inmediata.jpg" alt="Botas Ariat sobre paja frente al rótulo de Salvara" fill sizes="(max-width:900px) 100vw, 50vw" />
        </div>
        <div className="nos-txt">
          <span className="eyebrow">Nosotros</span>
          <h2>Una pareja enamorada <em>del campo.</em></h2>
          <p>
            Detrás de Salvara hay una pareja que ama los animales, el campo y el estilo de vida vaquero. Desde{" "}
            {contacto.ubicacion} buscamos las piezas que nos gustaría usar a nosotros y las traemos para todo Costa Rica.
          </p>
          <p className="ubic"><PinIcon /> {contacto.ubicacion} · Entregas en Guanacaste y envíos a todo el país</p>
          <div className="marcas">
            {marcas.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
