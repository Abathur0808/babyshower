"use client";

import { useRef } from "react";
import Image from "next/image";
import NimbusCloud from "@/components/art/NimbusCloud";
import DragonBall from "@/components/art/DragonBall";

/** Cierre emotivo de la invitación. */
export default function ClosingSection() {
  const sfx = useRef<HTMLAudioElement | null>(null);

  // Toca el kamehameha: suena desde el inicio aunque se repita el clic
  const playSfx = () => {
    sfx.current ??= new Audio("/audio/increible.mp3");
    sfx.current.currentTime = 0;
    void sfx.current.play().catch(() => {});
  };

  return (
    <section
      className="relative flex min-h-[85svh] flex-col items-center overflow-hidden px-6 pb-10 pt-10 text-center"
      aria-label="Mensaje de cierre"
    >
      <DragonBall stars={4} className="orb-float w-14 animate-glowpulse" />
      <p className="text-gold mt-6 max-w-md font-display text-3xl font-extrabold leading-snug sm:text-4xl">
        ¡Te esperamos para compartir esta nueva aventura!
      </p>
      <p className="mt-3 text-sky-800">
        Con cariño, la familia que crece
      </p>

      <NimbusCloud className="mt-8 w-40 animate-floaty opacity-90" />

      <div
        className="animate-floaty mt-4 flex justify-center"
        style={{ animationDuration: "5s" }}
      >
        <button
          type="button"
          onClick={playSfx}
          aria-label="Tócalo para escuchar un secreto"
          className="animate-bouncein cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Image
            src="/images/kuku.png"
            alt="Goku bebé dormido acurrucado"
            width={730}
            height={713}
            sizes="(max-width: 640px) 176px, 224px"
            className="w-44 drop-shadow-lg sm:w-56"
          />
        </button>
        <p className="animate-pulse self-center pl-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
          ¡Tócame!
        </p>
      </div>

      <p className="mt-auto pt-10 font-display text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
        Te Hice Esto · Experiencias web para ocasiones especiales
      </p>
    </section>
  );
}
