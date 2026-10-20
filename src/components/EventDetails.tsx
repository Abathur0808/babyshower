"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { eventConfig, eventDate } from "@/config/event";
import DragonBall from "@/components/art/DragonBall";

const PENDING = "Por confirmar";

function Row({
  icon,
  label,
  value,
  pending,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  pending?: boolean;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="icono-esfera mt-0.5">
        {icon}
      </span>
      <div className="text-left">
        <p className="etiqueta">
          {label}
        </p>
        <p
          className={`valor mt-0.5 ${
            pending ? "italic text-slate-400" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </li>
  );
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function formatTime(d: Date): string {
  return new Intl.DateTimeFormat("es", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

/** Sección con los datos del evento: primero un sobre, al click se revela la tarjeta. */
export default function EventDetails() {
  const date = eventDate();
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpia el temporizador si el componente se desmonta a medio animar
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const open = () => {
    if (opened) return;
    setOpened(true);
    // Espera a que la solapa gire y la carta salga antes de mostrar la tarjeta
    timer.current = setTimeout(() => setRevealed(true), 750);
  };
  const datePending = !eventConfig.displayDate && !date;
  const timePending = !eventConfig.displayTime && !date;
  const placePending = !eventConfig.venueName && !eventConfig.address;

  const displayDate =
    eventConfig.displayDate || (date ? formatDate(date) : PENDING);
  const displayTime =
    eventConfig.displayTime || (date ? `${formatTime(date)} h` : PENDING);
  const place =
    [eventConfig.venueName, eventConfig.address].filter(Boolean).join(" — ") ||
    PENDING;

  return (
    <section
      id="detalles"
      className="relative mx-auto max-w-xl scroll-mt-8 px-6 py-10"
      aria-label="Detalles del Baby Shower"
    >
      {!revealed ? (
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={open}
            aria-expanded={opened}
            aria-label="Abrir la invitación"
            className={`envelope ${opened ? "opened" : ""}`}
          >
            <span className="envelope-body" aria-hidden="true" />
            <span className="envelope-letter" aria-hidden="true" />
            <span className="envelope-flap" aria-hidden="true" />
            <span className="envelope-seal" aria-hidden="true">
              <DragonBall stars={4} className="w-11 animate-glowpulse" />
            </span>
          </button>
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-sky-700">
            Toca para abrir tu invitación
          </p>
        </div>
      ) : (
      <div className="card-anime animate-bouncein px-7 py-10 sm:px-10">
        <div
          className="animate-floaty -mt-24 flex justify-center"
          style={{ animationDuration: "4s" }}
        >
          <Image
            src="/images/gokusobre.png"
            alt="Baby Goku celebrando"
            width={1169}
            height={1420}
            className="animate-bouncein w-24 drop-shadow-lg sm:w-36"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
        <h3 className="titulo-baby text-center text-4xl sm:text-6xl">
          Baby Shower
        </h3>
        {eventConfig.parents && (
          <p className="mt-2 text-center font-display text-xl font-bold text-sky-800">
            de {eventConfig.parents}
          </p>
        )}
        {eventConfig.personalMessage && (
          <p className="mx-auto mt-4 max-w-sm text-center text-sky-800">
            {eventConfig.personalMessage}
          </p>
        )}

        <ul className="mt-8 space-y-5">
          <Row
            label="Fecha"
            value={displayDate}
            pending={datePending}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
            }
          />
          <Row
            label="Hora"
            value={displayTime}
            pending={timePending}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            }
          />
          <Row
            label="Lugar"
            value={place}
            pending={placePending}
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            }
          />
          {eventConfig.rsvpDeadline && (
            <Row
              label="Confirmar antes del"
              value={eventConfig.rsvpDeadline}
              icon={
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              }
            />
          )}
        </ul>
      </div>
      )}
    </section>
  );
}
