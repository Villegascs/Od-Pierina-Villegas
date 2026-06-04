'use client';
import { signOut } from 'next-auth/react';

import React, { useState } from 'react';

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function SignOutButton({ className = "btn btn-outline", children = "Cerrar Sesión", style }: SignOutButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)} 
        className={className}
        style={style}
      >
        {children}
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div className="glass-panel" style={{
            background: 'var(--surface)',
            padding: '2.5rem',
            borderRadius: '24px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 700 }}>
              ¿Cerrar Sesión?
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              ¿Estás seguro de que deseas salir de tu cuenta y volver a la página principal?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowModal(false)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancelar
              </button>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn btn-primary"
                style={{ flex: 1, background: 'var(--danger)', color: 'white' }}
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
