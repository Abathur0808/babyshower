import { dirname } from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Sirve AVIF/WebP automáticamente: mucho más liviano que PNG en mobile
  images: { formats: ["image/avif", "image/webp"] },
  // Evita que Next infiera la raíz por otro package-lock.json en carpetas superiores
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
