"use client";

import { useState } from "react";
import Image from "next/image";
import { eventConfig, mapsUrl, whatsappUrl } from "@/config/event";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.4-.5c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.9a12.4 12.4 0 0 0 4.9 4.6c1.8.8 2.5.9 3.4.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

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

/** Botones de acción: RSVP por WhatsApp, ubicación en Maps y sugerencia de regalo. */
export default function ActionsSection() {
  const wa = whatsappUrl();
  const maps = mapsUrl();
  const gift = eventConfig.giftUrl.trim() ? eventConfig.giftUrl : null;
  const [showGift, setShowGift] = useState(false);

  return (
    <section
      className="relative flex flex-col items-center gap-4 px-6 py-10"
      aria-label="Confirmación, ubicación y regalos"
    >
      {/* Goku en su nube (frame estático del GIF, fondo transparente);
          se recorta el espacio vacío superior con overflow-hidden */}
      <div
        className="animate-floaty relative h-44 w-56 overflow-hidden sm:h-52 sm:w-64"
        style={{ animationDuration: "4s" }}
      >
        <Image
          src="/images/gokugif.png"
          alt="Goku bebé durmiendo sobre su nube voladora"
          width={400}
          height={600}
          className="absolute bottom-0 left-0 h-auto w-full"
        />
      </div>
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-goku w-full max-w-sm"
        >
          <WhatsAppIcon />
          Confirmar Asistencia
        </a>
      ) : (
        <div className="flex w-full max-w-sm flex-col items-center gap-1">
          <span className="btn-disabled w-full" aria-disabled="true">
            <WhatsAppIcon />
            Confirmar Asistencia
          </span>
          <p className="text-xs text-sky-700">
            Configuración pendiente: falta el número de WhatsApp.
          </p>
        </div>
      )}

      {maps ? (
        <a
          href={maps}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-goku w-full max-w-sm"
        >
          <MapPinIcon />
          Ver Ubicación
        </a>
      ) : (
        <div className="flex w-full max-w-sm flex-col items-center gap-1">
          <span className="btn-disabled w-full" aria-disabled="true">
            <MapPinIcon />
            Ver Ubicación
          </span>
          <p className="text-xs text-sky-700">
            Configuración pendiente: falta la dirección del evento.
          </p>
        </div>
      )}

      {gift ? (
        <a
          href={gift}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sky w-full max-w-sm"
        >
          <GiftIcon />
          Sugerencia de Regalo
        </a>
      ) : (
        <div className="flex w-full max-w-sm flex-col items-center">
          <button
            type="button"
            onClick={() => setShowGift((v) => !v)}
            aria-expanded={showGift}
            className="btn-sky w-full"
          >
            <GiftIcon />
            Sugerencia de Regalo
          </button>
          <div
            className={`glass-card mt-3 w-full overflow-hidden px-5 text-center transition-all duration-300 ease-out ${
              showGift ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
            }`}
          >
            <p className="text-sm leading-relaxed text-sky-800">
              {eventConfig.giftSuggestions}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
