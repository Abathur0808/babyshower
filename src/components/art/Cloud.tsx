import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

/** Nube blanca suave para el cielo de fondo. */
export default function Cloud({ className = "", style }: Props) {
  return (
    <svg viewBox="0 0 200 90" className={className} style={style} aria-hidden="true">
      <ellipse cx="100" cy="62" rx="80" ry="24" fill="#ffffff" />
      <ellipse cx="65" cy="44" rx="38" ry="26" fill="#ffffff" />
      <ellipse cx="115" cy="36" rx="44" ry="30" fill="#ffffff" />
      <ellipse cx="152" cy="50" rx="36" ry="24" fill="#ffffff" />
    </svg>
  );
}
