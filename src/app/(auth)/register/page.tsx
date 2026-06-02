'use client';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
          Crear Cuenta
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Regístrate para solicitar y gestionar tus citas
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="label" htmlFor="firstName">Nombres</label>
              <input className="input-field" type="text" id="firstName" placeholder="Tus nombres" required />
            </div>
            <div>
              <label className="label" htmlFor="lastName">Apellidos</label>
              <input className="input-field" type="text" id="lastName" placeholder="Tus apellidos" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="label" htmlFor="email">Correo Electrónico</label>
              <input className="input-field" type="email" id="email" placeholder="ejemplo@correo.com" required />
            </div>
            <div>
              <label className="label" htmlFor="password">Contraseña</label>
              <input className="input-field" type="password" id="password" placeholder="••••••••" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="label" htmlFor="dob">Fecha de Nacimiento</label>
              <input className="input-field" type="date" id="dob" required />
            </div>
            <div>
              <label className="label" htmlFor="gender">Sexo</label>
              <select className="input-field" id="gender" required defaultValue="">
                <option value="" disabled>Selecciona...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Registrarse
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>¿Ya tienes una cuenta? </span>
          <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
