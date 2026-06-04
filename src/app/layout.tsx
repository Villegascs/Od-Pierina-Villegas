import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Od. Pierina Villegas",
  description: "Plataforma de gestión de citas odontológicas",
  icons: {
    icon: '/images/logo.png?v=2',
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
          <header style={{
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {/* Logo (Left) */}
              <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  src="/images/logo.png" 
                  alt="Od. Pierina Villegas Logo" 
                  width={180} 
                  height={50} 
                  style={{ objectFit: 'contain', height: 'auto', maxHeight: '50px' }} 
                  priority
                />
              </Link>

              {/* Navigation Links (Center) */}
              <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link href="/#tratamientos" className="nav-link">Tratamientos</Link>
                <Link href="/#doctora" className="nav-link">Doctora</Link>
                <Link href="/#contacto" className="nav-link">Contacto</Link>
              </nav>

              {/* Action Buttons (Right) */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Iniciar Sesión</Link>
                <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Agendar Cita</Link>
              </div>
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
