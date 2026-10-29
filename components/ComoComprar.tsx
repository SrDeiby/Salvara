import { pasos } from "@/data/catalogo";
import Note from "./Note";

export default function ComoComprar() {
  return (
    <section id="como-comprar" className="pasos">
      <div className="wrap rel">
        <span className="eyebrow">Cómo comprar</span>
        <h2>Así de fácil, <em>sin salir de WhatsApp.</em></h2>
        <ol>
          {pasos.map((p) => (
            <li key={p.n}>
              <span className="n">{p.n}</span>
              <h3>{p.titulo}</h3>
              <p>{p.desc}</p>
            </li>
          ))}
        </ol>
        <Note n={5} style={{ top: 0, left: "56%" }}>
          Explica su <b>sistema de apartado</b> una sola vez, así no tienen que repetirlo en cada mensaje.
        </Note>
      </div>
    </section>
  );
}
