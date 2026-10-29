import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, DM_Serif_Display, Rye } from "next/font/google";
import "./globals.css";

const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const rye = Rye({ subsets: ["latin"], weight: "400", variable: "--font-rye" });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-barlow" });
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  title: "Salvara — Selección vaquera con carácter",
  description:
    "Botas Ariat, bolsos Wrangler y ropa western original. Pedidos por WhatsApp, apartado con la mitad y envíos a todo Costa Rica.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${rye.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
