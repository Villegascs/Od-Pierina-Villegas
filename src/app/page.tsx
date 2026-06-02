import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar Placeholder */}
      <header style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary)' }}>
          Od. Pierina Villegas
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/login" className="btn btn-outline">Iniciar Sesión</Link>
          <Link href="/register" className="btn btn-primary">Registrarse</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '4rem', maxWidth: '800px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Sonrisas perfectas, <br />
            <span style={{ color: 'var(--primary)' }}>atención de primer nivel.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
            Agenda tu cita hoy mismo con la Odontólogo Pierina Villegas y transforma tu sonrisa con tratamientos especializados y tecnología de vanguardia.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
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
