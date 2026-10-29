import { WhatsAppIcon } from "./icons";
import { enlaceWhatsApp } from "@/data/catalogo";

export default function WhatsAppButton() {
  return (
    <a href={enlaceWhatsApp("¡Hola Salvara! 🤠 Tengo una consulta.")} className="wa" aria-label="Escribir por WhatsApp" target="_blank" rel="noreferrer">
      <WhatsAppIcon />
    </a>
  );
}
