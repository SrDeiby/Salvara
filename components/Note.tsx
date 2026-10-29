import type { CSSProperties, ReactNode } from "react";

// Nota amarilla de la propuesta. Solo se ve cuando el botón "Notas de la propuesta" está activo.
export default function Note({ n, style, children }: { n: number; style: CSSProperties; children: ReactNode }) {
  return (
    <div className="note" data-n={n} style={style}>
      {children}
    </div>
  );
}
