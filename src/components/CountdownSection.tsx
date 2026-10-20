"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { eventDate } from "@/config/event";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function diff(now: number, target: number): Remaining {
  const total = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card card-pop flex w-20 flex-col items-center py-4 sm:w-28 sm:py-5">
      <span className="titulo-baby tabular-nums text-4xl leading-none sm:text-6xl">
        {value}
      </span>
      <span className="mt-1 font-display text-[0.65rem] font-bold uppercase tracking-widest text-sky-700 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

/** Cuenta regresiva hasta el inicio del evento. */
export default function CountdownSection() {
  const target = eventDate();
  // null hasta montar en cliente → evita errores de hidratación
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    if (!target) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
    // target deriva de la config estática; basta montar una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="relative px-6 py-10 text-center"
      aria-label="Cuenta regresiva del evento"
    >
      <h3 className="titulo-baby text-4xl sm:text-5xl">
        Cuenta regresiva
      </h3>
      <p className="mx-auto mt-3 max-w-md font-display font-bold text-sky-800">
        El pequeño guerrero llega pronto
      </p>

      <div
        className="animate-floaty mt-4 flex justify-center"
        style={{ animationDuration: "4.5s" }}
      >
        <Image
          src="/images/gokupanal.png"
          alt="Goku bebé en pañal tomando su mamadera"
          width={2573}
          height={1430}
          className="animate-bouncein w-60 drop-shadow-lg sm:w-80"
          style={{ animationDelay: "0.25s" }}
        />
      </div>

      <div className="mt-8 flex items-start justify-center gap-2 sm:gap-4">
        {!target ? (
          <div className="glass-card px-8 py-6">
            <p className="font-display text-lg font-bold text-sky-800">
              Fecha por confirmar
            </p>
            <p className="mt-1 text-sm text-sky-700">
              La cuenta regresiva se activará cuando se publique la fecha oficial.
            </p>
          </div>
        ) : now === null ? (
          // Placeholder estable durante SSR e hidratación
          <>
            <Unit value="--" label="Días" />
            <Unit value="--" label="Horas" />
            <Unit value="--" label="Min" />
            <Unit value="--" label="Seg" />
          </>
        ) : target.getTime() - now <= 0 ? (
          <div className="glass-card px-8 py-6">
            <p className="text-gold font-display text-2xl font-extrabold">
              ¡Ya estamos celebrando!
            </p>
            <p className="mt-1 text-sm text-sky-700">
              La nueva aventura ya comenzó.
            </p>
          </div>
        ) : (
          (() => {
            const r = diff(now, target.getTime());
            return (
              <>
                <Unit value={pad(r.days)} label="Días" />
                <Unit value={pad(r.hours)} label="Horas" />
                <Unit value={pad(r.minutes)} label="Min" />
                <Unit value={pad(r.seconds)} label="Seg" />
              </>
            );
          })()
        )}
      </div>
    </section>
  );
}
