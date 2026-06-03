import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Od. Pierina Villegas",
  description: "Plataforma de gestión de citas odontológicas",
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
          <header style={{
            background: 'var(--primary)',
            borderBottom: '1px solid var(--primary-hover)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 2px 10px rgba(18, 53, 47, 0.05)'
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="/">
                <Image 
                  src="/images/logo.png" 
                  alt="Od. Pierina Villegas Logo" 
                  width={220} 
                  height={80} 
                  style={{ objectFit: 'contain', height: 'auto', maxHeight: '60px' }} 
                  priority
                />
              </Link>
            </div>
          </header>
          <main style={{ flex: 1, padding: '2rem 0', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
