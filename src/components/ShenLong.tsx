/**
 * Shen Long: dragón construido con divs que serpentea por toda la invitación.
 * Pure CSS/Tailwind — sin dependencias, pointer-events desactivados.
 */
export default function ShenLong() {
  // 35 segmentos para hacer un dragón largo y majestuoso
  const segmentos = Array.from({ length: 35 });

  return (
    // Capa sobre todo el documento, detrás del contenido (main va en z-10).
    // absolute + contenedor relative = anclado a la página: el scroll no lo mueve.
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="volar-libre absolute flex w-max items-center">
        {/* --- CABEZA DEL DRAGÓN --- */}
        <div
          className="cabeza-dragon relative z-50 flex items-center"
          style={{ "--s": 1, "--delay": "0s" } as React.CSSProperties}
        >
          {/* Cuernos */}
          <div className="absolute -top-8 left-2 h-10 w-2 rotate-[-20deg] rounded-t-md bg-amber-800" />
          <div className="absolute -top-6 left-6 h-8 w-2 rotate-[15deg] rounded-t-md bg-amber-800" />

          {/* Rostro y hocico */}
          <div className="relative z-10 h-12 w-16 rounded-l-full rounded-r-lg border-2 border-green-900 bg-green-600">
            {/* Ojo rojo */}
            <div className="absolute left-4 top-2 h-2 w-3 rounded-full border border-black bg-red-600 shadow-[0_0_5px_red]" />
            {/* Mandíbula inferior (amarilla) */}
            <div className="absolute -bottom-1 left-2 h-4 w-12 rounded-full border border-green-900 bg-yellow-400" />
          </div>

          {/* Bigote largo de Shen Long */}
          <div className="absolute -left-12 top-6 h-16 w-24 -rotate-12 rounded-tl-full border-l-2 border-t-2 border-green-900" />
        </div>

        {/* --- CUERPO DEL DRAGÓN --- */}
        <div className="relative -ml-4 flex">
          {segmentos.map((_, i) => {
            // El dragón se afina hacia la cola
            const escala = Math.max(0.2, 1 - i * 0.025);
            // Brazos y piernas en los segmentos 6 y 22
            const tieneGarras = i === 6 || i === 22;

            return (
              <div
                key={i}
                className="segmento-dragon relative -ml-4 flex justify-center"
                style={
                  {
                    "--s": escala,
                    "--delay": `${i * -0.15}s`, // el retraso crea el efecto serpiente
                    zIndex: 40 - i,
                  } as React.CSSProperties
                }
              >
                {/* Cuerpo del segmento (espalda verde, vientre amarillo) */}
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-green-900 shadow-sm">
                  <div className="h-3/5 w-full bg-green-500" />
                  <div className="h-2/5 w-full border-t border-green-800 bg-yellow-400" />
                </div>

                {/* Púa dorsal */}
                <div className="absolute -top-3 h-0 w-0 border-b-[12px] border-l-[6px] border-r-[6px] border-b-green-800 border-l-transparent border-r-transparent" />

                {/* Garras */}
                {tieneGarras && (
                  <div className="brazo absolute left-2 top-8 z-[-1] h-10 w-4 origin-top rotate-[30deg] rounded-b-md border border-green-900 bg-green-600">
                    {/* Dedos/garras */}
                    <div className="absolute -bottom-2 -left-2 h-4 w-2 rotate-45 rounded-full border border-gray-500 bg-yellow-100" />
                    <div className="absolute -bottom-3 left-1 h-4 w-2 rounded-full border border-gray-500 bg-yellow-100" />
                    <div className="absolute -bottom-2 -right-2 h-4 w-2 -rotate-45 rounded-full border border-gray-500 bg-yellow-100" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- ANIMACIONES --- */}
      <style>{`
        /* Vuelo libre en dos pasadas por ciclo:
           0-50%  → de derecha a izquierda (orientación normal),
           50-100% → reaparece por la izquierda y cruza a la derecha,
           con scaleX(-1) para que la cabeza siempre lidere el vuelo.
           El salto 50%→50.01% ocurre fuera de pantalla (invisible) y
           cambia la altura para que reaparezca en otra posición.
           top en % = relativo a la altura total del documento (independiente del scroll). */
        .volar-libre {
          animation: avanzar 56s linear infinite;
        }

        @keyframes avanzar {
          /* Pasada 1: derecha → izquierda */
          0%     { top: 12%; transform: translateX(105vw) scaleX(1); }
          15%    { top: 8%;  transform: translateX(55vw)  scaleX(1); }
          32%    { top: 40%; transform: translateX(0)     scaleX(1); }
          50%    { top: 32%; transform: translateX(-115%) scaleX(1); }
          /* Salto invisible: mismo borde pero volteado y a otra altura */
          50.01% { top: 58%; transform: translateX(-115%) scaleX(-1); }
          /* Pasada 2: izquierda → derecha */
          66%    { top: 50%; transform: translateX(-45%)  scaleX(-1); }
          84%    { top: 66%; transform: translateX(40vw)  scaleX(-1); }
          100%   { top: 60%; transform: translateX(105vw) scaleX(-1); }
        }

        /* Movimiento ondulante (cabeza y cada segmento con retraso en cascada) */
        .cabeza-dragon,
        .segmento-dragon {
          animation: serpentear 2s ease-in-out infinite;
          animation-delay: var(--delay);
          transform: scale(var(--s));
        }

        @keyframes serpentear {
          0%, 100% { transform: translateY(0px) scale(var(--s)); }
          50%      { transform: translateY(-40px) scale(var(--s)); }
        }

        /* Las garras reman un poco */
        .brazo {
          animation: remar 2s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes remar {
          0%, 100% { transform: rotate(30deg); }
          50%      { transform: rotate(50deg); }
        }

        /* En pantallas chicas el dragón se aligera: un tercio menos
           de segmentos animados (el vuelo se ve igual) */
        @media (max-width: 640px) {
          .segmento-dragon:nth-child(3n) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
