import type { CSSProperties } from "react";
import Cloud from "@/components/art/Cloud";
import Sparkles from "@/components/art/Sparkles";
import DragonBall from "@/components/art/DragonBall";

/** Estrella amarilla Nimbus de 4 puntas. */
function MiniStar({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="#FACC2E" aria-hidden="true">
      <path d="M12 1l2.2 6.4L21 9l-6.8 1.6L12 17l-2.2-6.4L3 9l6.8-1.6L12 1z" />
    </svg>
  );
}

/** Cielo decorativo de fondo: nubes a la deriva, estrellas y esferas flotando. */
export default function SkyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Nubes a la deriva — tamaños, velocidades y trayectorias variadas */}
      <Cloud className="cloud-drifting absolute top-[6%] w-48 opacity-80" style={{ animationDuration: "55s" }} />
      <Cloud
        className="cloud-drifting-arc absolute top-[16%] w-24 opacity-70"
        style={{ animationDuration: "48s", animationDelay: "-20s" }}
      />
      <Cloud
        className="cloud-drifting absolute top-[30%] w-32 opacity-60"
        style={{ animationDuration: "70s", animationDelay: "-30s" }}
      />
      <Cloud
        className="cloud-drifting-arc absolute top-[44%] w-20 opacity-50"
        style={{ animationDuration: "62s", animationDelay: "-45s" }}
      />
      <Cloud
        className="cloud-drifting absolute top-[55%] w-56 opacity-70"
        style={{ animationDuration: "95s", animationDelay: "-60s" }}
      />
      <Cloud
        className="cloud-drifting-arc absolute top-[66%] w-28 opacity-65"
        style={{ animationDuration: "58s", animationDelay: "-10s" }}
      />
      <Cloud
        className="cloud-drifting absolute top-[78%] w-40 opacity-50"
        style={{ animationDuration: "80s", animationDelay: "-15s" }}
      />
      <Cloud
        className="cloud-drifting-arc absolute top-[88%] w-16 opacity-55"
        style={{ animationDuration: "52s", animationDelay: "-35s" }}
      />

      {/* Estrellas amarillas flotando arriba/abajo (10-15px, 3-5s) */}
      <MiniStar className="animate-floaty absolute left-[12%] top-[20%] w-4 opacity-80" style={{ animationDuration: "3.4s" }} />
      <MiniStar className="animate-floaty absolute right-[14%] top-[46%] w-3 opacity-70" style={{ animationDuration: "4.2s", animationDelay: "-1.2s" }} />
      <MiniStar className="animate-floaty absolute left-[18%] top-[68%] w-5 opacity-60" style={{ animationDuration: "5s", animationDelay: "-2.4s" }} />
      <MiniStar className="animate-floaty absolute right-[22%] top-[12%] w-3.5 opacity-75" style={{ animationDuration: "3.8s", animationDelay: "-0.8s" }} />
      <MiniStar className="animate-floaty absolute right-[8%] top-[80%] w-4 opacity-70" style={{ animationDuration: "4.6s", animationDelay: "-3s" }} />

      {/* Esferas del dragón flotando suave */}
      <DragonBall stars={2} className="animate-floaty absolute left-[6%] top-[42%] w-7 opacity-70" />
      <DragonBall stars={5} className="animate-floaty absolute right-[5%] top-[62%] w-8 opacity-60" />

      <Sparkles />
    </div>
  );
}
