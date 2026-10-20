type Props = {
  stars?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  className?: string;
};

const STAR_POSITIONS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [38, 50],
    [62, 50],
  ],
  3: [
    [50, 36],
    [36, 58],
    [64, 58],
  ],
  4: [
    [38, 38],
    [62, 38],
    [38, 62],
    [62, 62],
  ],
  5: [
    [50, 34],
    [34, 50],
    [66, 50],
    [42, 66],
    [58, 66],
  ],
  6: [
    [38, 34],
    [62, 34],
    [30, 52],
    [70, 52],
    [42, 68],
    [58, 68],
  ],
  7: [
    [50, 30],
    [34, 42],
    [66, 42],
    [30, 60],
    [70, 60],
    [42, 72],
    [58, 72],
  ],
};

function Star({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d="M0 -7 L1.9 -2.1 L7 -2.1 L2.7 1.2 L4.3 6.2 L0 3 L-4.3 6.2 L-2.7 1.2 L-7 -2.1 L-1.9 -2.1 Z"
      transform={`translate(${cx} ${cy}) scale(0.9)`}
      fill="#e23b2e"
      stroke="#b92a1f"
      strokeWidth="0.6"
    />
  );
}

/** Esfera del dragón con reflejo dorado y estrellas configurables. */
export default function DragonBall({ stars = 4, className = "" }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={`Esfera del dragón de ${stars} estrellas`}>
      <defs>
        <radialGradient id={`db-g-${stars}`} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffd98a" />
          <stop offset="45%" stopColor="#f9b93f" />
          <stop offset="100%" stopColor="#e07f13" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="#f9b93f" opacity="0.25" />
      <circle cx="50" cy="50" r="36" fill={`url(#db-g-${stars})`} stroke="#c97a10" strokeWidth="1.5" />
      <ellipse cx="38" cy="32" rx="12" ry="7" fill="#fff3d0" opacity="0.9" transform="rotate(-18 38 32)" />
      {STAR_POSITIONS[stars].map(([x, y]) => (
        <Star key={`${x}-${y}`} cx={x} cy={y} />
      ))}
    </svg>
  );
}
