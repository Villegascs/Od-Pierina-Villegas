import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Od. Pierina Villegas",
  description: "Plataforma de gestión de citas odontológicas",
  icons: {
    icon: '/images/isotipo.png?v=1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          <Header />
          <main style={{ flex: 1, padding: '2rem 0', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
