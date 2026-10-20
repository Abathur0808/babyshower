type Props = {
  className?: string;
};

/** Nube voladora estilo Kinto'un — dorada cremosa, coherente con la paleta. */
export default function NimbusCloud({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 320 130"
      className={className}
      role="img"
      aria-label="Nube voladora"
    >
      <defs>
        <radialGradient id="nimbus-g" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fff7dd" />
          <stop offset="55%" stopColor="#ffe49a" />
          <stop offset="100%" stopColor="#f4c95d" />
        </radialGradient>
      </defs>
      {/* Estela */}
      <path
        d="M10 96 C45 88 80 90 118 96"
        fill="none"
        stroke="#f4d47c"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M4 108 C40 102 70 104 100 109"
        fill="none"
        stroke="#f9e6ad"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Cuerpo de la nube */}
      <ellipse cx="195" cy="95" rx="105" ry="30" fill="url(#nimbus-g)" />
      <ellipse cx="150" cy="72" rx="52" ry="34" fill="url(#nimbus-g)" />
      <ellipse cx="215" cy="62" rx="58" ry="40" fill="url(#nimbus-g)" />
      <ellipse cx="262" cy="80" rx="48" ry="32" fill="url(#nimbus-g)" />
      {/* Luz superior */}
      <ellipse cx="210" cy="52" rx="36" ry="18" fill="#fff9e6" opacity="0.85" />
      <ellipse cx="152" cy="60" rx="26" ry="13" fill="#fff9e6" opacity="0.7" />
    </svg>
  );
}
