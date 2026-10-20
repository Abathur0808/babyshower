"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  onDone: () => void;
};

const DURATION_MS = 1800;
const TICK_MS = 40;

/**
 * Pantalla de carga inicial.
 * La barra de progreso es la nube voladora (nube.png) que se revela
 * de izquierda a derecha como si volara dejando su estela dorada.
 */
export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ready = progress >= 100;

  useEffect(() => {
    const step = 100 / (DURATION_MS / TICK_MS);
    const id = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + step));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  // Limpia el temporizador de salida si el componente se desmonta
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // Al 100% la pantalla espera un tap: ese gesto desbloquea el audio
  // del navegador y permite que la música arranque apenas termina la carga.
  const enter = () => {
    if (!ready || leaving) return;
    setLeaving(true);
    timer.current = setTimeout(onDone, 550);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #5ec8f2 0%, #8ed8f8 45%, #dff2fd 100%)",
      }}
      role={ready ? "button" : "status"}
      aria-live="polite"
      aria-label={ready ? "Toca para entrar a la invitación" : "Cargando la invitación"}
      tabIndex={ready ? 0 : -1}
      onClick={enter}
      onKeyDown={(e) => {
        if (ready && (e.key === "Enter" || e.key === " ")) enter();
      }}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      } ${ready ? "cursor-pointer" : ""}`}
    >
      <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-white/90 drop-shadow-sm sm:text-sm">
        Te Hice Esto
      </p>
      <h1 className="text-gold mt-4 max-w-md font-display text-3xl font-extrabold leading-snug sm:text-4xl">
        Preparando una aventura muy especial…
      </h1>

      {/* Barra de carga: la nube completa viaja hacia la izquierda
          dejando una estela dorada detrás */}
      <div
        className="relative mt-14 w-72 max-w-full sm:w-[26rem]"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de carga"
      >
        {/* Nube Kinto'un completa: entra desde la derecha y llega a la izquierda */}
        <Image
          src="/images/nube.png"
          alt="Nube voladora Kinto'un"
          width={1400}
          height={302}
          priority
          className="pointer-events-none absolute -top-3 w-40 max-w-none drop-shadow-md"
          style={{
            right: `max(-125px, calc(${progress}% - 160px))`,
          }}
        />

        {/* Pista + estela dorada (la barra crece hacia la izquierda) */}
        <div className="relative mt-10 h-3 overflow-hidden rounded-full bg-white/50 shadow-inner ring-1 ring-white/70 sm:h-3.5">
          <div
            className="absolute inset-y-0 right-0 rounded-full transition-[width] duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, rgba(255,224,138,0.25) 0%, #ffd979 30%, #f4c95d 70%, #e9b63b 100%)",
              boxShadow: "0 0 12px rgba(233,182,59,0.55)",
            }}
          />
        </div>
      </div>

      {ready ? (
        <p className="mt-6 animate-bouncein font-display text-xl font-extrabold uppercase tracking-[0.3em] text-gold-300 drop-shadow-md">
          ✦ Toca para entrar ✦
        </p>
      ) : (
        <p className="mt-4 font-display text-sm font-bold tabular-nums text-sky-800">
          {Math.round(progress)}%
        </p>
      )}

      <Image
        src="/images/cargando.png"
        alt="Baby Goku saludando junto al texto Cargando"
        width={1200}
        height={501}
        className="mt-6 w-72 max-w-full animate-[floaty_5s_ease-in-out_infinite,pulse_2.6s_ease-in-out_infinite] sm:w-96"
      />
    </div>
  );
}
