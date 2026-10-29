import { contacto, enlaceWhatsApp } from "@/data/catalogo";
import Logo from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <Logo />
          <p>Selección vaquera con carácter. Marcas originales garantizadas.</p>
        </div>
        <div className="foot-links">
          <a href={enlaceWhatsApp("¡Hola Salvara! 🤠")} target="_blank" rel="noreferrer"><WhatsAppIcon /> {contacto.telefono}</a>
          <a href={contacto.instagram} target="_blank" rel="noreferrer"><InstagramIcon /> @salvaracr</a>
        </div>
      </div>
      <div className="wrap legal">© 2026 Salvara · {contacto.ubicacion}</div>
    </footer>
  );
}
