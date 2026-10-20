# Baby Shower — Te Hice Esto

Invitación web interactiva con temática Baby Goku. Next.js 15 (App Router) + React 19 + Tailwind CSS 3. Lista para desplegar en Vercel.

## Desarrollo

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # build de producción
npm run lint   # lint (next lint)
npm run typecheck
```

## Personalizar el evento

Edita **solo** `src/config/event.ts`. Campos:

| Campo | Descripción |
|---|---|
| `babyName` | Nombre del bebé (vacío = texto genérico) |
| `parents` | Futuros padres, ej. `"Ana & Luis"` |
| `eventDateISO` | Fecha/hora ISO con zona, ej. `"2026-04-18T15:00:00-03:00"` |
| `displayDate` / `displayTime` | Texto libre si prefieres otro formato |
| `venueName` / `address` | Lugar y dirección para Google Maps |
| `whatsappNumber` | Solo dígitos con código país, ej. `"59899123456"` |
| `whatsappMessage` | Mensaje predefinido de confirmación |
| `rsvpDeadline` | Fecha límite para confirmar |
| `personalMessage` | Mensaje de los anfitriones |
| `audioSrc` | Ruta en `/public`, ej. `"/audio/theme.mp3"` (usa audio autorizado) |

Campos vacíos → la UI muestra estados "por confirmar"; ningún enlace ni cuenta regresiva usa datos inventados.

## Recursos gráficos

`BabyGoku`, `NimbusCloud`, `DragonBall` y `Cloud` son SVG inline en `src/components/art/`. Para usar ilustraciones finales, coloca archivos optimizados en `public/` (ej. `public/images/baby-goku.webp`) y reemplaza el componente por `next/image`.
