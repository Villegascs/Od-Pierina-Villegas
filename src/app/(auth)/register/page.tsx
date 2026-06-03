'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SelectDropdown from '@/components/SelectDropdown';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const result = await res.json();
        setError(result.error || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
          Crear Cuenta
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Regístrate para solicitar y gestionar tus citas
        </p>

        {error && <div style={{ color: 'white', background: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="label" htmlFor="firstName">Nombres</label>
              <input className="input-field" type="text" id="firstName" name="firstName" placeholder="Tus nombres" required />
            </div>
            <div>
              <label className="label" htmlFor="lastName">Apellidos</label>
              <input className="input-field" type="text" id="lastName" name="lastName" placeholder="Tus apellidos" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="label" htmlFor="email">Correo Electrónico</label>
              <input className="input-field" type="email" id="email" name="email" placeholder="ejemplo@correo.com" required />
            </div>
            <div>
              <label className="label" htmlFor="password">Contraseña</label>
              <input className="input-field" type="password" id="password" name="password" placeholder="••••••••" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="label" htmlFor="dateOfBirth">Fecha de Nacimiento</label>
              <input className="input-field" type="date" id="dateOfBirth" name="dateOfBirth" required />
            </div>
            <div>
              <label className="label" htmlFor="gender">Sexo</label>
              <SelectDropdown
                name="gender"
                options={[
                  { value: 'M', label: 'Masculino' },
                  { value: 'F', label: 'Femenino' },
                  { value: 'O', label: 'Otro' }
                ]}
                placeholder="Selecciona..."
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
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
