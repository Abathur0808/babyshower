"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import DragonBall from "@/components/art/DragonBall";
import { eventConfig } from "@/config/event";

// Guerreros bebé que celebran cuando se abre la sugerencia:
// posición, tamaño, retardo de entrada y ritmo de flote propios.
const BABY_WARRIORS = [
  {
    src: "/images/gohanbaby.png",
    alt: "Bebé Pan celebrando",
    cls: "animate-hop left-[2%] top-[6%] w-20 sm:left-[4%] sm:top-[16%] sm:w-32",
    delay: "0.1s",
    dur: "2.8s",
  },
  {
    src: "/images/ssj2.png",
    alt: "Goku bebé gateando",
    cls: "animate-drift right-[3%] -bottom-7 w-28 sm:right-[28%] sm:bottom-[6%] sm:w-44",
    delay: "0.25s",
    dur: "5.2s",
  },
  {
    src: "/images/ssj3.png",
    alt: "Goku bebé guerrero",
    cls: "animate-drift left-[2%] -bottom-6 w-20 sm:left-[10%] sm:bottom-[3%] sm:w-28",
    delay: "0.4s",
    dur: "4.2s",
  },
  {
    src: "/images/ssj4.png",
    alt: "Goku bebé abrazando la esfera",
    cls: "animate-hop right-[2%] top-[1%] w-24 sm:right-[4%] sm:top-[8%] sm:w-40",
    delay: "0.55s",
    dur: "3.1s",
  },
];

const CONFETTI_COLORS = ["#facc2e", "#f0712a", "#ffae42", "#0ea5e9", "#ffffff"];

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M5 12v9h14v-9" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

/** Página dedicada a la sugerencia de regalo. */
export default function GiftSection() {
  const gift = eventConfig.giftUrl.trim() ? eventConfig.giftUrl : null;
  const [showGift, setShowGift] = useState(false);
  const [confetti, setConfetti] = useState<CSSProperties[]>([]);

  // Lluvia de confeti al abrir la sugerencia: ~36 piezas con
  // posición, color, tamaño, deriva y velocidad aleatorias.
  const burst = () => {
    const pieces: CSSProperties[] = Array.from({ length: 36 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${-5 - Math.random() * 10}%`,
      width: `${6 + Math.random() * 8}px`,
      height: `${8 + Math.random() * 10}px`,
      backgroundColor:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      animationDuration: `${2 + Math.random() * 2}s`,
      animationDelay: `${Math.random() * 0.5}s`,
      ["--sway" as string]: `${(Math.random() - 0.5) * 180}px`,
    }));
    setConfetti((prev) => [...prev, ...pieces]);
    window.setTimeout(() => {
      setConfetti((prev) => prev.slice(pieces.length));
    }, 4500);
  };

  return (
    <section
      className="relative flex flex-col items-center gap-4 overflow-hidden px-6 py-10 text-center"
      aria-label="Sugerencia de regalo"
    >
      {/* Esferas decorativas */}
      <DragonBall stars={4} className="orb-float absolute left-[8%] top-[16%] w-8 animate-glowpulse sm:w-12" />
      <DragonBall stars={2} className="orb-float absolute right-[10%] top-[30%] w-10 animate-glowpulse sm:w-14" />
      <DragonBall stars={6} className="orb-float absolute bottom-[16%] left-[14%] hidden w-10 animate-glowpulse sm:block" />

      {/* Contenido por encima de los guerreros decorativos */}
      <div className="relative z-10 flex flex-col items-center gap-4">
      <h3 className="titulo-baby text-4xl sm:text-5xl">
        Sugerencia de regalo
      </h3>
      <p className="max-w-md font-display font-bold text-sky-800">
        Tu presencia es el mejor regalo, pero si quieres sumar un detalle para el pequeño guerrero, aquí tienes una idea.
      </p>

      {gift ? (
        <a
          href={gift}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-regalo w-full max-w-sm"
        >
          <GiftIcon />
          Sugerencia de Regalo
        </a>
      ) : (
        <div className="flex w-full max-w-sm flex-col items-center">
          <button
            type="button"
            onClick={() => {
              setShowGift((v) => {
                const next = !v;
                if (next) burst();
                return next;
              });
            }}
            aria-expanded={showGift}
            className="btn-regalo w-full"
          >
            <GiftIcon />
            Sugerencia de Regalo
          </button>
          <div
            className={`glass-card mt-3 w-full overflow-hidden px-5 text-center transition-all duration-300 ease-out ${
              showGift ? "card-pop max-h-52 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
            }`}
          >
            <DragonBall stars={1} className="mx-auto mb-1 w-8 animate-glowpulse" />
            <p className="font-display text-base font-bold leading-relaxed text-amber-700">
              {eventConfig.giftSuggestions}
            </p>
          </div>
        </div>
      )}
      </div>

      {/* Guerreros bebé que saltan a celebrar la sugerencia */}
      {showGift &&
        BABY_WARRIORS.map((w) => (
          <div
            key={w.src}
            className={`pointer-events-none absolute ${w.cls}`}
            style={{ animationDuration: w.dur }}
          >
            <Image
              src={w.src}
              alt={w.alt}
              width={800}
              height={800}
              sizes="(max-width: 640px) 112px, 176px"
              className="animate-bouncein h-auto w-full drop-shadow-lg"
              style={{ animationDelay: w.delay }}
            />
          </div>
        ))}

      {/* Capa de confeti (no intercepta clicks) */}
      {confetti.length > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
          {confetti.map((style, i) => (
            <span
              key={i}
              className="animate-[confetti-fall_linear_forwards] absolute"
              style={style}
            />
          ))}
        </div>
      )}
    </section>
  );
}
