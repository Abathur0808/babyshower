"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "@/config/event";

/**
 * Control de audio flotante.
 * - Solo renderiza controles funcionales si eventConfig.audioSrc tiene una pista.
 * - Reproduce únicamente tras gesto del usuario (botón abrir o este control).
 */
export default function AudioControl({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const configured = Boolean(eventConfig.audioSrc);

  // Sincroniza el estado del botón con lo que REALMENTE hace el <audio>:
  // si la música arrancó por autoplay o por el tap de entrada, los
  // eventos play/pause/ended/volumechange actualizan la interfaz.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const sync = () => {
      setPlaying(!el.paused && !el.ended);
      setMuted(el.muted);
    };

    sync();
    el.addEventListener("play", sync);
    el.addEventListener("pause", sync);
    el.addEventListener("ended", sync);
    el.addEventListener("volumechange", sync);
    return () => {
      el.removeEventListener("play", sync);
      el.removeEventListener("pause", sync);
      el.removeEventListener("ended", sync);
      el.removeEventListener("volumechange", sync);
    };
  }, [audioRef, configured]);

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el || !configured) return;
    try {
      if (el.paused) {
        await el.play();
      } else {
        el.pause();
      }
      // El estado se sincroniza solo vía los event listeners.
    } catch {
      /* Autoplay bloqueado u otro error: el estado queda consistente */
    }
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    // volumechange sincroniza el estado
  };

  const baseBtn =
    "flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60";

  if (!configured) {
    return (
      <div
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/80 text-slate-400"
        title="Música: configuración pendiente (falta archivo de audio)"
        role="img"
        aria-label="Música no disponible todavía"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex gap-2">
      <button
        type="button"
        onClick={togglePlay}
        className={`${baseBtn} bg-white/90 text-gold-600 hover:scale-105`}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        )}
      </button>
      <button
        type="button"
        onClick={toggleMute}
        className={`${baseBtn} bg-white/90 text-sky-700 hover:scale-105`}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        )}
      </button>
    </div>
  );
}
