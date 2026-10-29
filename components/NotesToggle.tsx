"use client";

import { useEffect, useState } from "react";

// Muestra u oculta las notas amarillas de la propuesta (para presentarla a los dueños)
export default function NotesToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("notes", on);
  }, [on]);
  return (
    <button className="toggle-notes" onClick={() => setOn((v) => !v)} aria-pressed={on}>
      ✎ Notas de la propuesta
    </button>
  );
}
