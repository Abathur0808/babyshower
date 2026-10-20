import Image from "next/image";
import DragonBall from "@/components/art/DragonBall";
import { eventConfig } from "@/config/event";

/** Hero: Baby Goku en su nube + título "BABY SHOWER" dorado. */
export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-28 text-center sm:pt-32"
      aria-label="Portada principal del Baby Shower"
    >
      <p className="animate-bouncein font-display text-sm font-bold uppercase tracking-[0.4em] text-sky-700 sm:text-base">
        Celebremos juntos
      </p>

      <h2 className="title-comic mt-2 animate-bouncein font-display text-6xl font-extrabold leading-none sm:text-7xl md:text-8xl">
        BABY
        <br />
        SHOWER
      </h2>

      {eventConfig.babyName ? (
        <p className="mt-4 font-display text-3xl font-bold text-gold-700 sm:text-4xl">
          {eventConfig.babyName}
        </p>
      ) : (
        <p className="mt-4 font-display text-xl font-bold text-sky-800 sm:text-2xl">
          ¡Preparando la llegada! Nuestro pequeño guerrero está en camino
        </p>
      )}

      {/* Baby Goku durmiendo sobre su nube: flotación vertical suave */}
      <div className="relative mt-5 w-full max-w-[16rem] animate-floaty sm:mt-8 sm:max-w-lg">
        <Image
          src="/images/goku-hero.png"
          alt="Baby Goku dormido sobre la nube voladora"
          width={1100}
          height={1016}
          priority
          className="h-auto w-full drop-shadow-xl"
        />
      </div>

      {/* Esferas decorativas */}
      <DragonBall stars={4} className="orb-float absolute left-[6%] top-[18%] w-10 animate-glowpulse sm:w-14" />
      <DragonBall stars={1} className="orb-float absolute right-[8%] top-[28%] w-8 animate-glowpulse sm:w-12" />
      <DragonBall stars={7} className="orb-float absolute bottom-[14%] left-[10%] hidden w-10 animate-glowpulse sm:block" />

      {/* Indicador de scroll */}
      <a
        href="#detalles"
        className="mt-6 inline-flex flex-col items-center gap-1 font-display text-sm font-bold uppercase tracking-widest text-sky-700 transition-colors hover:text-sky-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60"
      >
        Toca para descubrir
        <svg viewBox="0 0 24 24" className="h-6 w-6 animate-[bouncex_1.2s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </a>
    </section>
  );
}
