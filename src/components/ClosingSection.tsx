import Image from "next/image";
import NimbusCloud from "@/components/art/NimbusCloud";
import DragonBall from "@/components/art/DragonBall";

/** Cierre emotivo de la invitación. */
export default function ClosingSection() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden px-6 pb-24 pt-10 text-center"
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
        <Image
          src="/images/kuku.png"
          alt="Goku bebé dormido acurrucado"
          width={730}
          height={713}
          className="animate-bouncein w-44 drop-shadow-lg sm:w-56"
        />
      </div>

      <p className="mt-12 font-display text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
        Te Hice Esto · Experiencias web para ocasiones especiales
      </p>
    </section>
  );
}
