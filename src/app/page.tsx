import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar Placeholder */}
      <header style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary)' }}>
          Od. Pierina Villegas
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/login" className="btn btn-outline">Iniciar Sesión</Link>
          <Link href="/register" className="btn btn-primary">Registrarse</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', textAlign: 'center', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Sonrisas perfectas, <br />
            <span style={{ color: 'var(--primary)' }}>atención de primer nivel.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--text-muted)', marginBottom: '3rem' }}>
            Agenda tu cita hoy mismo con la Odontólogo Pierina Villegas y transforma tu sonrisa con tratamientos especializados y tecnología de vanguardia.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Solicitar Cita Ahora
            </Link>
            <Link href="#services" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Conoce más
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Placeholder */}
      <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        © {new Date().getFullYear()} Od. Pierina Villegas. Todos los derechos reservados.
      </footer>
    </div>
  );
}
