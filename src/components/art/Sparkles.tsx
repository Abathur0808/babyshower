type Sparkle = {
  left: string;
  top: string;
  size: number;
  delay: string;
};

// Posiciones deterministas para evitar diferencias de hidratación.
const SPARKLES: Sparkle[] = [
  { left: "8%", top: "18%", size: 14, delay: "0s" },
  { left: "20%", top: "62%", size: 10, delay: "0.6s" },
  { left: "32%", top: "12%", size: 12, delay: "1.2s" },
  { left: "48%", top: "72%", size: 9, delay: "0.3s" },
  { left: "60%", top: "20%", size: 15, delay: "1.7s" },
  { left: "72%", top: "58%", size: 10, delay: "0.9s" },
  { left: "84%", top: "14%", size: 13, delay: "2.1s" },
  { left: "92%", top: "48%", size: 9, delay: "1.4s" },
  { left: "14%", top: "80%", size: 11, delay: "2.4s" },
  { left: "78%", top: "84%", size: 12, delay: "0.5s" },
];

/** Destellos dorados que aparecen y desaparecen suavemente. */
export default function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          className="absolute animate-twinkle"
          style={{ left: s.left, top: s.top, animationDelay: s.delay }}
        >
          <path
            d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
            fill="#e9b63b"
            opacity="0.9"
          />
        </svg>
      ))}
    </div>
  );
}
