"use client";

import { useEffect, useRef, useState } from "react";
import SkyBackground from "@/components/SkyBackground";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import CountdownSection from "@/components/CountdownSection";
import ActionsSection from "@/components/ActionsSection";
import ClosingSection from "@/components/ClosingSection";
import ShenLong from "@/components/ShenLong";
import Garland from "@/components/Garland";
import AudioControl from "@/components/AudioControl";
import { eventConfig } from "@/config/event";

/**
 * Composición principal de la invitación.
 * Gestiona la apertura y el elemento <audio> compartido.
 */
export default function Invitation() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bookRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const TOTAL_PAGES = 5;

  // Libro horizontal navegado SOLO con botones: el contenedor no
  // permite scroll (overflow-x-hidden), los saltos son programáticos.
  const jump = (dir: number) => {
    const el = bookRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  // Sigue la página actual (para mostrar/ocultar flechas) y
  // permite navegar también con flechas del teclado.
  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;

    const onScroll = () =>
      setPage(
        Math.max(
          0,
          Math.min(TOTAL_PAGES - 1, Math.round(el.scrollLeft / el.clientWidth))
        )
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        jump(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        jump(-1);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // La música arranca al terminar la pantalla de carga; si el navegador
  // bloquea el autoplay, se dispara con el primer gesto del usuario.
  useEffect(() => {
    const el = audioRef.current;
    if (!loaded || !el || !eventConfig.audioSrc) return;

    const start = () => {
      el.play().catch(() => {});
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };

    el.play().catch(() => {
      window.addEventListener("pointerdown", start, { once: true });
      window.addEventListener("keydown", start, { once: true });
    });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [loaded]);

  return (
    <>
      <SkyBackground />

      {eventConfig.audioSrc && (
        <audio ref={audioRef} src={eventConfig.audioSrc} loop preload="auto" />
      )}

      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <div className="relative">
        {loaded && <Garland />}
        {loaded && <ShenLong />}

        <main
          ref={bookRef}
          className="scrollbar-hidden relative z-10 flex h-[100svh] snap-x snap-mandatory overflow-x-hidden overflow-y-hidden"
        >
          <div className="book-page flex h-full w-screen flex-none snap-start snap-always overflow-y-auto">
            <div className="m-auto w-full">
              <HeroSection />
            </div>
          </div>
          <div className="book-page flex h-full w-screen flex-none snap-start snap-always overflow-y-auto">
            <div className="m-auto w-full">
              <EventDetails />
            </div>
          </div>
          <div className="book-page flex h-full w-screen flex-none snap-start snap-always overflow-y-auto">
            <div className="m-auto w-full">
              <CountdownSection />
            </div>
          </div>
          <div className="book-page flex h-full w-screen flex-none snap-start snap-always overflow-y-auto">
            <div className="m-auto w-full">
              <ActionsSection />
            </div>
          </div>
          <div className="book-page flex h-full w-screen flex-none snap-start snap-always overflow-y-auto">
            <div className="m-auto w-full">
              <ClosingSection />
            </div>
          </div>
        </main>
      </div>

      {/* Botones de navegación del libro: aparecen solo cuando
          hay página en esa dirección */}
      {loaded && page > 0 && (
        <button
          type="button"
          onClick={() => jump(-1)}
          aria-label="Página anterior"
          className="btn-esfera fixed left-2 top-1/2 z-30 h-10 w-10 -translate-y-1/2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60 sm:left-4 sm:h-14 sm:w-14"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      )}
      {loaded && page < TOTAL_PAGES - 1 && (
        <button
          type="button"
          onClick={() => jump(1)}
          aria-label="Página siguiente"
          className="btn-esfera fixed right-2 top-1/2 z-30 h-10 w-10 -translate-y-1/2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60 sm:right-4 sm:h-14 sm:w-14"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}

      <AudioControl audioRef={audioRef} />
    </>
  );
}
