import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Server de Minecraft para los Papupanas",
  icons: { icon: "/img/creeper.png" },
  description:
    "Servidor privado de Minecraft para los jugadores de Minecraft y los Papupanas. Actualizaciones y evento el 28 de Diciembre.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#1a1a1a] text-white antialiased">{children}</body>
    </html>
  );
}
