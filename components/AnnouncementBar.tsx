import { anuncios } from "@/data/catalogo";

export default function AnnouncementBar() {
  const items = [...anuncios, ...anuncios];
  return (
    <div className="announce" aria-label="Avisos">
      <div className="track">
        {items.map((a, i) => (
          <span key={i}>{a}</span>
        ))}
      </div>
    </div>
  );
}
