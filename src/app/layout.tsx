import type { Metadata, Viewport } from "next";
import { Baloo_2, Bangers, Nunito } from "next/font/google";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const comic = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-comic",
});

const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Baby Shower — Te Hice Esto",
  description:
    "Invitación interactiva de Baby Shower temática Baby Goku. ¡Una nueva aventura está por comenzar!",
};

export const viewport: Viewport = {
  themeColor: "#7dd3fc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${comic.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
