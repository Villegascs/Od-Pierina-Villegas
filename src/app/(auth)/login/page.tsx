'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
          Bienvenido
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Inicia sesión en tu portal de paciente
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="label" htmlFor="email">Correo Electrónico</label>
            <input className="input-field" type="email" id="email" placeholder="ejemplo@correo.com" required />
          </div>
          <div>
            <label className="label" htmlFor="password">Contraseña</label>
            <input className="input-field" type="password" id="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Ingresar
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>¿No tienes una cuenta? </span>
          <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
