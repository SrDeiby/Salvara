import Image from "next/image";
import { contacto } from "@/data/catalogo";
import { ShieldIcon, TruckIcon, ClockIcon } from "./icons";
import Note from "./Note";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid rel">
        <div className="hero-txt">
          <span className="eyebrow">Tienda virtual · {contacto.ubicacion}</span>
          <h1>
            Selección vaquera <em>con carácter.</em>
          </h1>
          <p>
            Botas Ariat, bolsos Wrangler y ropa western 100 % originales. Apartá con la mitad y recibí en cualquier
            rincón de Costa Rica.
          </p>
          <div className="ctas">
            <a href="#catalogo" className="btn btn-rose">Ver catálogo →</a>
            <a href="#como-comprar" className="btn btn-ghost">Cómo comprar</a>
          </div>
          <ul className="hero-trust">
            <li><ShieldIcon /> Marcas originales</li>
            <li><ClockIcon /> Apartado 30 días</li>
            <li><TruckIcon /> Envíos a todo el país</li>
          </ul>
        </div>
        <div className="hero-pics">
          <div className="p1"><Image src="/productos/campo-caballos.jpg" alt="Caballos en el campo" fill priority sizes="(max-width:900px) 60vw, 360px" /></div>
          <div className="p2"><Image src="/productos/ariat-circuit.jpg" alt="Botas Ariat Circuit con cactus bordados" fill priority sizes="(max-width:900px) 40vw, 260px" /></div>
          <div className="p3"><Image src="/productos/set-wrangler.jpg" alt="Set de bolso y cartera Wrangler" fill sizes="(max-width:900px) 40vw, 260px" /></div>
          <div className="stamp"><span>Desde Guanacaste</span><b>SVA</b><span>para todo CR</span></div>
        </div>
        <Note n={1} style={{ top: -50, right: 24 }}>
          Botón <b>“Mi pedido”</b>: el cliente arma un pedido con varios productos y lo envía completo por WhatsApp en un solo mensaje.
        </Note>
        <Note n={2} style={{ top: 10, left: "38%" }}>
          Portada con su frase de marca y sus propias fotos. Una sola acción principal: <b>ir al catálogo</b>.
        </Note>
      </div>
    </section>
  );
}
