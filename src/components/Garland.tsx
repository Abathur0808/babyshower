/**
 * Guirnalda de estrellas gorditas colgando de una cuerda fina
 * en la parte superior de la página. Vive en la capa z-0 junto
 * a ShenLong: pasa por detrás de letras, sobre y tarjetas.
 */

// left/top = posición % sobre la parábola de la cuerda (viewBox 100x32).
const STARS: {
  left: number;
  top: number;
  size: string;
  delay: string;
  dur: string;
}[] = [
  { left: 8,  top: 13.8, size: "w-7 sm:w-8",   delay: "0s",    dur: "4.6s" },
  { left: 22, top: 32.2, size: "w-9 sm:w-11",  delay: "-.8s",  dur: "4.2s" },
  { left: 36, top: 43.2, size: "w-8 sm:w-9",   delay: "-1.6s", dur: "5s"   },
  { left: 50, top: 46.9, size: "w-11 sm:w-14", delay: "-.4s",  dur: "4.4s" },
  { left: 64, top: 43.2, size: "w-8 sm:w-9",   delay: "-2.1s", dur: "4.8s" },
  { left: 78, top: 32.2, size: "w-9 sm:w-11",  delay: "-1.1s", dur: "4.3s" },
  { left: 92, top: 13.8, size: "w-7 sm:w-8",   delay: "-1.9s", dur: "4.9s" },
];

const PLUSH_D =
  "M50 8 L60.5 35.5 L89 37 L67.5 55.5 L75 84 L50 68.5 L25 84 L32.5 55.5 L11 37 L39.5 35.5 Z";

/** Estrella de peluche: borde grueso redondeado (relleno "inflado"),
 *  costura punteada interior, carita dulce con mejillas — suavecita para bebé. */
function PlushStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="plush-g" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fff6d9" />
          <stop offset="55%" stopColor="#ffd66b" />
          <stop offset="100%" stopColor="#f2b134" />
        </radialGradient>
      </defs>
      {/* Cuerpo inflado: trazo grueso con uniones redondas = aspecto de peluche */}
      <path
        d={PLUSH_D}
        fill="url(#plush-g)"
        stroke="#e8a52b"
        strokeWidth="11"
        strokeLinejoin="round"
      />
      {/* Costura cosida interior */}
      <path
        d={PLUSH_D}
        fill="none"
        stroke="#fff8e6"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeDasharray="3.5 3.5"
        opacity="0.9"
        transform="translate(50 52) scale(0.8) translate(-50 -52)"
      />
      {/* Brillo suave tipo tela */}
      <ellipse
        cx="38"
        cy="27"
        rx="10"
        ry="6"
        fill="#fff"
        opacity="0.45"
        transform="rotate(-20 38 27)"
      />
      {/* Carita kawaii: ojitos cerrados, sonrisa y mejillas */}
      <path
        d="M38 52 Q42 47 46 52"
        fill="none"
        stroke="#7a4a12"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M54 52 Q58 47 62 52"
        fill="none"
        stroke="#7a4a12"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M45 60 Q50 64.5 55 60"
        fill="none"
        stroke="#7a4a12"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <ellipse cx="33" cy="58" rx="4.2" ry="2.6" fill="#f79fb0" opacity="0.6" />
      <ellipse cx="67" cy="58" rx="4.2" ry="2.6" fill="#f79fb0" opacity="0.6" />
    </svg>
  );
}

export default function Garland() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 animate-bouncein sm:h-36"
      aria-hidden="true"
    >
      {/* Cuerda parabólica fina color ámbar */}
      <svg
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 0 Q50 30 100 0"
          fill="none"
          stroke="#b45309"
          strokeWidth="0.3"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>

      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            ["--md" as string]: s.dur,
            ["--mdel" as string]: s.delay,
          }}
        >
          <PlushStar className={`guirnalda-mecer drop-shadow-md ${s.size}`} />
        </div>
      ))}

      <style>{`
        /* Cada estrella se mece suave desde su punto superior (donde toca la cuerda) */
        .guirnalda-mecer {
          animation: mecerse var(--md, 4.5s) ease-in-out var(--mdel, 0s) infinite;
          transform-origin: top center;
        }

        @keyframes mecerse {
          0%, 100% { transform: rotate(-5deg); }
          50%      { transform: rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
